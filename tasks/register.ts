/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-extraneous-import */
import * as dotenv from "dotenv";

import { task } from "hardhat/config"
import { Contract } from "ethers";
import "@nomiclabs/hardhat-waffle";

dotenv.config();

task("register", "Register user")
  .setAction(async (taskArgs, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const contractAddr = process.env.CONTRACT_ADDRESS_PLATFORM;

    const PlatformContract = <Contract>await hre.ethers.getContractAt(
      "ACDMPlatform",
      contractAddr as string,
      signer
    );

    const result = await PlatformContract.register();

    console.log(result);
  });
