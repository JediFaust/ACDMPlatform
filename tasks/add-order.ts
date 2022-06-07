/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-extraneous-import */
import * as dotenv from "dotenv";

import { task } from "hardhat/config"
import { Contract } from "ethers";
import "@nomiclabs/hardhat-waffle";

dotenv.config();

task("add-order", "Add order to trade")
  .addParam("price", "ETH Price of ACDM")
  .addParam("amount", "Amount ACDM tokens")
  .setAction(async (taskArgs, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const contractAddr = process.env.CONTRACT_ADDRESS_PLATFORM;

    const PlatformContract = <Contract>await hre.ethers.getContractAt(
      "ACDMPlatform",
      contractAddr as string,
      signer
    );

    const result = await PlatformContract.addOrder(taskArgs.price, taskArgs.amount);

    console.log(result);
  });
