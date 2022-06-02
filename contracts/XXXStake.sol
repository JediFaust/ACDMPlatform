// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./XXXDAO.sol";


/// @title Staking JDT Tokens contract
/// @author Omur Kubanychbekov, github.com/JediFaust
/// @notice You can use this contract for staking JDT Tokens
/// @dev All functions tested successfully and have no errors

contract XXXStake is AccessControl, ReentrancyGuard {  
    bytes32 public constant DAO = keccak256("DAO");
    
    uint256 private _rewardPercent;
    uint256 private _lockTime;
    uint256 private _rewardRate;
    mapping(address => Staker) private _stakers;

    XXXDAO private _dao;
    ERC20 private _lpToken;
    ERC20 private _rewardToken;

    struct Staker {
        uint256 claimed;
        uint256 amount;
        uint256 stakeTime;
    }

    /// @notice Deploys the contract with the initial parameters(lpToken, rewardToken, dao)
    /// @param lpToken Address of Liquidity Pool Token contract
    /// @param rewardToken Address of Reward Token contract
    /// @param dao Address of DAO contract
    constructor(address lpToken, address rewardToken, address dao) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DAO, dao);

        _rewardPercent = 3;
        _rewardRate = 7 days;
        _lockTime = 7 days;

        _dao = XXXDAO(dao);
        _lpToken = ERC20(lpToken);
        _rewardToken = ERC20(rewardToken);
    }
    
    /// @notice Sets the reward percent
    /// @dev Only DAO can call this function
    /// @param _newPercent Sets natural amount of Reward Percent  
    /// @return true if transaction is successful
    function setRewardPercent(uint256 _newPercent) external onlyRole(DAO) returns(bool) {
        require(_newPercent > 0 && _newPercent <= 100, "Enter number between 0-100");
        _rewardPercent = _newPercent;

        return true;
    }

    /// @notice Sets the reward rate time 
    /// @dev Only DAO can call this function
    /// @param _newRate Sets Reward Rate in seconds
    /// @return true if transaction is successful
    function setRewardRate(uint256 _newRate) external onlyRole(DAO) returns(bool) {
        require(_newRate > 0, "RewardRate cannot be zero");
        _rewardRate = _newRate;

        return true;
    }

    /// @notice Sets the lock time for unstaking
    /// @dev Only DAO can call this function
    /// @param _newTime Sets Lock Time in seconds
    /// @return true if transaction is successful
    function setLockTime(uint256 _newTime) external onlyRole(DAO) returns(bool) {
        require(_newTime > 0, "LockTime cannot be zero");
        _lockTime = _newTime;

        return true;
    }

    /// @notice Get the votes of the staker
    /// @dev Only DAO can call this function
    /// @param _staker Address of staker
    /// @return number of votes
    function getVotes(address _staker) external view onlyRole(DAO) returns(uint256) {
        return _stakers[_staker].amount;
    }

    /// @notice Stake function
    /// @dev Adds staking amount to caller and,
    /// transfers amount of tokens to contract
    /// adds amount when called again
    /// @param _amount Amount of tokens to stake,
    /// @return true if transaction is successful
    function stake(uint256 _amount) external nonReentrant returns(bool) {
        _lpToken.transferFrom(msg.sender, address(this), _amount);

        Staker storage s = _stakers[msg.sender];
        s.amount += _amount;
        s.stakeTime = block.timestamp;
        s.claimed = 0;

        return true;
    }

    /// @notice Claims reward tokens
    /// @dev Calculates the reward and transfers it to caller
    /// writes claimed amount to staker struct
    /// @return true if transaction is successful
    function claim() external nonReentrant returns(bool) {
        Staker storage c = _stakers[msg.sender];
        require(c.amount > 0, "You did not staked");

        uint256 reward = ((c.amount * _rewardPercent) / 100)
            * ((block.timestamp - c.stakeTime) / _rewardRate);
            
        require(reward > c.claimed, "No unclaimed rewards");

        _rewardToken.transfer(msg.sender, reward - c.claimed);
        c.claimed += reward; 
        
        return true; 
    }

    /// @notice Unstakes tokens
    /// @dev Calculates the left amount of reward,
    ///  and transfers it to caller
    /// clears the total amount and sends
    /// LP tokens to caller back
    /// @return true if transaction is successful
    function unstake() external nonReentrant returns(bool) {
        Staker storage u = _stakers[msg.sender];

        require(u.amount > 0, "You did not staked");
        require(u.stakeTime + _lockTime <= block.timestamp, "Lock time is not expired");
        require(_dao.canUnstake(msg.sender), "Finish votes first");

        uint256 reward = ((u.amount * _rewardPercent) / 100)
            * ((block.timestamp - u.stakeTime) / _rewardRate);
        
        if(reward > u.claimed) {
            _rewardToken.transfer(msg.sender, reward - u.claimed);
        }

        _lpToken.transfer(msg.sender, u.amount);
        
        _dao.emptyDeposit(msg.sender);
        u.amount = 0;
        u.claimed = 0;

        return true;
    }
}

