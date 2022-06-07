/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-extraneous-import */
import * as dotenv from "dotenv";

import { task } from "hardhat/config"
import { Contract } from "ethers";
import "@nomiclabs/hardhat-waffle";

dotenv.config();

task("remove-order", "Remove added order")
  .addParam("id", "ID of order")
  .setAction(async (taskArgs, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const contractAddr = process.env.CONTRACT_ADDRESS_PLATFORM;

    const PlatformContract = <Contract>await hre.ethers.getContractAt(
      "ACDMPlatform",
      contractAddr as string,
      signer
    );

    const result = await PlatformContract.removeOrder(taskArgs.id);

    console.log(result);
  });
