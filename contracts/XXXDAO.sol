// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;


import "./interfaces/IStake.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title DAO contract with voting and ERC20 compatibility
/// @author github.com/JediFaust
/// @notice You can use this contract for make DAO and votings
/// @dev All functions tested successfully and have no errors

contract XXXDAO is AccessControl, ReentrancyGuard {
    bytes32 public constant CHAIRMAN = keccak256("CHAIRMAN");
    bytes32 public constant STAKE = keccak256("STAKE");

    uint256 private _minQuorum;
    uint256 private _debatePeriod;
    uint256 private _proposalID;
    IStake private _stake;

    struct Proposal {
        uint256 finishTime; 
        uint256 votesFor;
        uint256 votesAgainst;
        address recipient;
        bytes callData;
        string description;
    }

    struct Voter {
        uint256 votes;
        uint256 withdrawTime;
        mapping(uint256 => uint256) votedAmount;
    }
    
    mapping(uint256 => Proposal) private _proposals;
    mapping(address => Voter) private _voters;

    /// @notice Deploys the contract with the initial parameters
    /// (chairman, voteToken, minimumQuorum, debatingPeriodDuration)
    /// @dev Constructor should be used when deploying contract,
    /// @param chairPerson address of the chairman
    /// @param minimumQuorum minimum quorum needed for successful voting
    /// @param debatingPeriodDuration debating period 
    constructor(
        address chairPerson,
        uint256 minimumQuorum,
        uint256 debatingPeriodDuration
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CHAIRMAN, chairPerson);

        _minQuorum = minimumQuorum;
        _debatePeriod = debatingPeriodDuration;
    }


    /// @notice Event that notices about added new proposal
    event NewProposal(uint256 indexed id, address recipient, string description);
    
    /// @notice Event that notices about finished proposal
    event FinishedProposal(
            uint256 indexed id,
            bool indexed called,
            uint256 forVotes,
            uint256 againstVotes);


    /// @notice sets stake contract address
    /// @return true if staker was set
    function setStakeContract(address stake) external
        onlyRole(DEFAULT_ADMIN_ROLE) returns(bool) {
            _grantRole(STAKE, stake);
            _stake = IStake(stake);

            return true;
        } 

    /// @notice check if staker has no active proposals
    /// @return true if staker can unstake
    function canUnstake(address staker) external view
        onlyRole(STAKE) returns(bool) {
            return block.timestamp >= _voters[staker].withdrawTime;
        }


    /// @notice can be called by anyone to deposit tokens
    /// @dev gets the staked amount as votes deposit
    /// @return true if deposit is successful
    function deposit() external returns(bool) {
            _voters[msg.sender].votes = _stake.getVotes(msg.sender);

            return true;
        }

    
    /// @notice can be called by anyone to deposit tokens
    /// @return true if deposit set to zero
    function emptyDeposit(address voter) external onlyRole(STAKE) returns(bool) {
            _voters[voter].votes = 0;

            return true;
        }


    /// @notice Function that adds new proposal
    /// @param callData of the function that will be called
    /// should be encoded as bytes
    /// @param _recipient address of the contract that will call the function
    /// @return count of total proposals
    function addProposal(
        bytes memory callData,
        address _recipient,
        string memory description
    ) external onlyRole(CHAIRMAN) returns(uint256) {
        Proposal storage newProposal = _proposals[_proposalID];

        emit NewProposal(_proposalID, _recipient, description);

        _proposalID++;

        newProposal.finishTime = block.timestamp + _debatePeriod;
        newProposal.recipient = _recipient;
        newProposal.callData = callData;
        newProposal.description = description;

        return _proposalID;
    }


    /// @notice can be called by anyone who has enough tokens deposited
    /// @notice voting is active until finish function is called
    /// @notice voter can add tokens to his existing deposit
    /// and vote for proposal he voted already with newly added tokens
    /// @param isVoteFor true if vote for, false if vote against
    /// @return true if voting is successful
    function vote(
        uint256 proposalID,
        uint256 amount,
        bool isVoteFor
    ) external returns(bool) {
        Proposal storage proposal = _proposals[proposalID];
        Voter storage voter = _voters[msg.sender];

        require(proposal.finishTime > 0, "Proposal is not active");
        require(
            voter.votes - voter.votedAmount[proposalID] >= amount,
            "Not enough votes");

        if(isVoteFor) {
            proposal.votesFor += amount;
            voter.votedAmount[proposalID] += amount;
        } else {
            proposal.votesAgainst += amount;
            voter.votedAmount[proposalID] += amount;
        }

        if(voter.withdrawTime < proposal.finishTime) {
            voter.withdrawTime = proposal.finishTime;
        }

        return true;
    }


    /// @notice can be called by anyone to finish proposal
    /// @notice calls the function if quorum is reached and
    /// votes for is greater than votes against
    /// otherwise proposal finishes with no call
    /// @notice sets finishTime to 0 so it can't be called again
    /// @return true if proposal is finished successfully
    function finishProposal(uint256 proposalID) external returns(bool) {
        Proposal storage proposal = _proposals[proposalID];
        require(
            proposal.finishTime > 0,
            "Proposal is not active");
        require(
            block.timestamp >= proposal.finishTime,
            "Finish time not come");
        require(
            proposal.votesFor + proposal.votesAgainst >= _minQuorum,
            "Not enough votes");

        proposal.finishTime = 0;

        bool isCalling = proposal.votesFor > proposal.votesAgainst;

        emit FinishedProposal(
            proposalID, isCalling, proposal.votesFor, proposal.votesAgainst);

        if(isCalling) {
            (bool success, ) = proposal.recipient.call
                {value: 0}(proposal.callData);

             require(success, "Operation failed");
        }

        return true;
    }


    
}