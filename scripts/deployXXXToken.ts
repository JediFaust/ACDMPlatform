/* eslint-disable prefer-const */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Contract } from "ethers";

async function main() {
  let xxxToken: Contract;

  const totalAmount = 10000000;

  const XXXToken = await ethers.getContractFactory("XXXToken");
  xxxToken = <Contract>await XXXToken.deploy("XXXToken", "XXT", totalAmount);
  await xxxToken.deployed();

  console.log("XXXToken deployed to:", xxxToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
