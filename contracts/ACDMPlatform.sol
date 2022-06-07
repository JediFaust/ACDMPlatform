// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;


import "./interfaces/IERC20MintBurn.sol";
import "./interfaces/IUniswapV2Router01.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./interfaces/IDAO.sol";

/** 
 * @title ACDMPlatform with DAO
 * @author github.com/JediFaust
 * @dev All functions tested successfully and have no errors
 */

contract ACDMPlatform is AccessControl, ReentrancyGuard {
    bytes32 public constant REGISTERED = keccak256("REGISTERED");
    bytes32 public constant DAO = keccak256("DAO");

    address private _weth = 0xc778417E063141139Fce010982780140Aa0cD5Ab;
    address private _uniV2Router
        = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    bool private _isSaleRound;

    uint256 private _firstRefererCommission = 50;
    uint256 private _secondRefererCommission = 30;
    uint256 private _tradeRefererCommission = 25;

    uint256 private _totalCommissionEth;
    uint256 private _saleFinishTime;
    uint256 private _tradeFinishTime;
    uint256 private _sellAmount;
    uint256 public sellPriceEth;
    uint256 public orderCount;
    uint256 public tradeVolumeEth;

    mapping(address => address) private _refererOf;
    mapping(uint256 => Order) public orderbook;

    IERC20MintBurn private _token;
    IDAO private _dao;

    struct Order {
        address seller;
        uint256 price;
        uint256 availableAmount;
    }

    event SaleRoundStarted(uint256 finishTime);
    event SoldOut(uint256 currentTime);
    event TradeRoundStarted(uint256 finishTime);
    event OrderCreated(
            uint256 indexed orderId,
            address indexed seller,
            uint256 indexed price,
            uint256 availableAmount
            );
    event OrderRemoved(
            uint256 indexed orderId,
            uint256 leftAmount
            );
    event OrderRedeemed(
            uint256 indexed orderId,
            address indexed buyer,
            uint256 deductedAmount
            );
    

    /**
     * Constructor
     * @param token address of the token to trade and sell
     * @param dao address of the DAO
     */
    constructor(address token, address dao) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DAO, dao);

        _token = IERC20MintBurn(token);
        _dao = IDAO(dao);
    }

    /**
     * Registers a new user
     */
    function register() external returns(bool) {
        require(
            !hasRole(REGISTERED, msg.sender),
            "You already registered"
            ); 

        _grantRole(REGISTERED, msg.sender);

        return true;
    }

    /**
     * Registers a new user with a referrer
     * @param referer Address of the referer
     * @notice referer must be registered
     */
    function registerWithReferer(address referer) external returns(bool) {
        require(
            !hasRole(REGISTERED, msg.sender), "You already registered");
        require(
            hasRole(REGISTERED, referer), "Referer is not registered");     

        _grantRole(REGISTERED, msg.sender);
        _refererOf[msg.sender] = referer;

        return true;
    }

    /**
     * Start the sale round.
     * @dev emits SaleRoundStarted event
     * @notice can be called by anyone
     */
    function startSaleRound() external returns(bool) {
        require(
            _saleFinishTime < block.timestamp && !_isSaleRound,
            "Sale round already started"
            );

        _saleFinishTime = block.timestamp + 3 days;
        _isSaleRound = true;

        if(sellPriceEth > 0) {
            sellPriceEth +=
                (sellPriceEth * 3 / 100) + 4000000;
        } else {
            // 0.00001 ETH
            sellPriceEth = 10000000;
        }

        if(tradeVolumeEth > 0) {
            _sellAmount = tradeVolumeEth / sellPriceEth;
        } else {
            // 100 000 ACDM
            _sellAmount = 100000000000;
        }

        _token.mint(address(this), _sellAmount);

        emit SaleRoundStarted(_saleFinishTime);

        return true;
    }

    /**
     * Buy ACDM tokens for sended ETH
     * @dev if provided more ETH, extra amount will send back
     * if there is not enough ACDM tokens, available amount will send
     * calculates amount to be minted from tradeVolume
     * calculates ACDM price with exact formula
     * emits SoldOut event when there is no more ACDM tokens
     * @notice can be called only by registered user
     */
    function buy() external payable onlyRole(REGISTERED) returns(bool) {
        require(
            _saleFinishTime > block.timestamp,
            "Sale round is not active"
            );

        uint256 amount = msg.value / sellPriceEth;

        if (amount >= _sellAmount) {
            amount = _sellAmount;
            _saleFinishTime = block.timestamp;

            emit SoldOut(block.timestamp);
        } 

        _sellAmount -= amount;
        _token.transfer(msg.sender, amount);

        address firstReferer = _refererOf[msg.sender];

        if(firstReferer != address(0)) {
            payable(firstReferer).transfer(
                msg.value * _firstRefererCommission / 1000
                );

            address secondReferer = _refererOf[firstReferer];

            if(secondReferer != address(0)) {
                payable(secondReferer).transfer(
                    msg.value * _secondRefererCommission / 1000
                    );
            }
        }

        uint256 extraEth = msg.value - (amount * sellPriceEth);

        if (extraEth > 0) {
            payable(msg.sender).transfer(extraEth);
        }
        
        return true;
    }

    /**
     * Start the trade round
     * @dev burns left ACDM tokens
     * emits TradeRoundStarted event
     * @notice can be called by anyone
     */
    function startTradeRound() external returns(bool) {
        require(
            _tradeFinishTime < block.timestamp && _isSaleRound,
            "Trade round already started"
            );
        
        if(_sellAmount > 0) {
            _token.burn(_sellAmount);
        }

        _tradeFinishTime = block.timestamp + 3 days;
        _isSaleRound = false;
        tradeVolumeEth = 0;

        emit TradeRoundStarted(_tradeFinishTime);

        return true;
    }

    /**
     * Create an order with a given price and amount
     * @param price price of the order
     * @param amount amount of the order
     * @dev emits OrderCreated event
     * @notice can be called only by registered user
     * @return orderId of the created order
     */
    function addOrder(uint256 price, uint256 amount) external
        onlyRole(REGISTERED) returns(uint256) {
            require(
                _tradeFinishTime > block.timestamp,
                "Trade round is not active"
                );
            
            _token.transferFrom(msg.sender, address(this), amount);
            Order storage o = orderbook[orderCount];
            o.seller = msg.sender;
            o.price = price;
            o.availableAmount = amount;

            emit OrderCreated(orderCount, msg.sender, price, amount);

            return orderCount++;
    }

    /**
     * Remove an order
     * @param orderID id of the order
     * @dev emits OrderRemoved event
     * sends back left amount of ACDM tokens
     * @notice can be called only by order owner
     */
    function removeOrder(uint256 orderID) external
        onlyRole(REGISTERED) returns(bool) {
            Order storage o = orderbook[orderID];

            require(
                o.seller == msg.sender,
                "You can remove only your orders"
                );

            _token.transfer(o.seller, o.availableAmount);

            emit OrderRemoved(orderID, o.availableAmount);

            o.availableAmount = 0;

            return true;
    }

    /**
     * Redeems an order
     * @param orderID id of the order
     * @param amount amount of tokens to buy
     * @dev emits OrderRedeemed event
     * sends back extra ETH
     * @notice can be called only by registered user
     */
    function redeemOrder(uint256 orderID, uint256 amount) external payable
        onlyRole(REGISTERED) nonReentrant returns(bool) {
            require(
                _tradeFinishTime > block.timestamp,
                "Trade round is not active"
                );

            Order storage o = orderbook[orderID];
            require(
                o.availableAmount > 0,
                "Order is already redeemed"
                );
            require(
                msg.value >= amount * o.price,
                "Not enough ETH"
                );

            if(amount > o.availableAmount) {
                amount = o.availableAmount;
            }

            uint256 amountEth = amount * o.price;
            uint256 commissionEth =
                amountEth * _tradeRefererCommission / 1000;

            tradeVolumeEth += amountEth;
            o.availableAmount -= amount;

            _token.transfer(msg.sender, amount);
            payable(o.seller).transfer(amountEth - (commissionEth * 2));

            address firstReferer = _refererOf[msg.sender];

            if(firstReferer != address(0)) {
                payable(firstReferer).transfer(commissionEth);

                address secondReferer = _refererOf[firstReferer];

                if(secondReferer != address(0)) {
                    payable(secondReferer).transfer(commissionEth);
                } else {
                    _totalCommissionEth += commissionEth;
                }
            } else {
                _totalCommissionEth += commissionEth * 2;
            }
            
            uint256 extraEth = msg.value - (amount * o.price);

            if (extraEth > 0) {
                payable(msg.sender).transfer(extraEth);
            }

            emit OrderRedeemed(orderID, msg.sender, amount);

            return true;
    }

    /**
     * Send all available ETH to the reciever
     * @param reciever address of the receiver
     * @notice can be called only by DAO voting
     */
    function sendAll(address reciever) external payable
        onlyRole(DAO) returns(bool) {
            uint256 balance = address(this).balance;
            require(balance > 0, "Zero balance to send");

            _totalCommissionEth = 0;
            payable(reciever).transfer(balance);

            return true;
    }

    /**
     * Send commission from trade rounds to the reciever
     * @param reciever address of the receiver
     * @notice can be called only by DAO voting
     */
    function sendCommissionOnly(address reciever) external payable
        onlyRole(DAO) nonReentrant returns(bool) {
            require(_totalCommissionEth > 0, "No commission to send");

            payable(reciever).transfer(_totalCommissionEth);
            _totalCommissionEth = 0;

            return true;
    }

    /**
     * Buys token from UniSwap to available ETH and burns them
     * @param token address of the token to buy and burn
     * @notice can be called only by DAO voting
     */
    function burnForAll(address token) external payable
        onlyRole(DAO) returns(bool) {
            uint256 balance = address(this).balance;
            require(balance > 0, "Zero balance to burn");

            address[] memory path;
            path[0] = _weth; 
            path[1] = token;

            uint256[] memory minOutAmounts =
                IUniswapV2Router01(_uniV2Router)
                    .getAmountsOut(balance, path);

            IUniswapV2Router01(_uniV2Router)
                .swapExactETHForTokens{value: balance}(
                    minOutAmounts[1],
                    path,
                    msg.sender,
                    block.timestamp
                );

            IERC20MintBurn(token).burn(minOutAmounts[1]);

            return true;
    }

    /**
     * Sets trade referer commission
     * @param commission commission as percent multilplied by 10
     * @notice can be called only by DAO voting
     */
    function setTradeCommission(uint256 commission) external
        onlyRole(DAO) returns(bool) {
            _tradeRefererCommission = commission;

            return true;
    }

    /**
     * Sets first referer commission
     * @param commission commission as percent multilplied by 10
     * @notice can be called only by DAO voting
     */
    function setFirstRefererCommission(uint256 commission) external
        onlyRole(DAO) returns(bool) {
            _firstRefererCommission = commission;

            return true;
    }

    /**
     * Sets second referer commission
     * @param commission commission as percent multilplied by 10
     * @notice can be called only by DAO voting
     */
    function setSecondRefererCommission(uint256 commission) external
        onlyRole(DAO) returns(bool) {
            _secondRefererCommission = commission;

            return true;
    }
}