// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface IDAO {
    function canUnstake(address staker) external returns(bool);

    function emptyDeposit(address voter) external returns(bool);
}