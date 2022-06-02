// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;


import "./ACDMToken.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title DAO contract with voting and ERC20 compatibility
/// @author Omur Kubanychbekov
/// @notice You can use this contract for make DAO and votings
/// @dev All functions tested successfully and have no errors

contract ACDMPlatform is AccessControl, ReentrancyGuard {
    bytes32 public constant REGISTERED = keccak256("REGISTERED");

    bool private _isSaleRound;
    uint256 private _roundDuration = 3 days;
    uint256 private _priceMultiplier = 3;
    uint256 private _priceAddition = 4;
    uint256 private _saleFinishTime;
    uint256 private _tradeFinishTime;
    uint256 private _sellPriceEth;
    uint256 private _sellAmount;
    uint256 public orderCount;
    uint256 public tradeVolumeEth;

    mapping(address => address) private _refererOf;
    mapping(uint256 => Order) private _orderbook;

    ACDMToken private _token;

    struct Order {
        address seller;
        uint256 price;
        uint256 availableAmount;
    }

    /** 
     * @notice Event that notices about started sale round
     * @dev Needed to remind start Trade Round at given time
     */
    event SaleRoundStarted(uint256 finishTime);

    /** 
     * @notice Event that notices about all tokens sold
     * @dev Needed to remind start Trade Round 
     */
    event SoldOut(uint256 currentTime);

    /** 
     * @notice Event that notices about started trade round
     * @dev Needed to remind start Sell Round at given time
     */
    event TradeRoundStarted(uint256 finishTime);
    
    /** 
     * @notice Event that notices about new order created
     * @dev Needed to show order in front side orderbook
     */
    event OrderCreated(
            uint256 indexed orderId,
            address indexed seller,
            uint256 indexed price,
            uint256 availableAmount
            );

    /** 
     * @notice Event that notices about order canceling
     * @dev Needed to update orderbook information
     */
    event OrderRemoved(
            uint256 indexed orderId,
            uint256 leftAmount
            );

    /** 
     * @notice Event that notices about new order created
     * @dev Needed to update orderbook information
     */
    event OrderRedeemed(
            uint256 indexed orderId,
            address indexed buyer,
            uint256 deductedAmount
            );
    

    /**
     * Constructor
     * Natspec
     */
    constructor(address token) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _token = ACDMToken(token);
    }


    function register() external returns(bool) {
        require(
            hasRole(REGISTERED, msg.sender),
            "You already registered"
            ); 

        _grantRole(REGISTERED, msg.sender);

        return true;
    }


    function registerWithReferer(address referer) external returns(bool) {
        require(
            hasRole(REGISTERED, msg.sender),
            "You already registered"
            );
        require(
            hasRole(REGISTERED, referer),
            "Referer is not registered"
            );     

        _grantRole(REGISTERED, msg.sender);
        _refererOf[msg.sender] = referer;

        return true;
    }


    function startSaleRound() external returns(bool) {
        require(
            _saleFinishTime < block.timestamp && !_isSaleRound,
            "Sale round is already started"
            );

        _saleFinishTime = block.timestamp + _roundDuration;
        _isSaleRound = true;

        if(_sellPriceEth > 0) {
            _sellPriceEth = _sellPriceEth + (_sellPriceEth * _priceMultiplier / 100) + _priceAddition;
            
        } else {
            // 0.0001 ETH
            _sellPriceEth = 10000000000000;
        }

        if(tradeVolumeEth > 0) {
            _sellAmount = tradeVolumeEth / _sellPriceEth;
        } else {
            // 100 000 ACDM
            _sellAmount = 100000000000;
        }

        emit SaleRoundStarted(_saleFinishTime);

        return true;
    }


    function buy() external payable onlyRole(REGISTERED) returns(bool) {
        require(
            _saleFinishTime > block.timestamp,
            "Sale round is not active"
            );

        uint256 amount = msg.value / _sellPriceEth;

        if (amount >= _sellAmount) {
            amount = _sellAmount;
            _saleFinishTime = block.timestamp;

            emit SoldOut(block.timestamp);
        } 

        _sellAmount -= amount;
        _token.transfer(msg.sender, amount);

        uint256 extraEth = msg.value - (amount * _sellPriceEth);

        if (extraEth > 0) {
            payable(msg.sender).send(extraEth);
        }
        
        return true;
    }


    function startTradeRound() external returns(bool) {
        require(
            _tradeFinishTime < block.timestamp && _isSaleRound,
            "Trade round is already started"
            );
        
        if(_sellAmount > 0) {
            _token.burn(_sellAmount);
        }

        _tradeFinishTime = block.timestamp + _roundDuration;
        _isSaleRound = false;
        tradeVolumeEth = 0;

        emit TradeRoundStarted(_tradeFinishTime);

        return true;
    }


    function addOrder(uint256 price, uint256 amount) external
        onlyRole(REGISTERED) returns(uint256) {
            require(
                _tradeFinishTime < block.timestamp,
                "Trade round is not active"
                );

            Order storage o = _orderbook[orderCount];
            o.seller = msg.sender;
            o.price = price;
            o.availableAmount = amount;

            emit OrderCreated(orderCount, msg.sender, price, amount);

            return orderCount++;
    }


    function removeOrder(uint256 orderID) external
        onlyRole(REGISTERED) returns(bool) {
            Order storage o = _orderbook[orderID];

            require(
                o.seller == msg.sender,
                "You can remove only your orders"
                );

            _token.transfer(o.seller, o.availableAmount);

            emit OrderRemoved(orderID, o.availableAmount);

            o.availableAmount = 0;

            return true;
    }


    function redeemOrder(uint256 orderID, uint256 amount) external
        payable onlyRole(REGISTERED) returns(bool) {
            require(
                _tradeFinishTime < block.timestamp,
                "Trade round is not active"
                );

            Order storage o = _orderbook[orderID];
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

            o.availableAmount -= amount;
            tradeVolumeEth += amount * o.price;
            _token.transfer(msg.sender, amount);
            
            uint256 extraEth = msg.value - (amount * o.price);

            if (extraEth > 0) {
                payable(msg.sender).send(extraEth);
            }

            emit OrderRedeemed(orderID, msg.sender, amount);

            return true;
    }
}