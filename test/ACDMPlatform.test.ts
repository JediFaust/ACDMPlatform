/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { Contract, BigNumber } from "ethers";
import { ethers, waffle } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

describe("ACDMTest", function () {
  let owner: SignerWithAddress;
  let userOne: SignerWithAddress;
  let userTwo: SignerWithAddress;
  let userThree: SignerWithAddress;
  let firstReferer: SignerWithAddress;
  let secondReferer: SignerWithAddress;
  let chairman: SignerWithAddress;
  let DAO: Contract;
  let Staking: Contract;
  let XXXToken: Contract;
  let XXXLPToken: Contract;
  let ACDMToken: Contract;
  let ACDMPlatform: Contract;
  // Set totalAmount as 1000000 * 10 ** 18
  const totalAmount = BigNumber.from("1000000000000000000000000");
  const provider = waffle.provider;

  beforeEach(async function () {
    // Get the signers
    [
      owner,
      userOne,
      userTwo,
      userThree,
      chairman,
      firstReferer,
      secondReferer,
    ] = await ethers.getSigners();

    // Deploy XXX Token
    const XXXERC20 = await ethers.getContractFactory("XXXToken");
    XXXToken = <Contract>await XXXERC20.deploy("XXXToken", "XXT", totalAmount);
    await XXXToken.deployed();

    // Deploy Academ Token
    const ACDMERC20 = await ethers.getContractFactory("ACDMToken");
    ACDMToken = <Contract>(
      await ACDMERC20.deploy("AcademToken", "ACDM", totalAmount)
    );
    await ACDMToken.deployed();

    // Deploy XXX LP Token
    const LPToken = await ethers.getContractFactory("XXXToken");
    XXXLPToken = <Contract>(
      await LPToken.deploy("XXXLPToken", "XXL", totalAmount)
    );
    await XXXLPToken.deployed();

    // Deploy the XXXDAO
    const testDAO = await ethers.getContractFactory("XXXDAO");
    DAO = <Contract>(
      await testDAO.deploy(
        chairman.address,
        totalAmount.div(4),
        3 * 24 * 60 * 60
      )
    );
    await DAO.deployed();

    // Deploy XXX Staking
    const XXXStake = await ethers.getContractFactory("XXXStake");
    Staking = <Contract>(
      await XXXStake.deploy(XXXLPToken.address, XXXToken.address, DAO.address)
    );
    await Staking.deployed();

    // Set Staking contract to the DAO
    await DAO.setStakeContract(Staking.address);

    // Deploy ACDM Platform
    const Platform = await ethers.getContractFactory("ACDMPlatform");
    ACDMPlatform = <Contract>(
      await Platform.deploy(ACDMToken.address, DAO.address)
    );
    await ACDMPlatform.deployed();

    // Set minters
    await ACDMToken.setMinter(ACDMPlatform.address);
  });

  it("should be deployed", async function () {
    expect(XXXToken.address).to.be.properAddress;
    expect(ACDMToken.address).to.be.properAddress;
    expect(Staking.address).to.be.properAddress;
    expect(DAO.address).to.be.properAddress;
    expect(ACDMPlatform.address).to.be.properAddress;
  });

  it("should register without referer and not be able to register again", async function () {
    await ACDMPlatform.connect(userOne).register();

    await expect(ACDMPlatform.connect(userOne).register()).to.be.revertedWith(
      "You already registered"
    );
  });

  it("should register with proper referer", async function () {
    await ACDMPlatform.connect(firstReferer).register();
    await expect(
      ACDMPlatform.connect(userOne).registerWithReferer(secondReferer.address)
    ).to.be.revertedWith("Referer is not registered");

    await ACDMPlatform.connect(userOne).registerWithReferer(
      firstReferer.address
    );
    await expect(
      ACDMPlatform.connect(userOne).registerWithReferer(firstReferer.address)
    ).to.be.revertedWith("You already registered");
  });

  it("should be able to start sale round and buy ACDM", async function () {
    const timeStamp = (await provider.getBlock(1)).timestamp;

    await ACDMPlatform.connect(userOne).register();

    expect(await ACDMPlatform.connect(userThree).startSaleRound()).to.emit(
      ACDMPlatform,
      "SaleRoundStarted"
    );
    await expect(
      ACDMPlatform.connect(userOne).startSaleRound()
    ).to.be.revertedWith("Sale round already started");

    // First sale amount should be equal to 100000 * 10 ** 6
    expect(await ACDMToken.balanceOf(ACDMPlatform.address)).to.be.equal(
      100000 * 10 ** 6
    );

    // Platform ETH balance before buy should be 0
    const balanceBefore = await provider.getBalance(ACDMPlatform.address);
    expect(balanceBefore).to.be.equal(BigNumber.from("0"));

    // Buy ACDM for 1 ETH
    await ACDMPlatform.connect(userOne).buy({
      value: BigNumber.from("1000000000000000000"),
    });

    // Platform ETH balance after buy should be 1 ETH
    const balanceAfter = await provider.getBalance(ACDMPlatform.address);
    expect(balanceAfter).to.be.equal(BigNumber.from("1000000000000000000"));

    // Should get 100 000 ACDM tokens
    expect(await ACDMToken.balanceOf(userOne.address)).to.be.equal(
      100000 * 10 ** 6
    );
  });

  it("should be able to send commission to single referer", async function () {
    await ACDMPlatform.connect(firstReferer).register();
    await ACDMPlatform.connect(userOne).registerWithReferer(
      firstReferer.address
    );

    await ACDMPlatform.connect(userThree).startSaleRound();

    // Platform ETH balance before buy should be 0
    const balanceBefore = await provider.getBalance(ACDMPlatform.address);
    expect(balanceBefore).to.be.equal(BigNumber.from("0"));

    // Get referers balance before buy
    const firstRefererBalanceBefore = await provider.getBalance(
      firstReferer.address
    );

    // Buy ACDM for 1 ETH
    await ACDMPlatform.connect(userOne).buy({
      value: BigNumber.from("1000000000000000000"),
    });

    // Get referers balance after buy
    const firstRefererBalanceAfter = await provider.getBalance(
      firstReferer.address
    );

    // First referer should get 5% of commission
    expect(firstRefererBalanceAfter.sub(firstRefererBalanceBefore)).to.be.equal(
      BigNumber.from("1000000000000000000").mul(5).div(100)
    );

    // Platform ETH balance after buy should be 95% of 1 ETH
    const balanceAfter = await provider.getBalance(ACDMPlatform.address);
    expect(balanceAfter).to.be.equal(
      BigNumber.from("1000000000000000000").mul(95).div(100)
    );
  });

  it("should be able to send commission to both referers", async function () {
    await ACDMPlatform.connect(secondReferer).register();
    await ACDMPlatform.connect(firstReferer).registerWithReferer(
      secondReferer.address
    );
    await ACDMPlatform.connect(userOne).registerWithReferer(
      firstReferer.address
    );

    await ACDMPlatform.connect(userThree).startSaleRound();

    // First sale amount should be equal to 100000 * 10 ** 6
    expect(await ACDMToken.balanceOf(ACDMPlatform.address)).to.be.equal(
      100000 * 10 ** 6
    );

    // Platform ETH balance before buy should be 0
    const balanceBefore = await provider.getBalance(ACDMPlatform.address);
    expect(balanceBefore).to.be.equal(BigNumber.from("0"));

    // Get referers balance before buy
    const firstRefererBalanceBefore = await provider.getBalance(
      firstReferer.address
    );
    const secondRefererBalanceBefore = await provider.getBalance(
      secondReferer.address
    );

    // Buy ACDM for 1 ETH
    await ACDMPlatform.connect(userOne).buy({
      value: BigNumber.from("1000000000000000000"),
    });

    // Get referers balance after buy
    const firstRefererBalanceAfter = await provider.getBalance(
      firstReferer.address
    );
    const secondRefererBalanceAfter = await provider.getBalance(
      secondReferer.address
    );

    // First referer should get 5% of commission
    expect(firstRefererBalanceAfter.sub(firstRefererBalanceBefore)).to.be.equal(
      BigNumber.from("1000000000000000000").mul(5).div(100)
    );

    // Second referer should get 3% of commission
    expect(
      secondRefererBalanceAfter.sub(secondRefererBalanceBefore)
    ).to.be.equal(BigNumber.from("1000000000000000000").mul(3).div(100));

    // Platform ETH balance after buy should be 92% of 1 ETH
    const balanceAfter = await provider.getBalance(ACDMPlatform.address);
    expect(balanceAfter).to.be.equal(
      BigNumber.from("1000000000000000000").mul(92).div(100)
    );

    // Should get 100 000 ACDM tokens
    expect(await ACDMToken.balanceOf(userOne.address)).to.be.equal(
      100000 * 10 ** 6
    );
  });

  it("should be able to start trade round and trade properly with referers", async function () {
    // Register referers
    await ACDMPlatform.connect(secondReferer).register();
    await ACDMPlatform.connect(firstReferer).registerWithReferer(
      secondReferer.address
    );

    // Register users
    await ACDMPlatform.connect(userTwo).registerWithReferer(
      firstReferer.address
    );
    await ACDMPlatform.connect(userOne).register();

    await ACDMPlatform.connect(userOne).startSaleRound();

    // Platform ACDM balance should be 100000 * 10 ** 6 on sale round
    const balanceBefore = await ACDMToken.balanceOf(ACDMPlatform.address);
    expect(balanceBefore).to.be.equal(100000 * 10 ** 6);

    // Buy ACDM for 0.5 ETH
    await ACDMPlatform.connect(userOne).buy({
      value: BigNumber.from("1000000000000000000").div(2),
    });

    // Should recieve 50 000 ACDM tokens
    expect(await ACDMToken.balanceOf(userOne.address)).to.be.equal(
      50000 * 10 ** 6
    );

    // Platform ACDM tokens left on sale round
    const balanceAfterBuy = await ACDMToken.balanceOf(ACDMPlatform.address);
    expect(balanceAfterBuy).to.be.equal(50000 * 10 ** 6);

    // Roll up to trade round
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    // Should start trade round and revert if trade round already started
    await ACDMPlatform.connect(userOne).startTradeRound();
    await expect(
      ACDMPlatform.connect(userOne).startTradeRound()
    ).to.be.revertedWith("Trade round already started");

    // Platform ACDM tokens should be burned
    const balanceAfter = await ACDMToken.balanceOf(ACDMPlatform.address);
    expect(balanceAfter).to.be.equal(0);

    // Get referers balance before trade
    const firstRefererBalanceBefore = await provider.getBalance(
      firstReferer.address
    );
    const secondRefererBalanceBefore = await provider.getBalance(
      secondReferer.address
    );

    // Add order with double price and full amount
    await ACDMToken.connect(userOne).approve(
      ACDMPlatform.address,
      50000 * 10 ** 6
    );
    const orderPrice = 10000000 * 2;
    await ACDMPlatform.connect(userOne).addOrder(orderPrice, 50000 * 10 ** 6);

    // Should redeem 50 000 ACDM tokens and have proper balances
    await ACDMPlatform.connect(userTwo).redeemOrder(0, 50000 * 10 ** 6, {
      value: BigNumber.from("1000000000000000000"),
    });
    expect(await ACDMToken.balanceOf(userTwo.address)).to.be.equal(
      50000 * 10 ** 6
    );
    expect(await ACDMToken.balanceOf(userOne.address)).to.be.equal(0);

    // Get referers balance after buy
    const firstRefererBalanceAfter = await provider.getBalance(
      firstReferer.address
    );
    const secondRefererBalanceAfter = await provider.getBalance(
      secondReferer.address
    );

    // First referer should get 5% of commission
    expect(firstRefererBalanceAfter.sub(firstRefererBalanceBefore)).to.be.equal(
      BigNumber.from("1000000000000000000").mul(25).div(1000)
    );

    // Second referer should get 3% of commission
    expect(
      secondRefererBalanceAfter.sub(secondRefererBalanceBefore)
    ).to.be.equal(BigNumber.from("1000000000000000000").mul(25).div(1000));
  });

  it("should be able to start third sale round and get right prices and sale amounts", async function () {
    // Register users
    await ACDMPlatform.connect(userOne).register();
    await ACDMPlatform.connect(userTwo).register();

    await ACDMPlatform.connect(userOne).startSaleRound();

    // Buy ACDM for 0.5 ETH
    await ACDMPlatform.connect(userOne).buy({
      value: BigNumber.from("1000000000000000000").div(2),
    });

    // Should recieve 50 000 ACDM tokens
    expect(await ACDMToken.balanceOf(userOne.address)).to.be.equal(
      50000 * 10 ** 6
    );

    // Roll up to trade round
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    // Should start trade round and revert if trade round already started
    await ACDMPlatform.connect(userOne).startTradeRound();

    // Add order with double price and full amount
    await ACDMToken.connect(userOne).approve(
      ACDMPlatform.address,
      50000 * 10 ** 6
    );
    const orderPrice = 10000000 * 2;
    await ACDMPlatform.connect(userOne).addOrder(orderPrice, 50000 * 10 ** 6);

    // Balance of userTwo before redeem
    const balanceEthBeforeRedeem = await provider.getBalance(userTwo.address);

    // Should redeem partly for 0.5 ETH when given 1 ETH
    await ACDMPlatform.connect(userTwo).redeemOrder(0, 25000 * 10 ** 6, {
      value: BigNumber.from("1000000000000000000"),
    });

    // Balance of userTwo after redeem and gas consumption
    const balanceEthAfterRedeem = await provider.getBalance(userTwo.address);

    // Should send back extra 0.5 ETH and get 25000 ACDM
    expect(balanceEthBeforeRedeem.sub(balanceEthAfterRedeem)).to.be.equal(
      BigNumber.from("1000000000000000000")
        .div(2)
        .add(BigNumber.from("144478824246990")) // Gas
    );
    expect(await ACDMToken.balanceOf(userTwo.address)).to.be.equal(
      25000 * 10 ** 6
    );

    // Roll up time and start next sale round
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    // ACDM Balance before next sale round
    const balanceBefore = await ACDMToken.balanceOf(ACDMPlatform.address);

    await ACDMPlatform.connect(userOne).startSaleRound();

    // ACDM Balance after next sale round
    const balanceAfter = await ACDMToken.balanceOf(ACDMPlatform.address);

    // New minted tokens should be equal 26737.96 because tradeVolume was 0.5 ETH
    expect(balanceAfter.sub(balanceBefore)).to.be.equal(34965034965);

    // Should return proper sale price
    expect(await ACDMPlatform.sellPriceEth()).to.be.equal(14300000);

    // Roll up time and start next trade round
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    await ACDMPlatform.connect(userOne).startTradeRound();

    // Should redeem partly for 0.5 ETH
    await ACDMPlatform.connect(userTwo).redeemOrder(0, 25000 * 10 ** 6, {
      value: BigNumber.from("1000000000000000000").div(2),
    });

    // Roll up time and start next sale round
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    // ACDM Platform Balance before next sale round
    const balanceBeforeThirdCycle = await ACDMToken.balanceOf(
      ACDMPlatform.address
    );

    await ACDMPlatform.connect(userOne).startSaleRound();

    // ACDM Balance after next sale round
    const balanceAfterThirdCycle = await ACDMToken.balanceOf(
      ACDMPlatform.address
    );

    // New minted tokens should be equal 26737.96 because tradeVolume was 0.5 ETH
    expect(balanceAfterThirdCycle.sub(balanceBeforeThirdCycle)).to.be.equal(
      26696566821 // ~ 0.5 Eth / 0.0000187
    );

    // Should return proper sale price
    expect(await ACDMPlatform.sellPriceEth()).to.be.equal(18729000);
  });
});
