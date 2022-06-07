/* eslint-disable prefer-const */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Contract } from "ethers";

async function main() {
  let acdmToken: Contract;
  let xxxDAO: Contract;
  let xxxStake: Contract;
  let acdmPlatform: Contract;

  const totalAmount = 10000000;
  const threeDays = 3 * 24 * 60 * 60;

  const ACDMToken = await ethers.getContractFactory("ACDMToken");
  acdmToken = <Contract>(
    await ACDMToken.deploy("ACDMToken", "ACDM", totalAmount)
  );
  await acdmToken.deployed();

  console.log("ACDMToken deployed to:", acdmToken.address);

  const DAO = await ethers.getContractFactory("XXXDAO");
  xxxDAO = <Contract>(
    await DAO.deploy(process.env.CHAIRMAN_ADDRESS, totalAmount / 4, threeDays)
  );
  await xxxDAO.deployed();

  console.log("XXXDAO deployed to:", xxxDAO.address);

  const Staking = await ethers.getContractFactory("XXXStake");
  xxxStake = <Contract>(
    await Staking.deploy(
      process.env.CONTRACT_ADDRESS_XXXLP,
      process.env.CONTRACT_ADDRESS_XXX,
      xxxDAO.address
    )
  );
  await xxxStake.deployed();

  await xxxDAO.setStakeContract(xxxStake.address);

  console.log("XXXStake deployed to:", xxxStake.address);

  const ACDMPlatform = await ethers.getContractFactory("ACDMPlatform");
  acdmPlatform = <Contract>(
    await ACDMPlatform.deploy(acdmToken.address, xxxDAO.address)
  );
  await acdmPlatform.deployed();

  console.log("ACDMPlatform deployed to:", acdmPlatform.address);

  await acdmToken.setMinter(acdmPlatform.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
