// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @title ACDM Token contract with ERC20 compatibility
/// @author github.com/JediFaust
/// @dev All functions tested successfully and have no errors

contract ACDMToken is ERC20, ERC20Burnable, AccessControl {
   bytes32 public constant MINTER = keccak256("MINTER");

   /// @notice Deploys the contract with the initial parameters(name, symbol, initial supply)
   /// @dev ADMIN is the address that deploys the contract
   /// @param _name Name of the token
   /// @param _symbol Symbol of the token
   /// @param _initialSupply Initial supply of the token,
   /// constructor will mint this amount of tokens to the ADMIN
   constructor(
      string memory _name,
      string memory _symbol,
      uint256 _initialSupply
   ) ERC20(_name, _symbol) {
      _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
      _grantRole(MINTER, msg.sender);
      _mint(msg.sender, _initialSupply);
   }


   function setMinter(address minter) external onlyRole(DEFAULT_ADMIN_ROLE) returns(bool) {
       _setupRole(MINTER, minter);

       return true;
   }

   /// @dev Returns the number of decimals used to get its user representation.
   /// For example, if `decimals` equals `2`, a balance of `505` tokens should
   /// be displayed to a user as `5.05` (`505 / 10 ** 2`).
   function decimals() public view virtual override returns (uint8) {
        return 6;
   }

   /// @dev Creates '_value' tokens and increase the total supply
   /// Emits a {Transfer} event with `from` set to the zero address
   /// `_to` cannot be the zero address
   /// @param _to Address of the reciever
   /// @param _value Amount of tokens to mint
   /// @return true if transaction is successful
   function mint(address _to, uint256 _value) external onlyRole(MINTER) returns(bool) {
      _mint(_to, _value);
      
      return true;
   }

}
