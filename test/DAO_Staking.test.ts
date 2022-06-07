/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { Contract, BigNumber } from "ethers";
import { ethers, waffle } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

describe("DAOTest", function () {
  let owner: SignerWithAddress;
  let userOne: SignerWithAddress;
  let userTwo: SignerWithAddress;
  let reciever: SignerWithAddress;
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
    [owner, userOne, userTwo, chairman, reciever] = await ethers.getSigners();

    // Deploy XXX Token
    const XXXERC20 = await ethers.getContractFactory("XXXToken");
    XXXToken = <Contract>await XXXERC20.deploy("XXXToken", "XXT", totalAmount);
    await XXXToken.deployed();

    // Deploy XXX LP Token
    const LPToken = await ethers.getContractFactory("XXXToken");
    XXXLPToken = <Contract>(
      await LPToken.deploy("XXXLPToken", "XXL", totalAmount)
    );
    await XXXLPToken.deployed();

    // Deploy Academ Token
    const ACDMERC20 = await ethers.getContractFactory("ACDMToken");
    ACDMToken = <Contract>(
      await ACDMERC20.deploy("AcademToken", "ACDM", totalAmount)
    );
    await ACDMToken.deployed();

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
    await XXXToken.setMinter(Staking.address);
    await XXXToken.setMinter(DAO.address);
    await XXXToken.setMinter(owner.address);
    await XXXLPToken.setMinter(owner.address);
  });

  it("should be deployed", async function () {
    expect(XXXToken.address).to.be.properAddress;
    expect(XXXLPToken.address).to.be.properAddress;
    expect(Staking.address).to.be.properAddress;
    expect(DAO.address).to.be.properAddress;
  });

  it("should be able to stake and vote", async function () {
    // Should have proper amounts after minting
    await XXXLPToken.mint(userOne.address, totalAmount.div(4));

    const balanceBefore = await XXXLPToken.balanceOf(userOne.address);
    const daoBalanceBefore = await XXXLPToken.balanceOf(DAO.address);

    expect(balanceBefore).to.be.equal(totalAmount.div(4));
    expect(daoBalanceBefore).to.be.equal(BigNumber.from("0"));

    await XXXLPToken.connect(userOne).approve(
      Staking.address,
      totalAmount.div(4)
    );

    // Should have proper amounts after staking
    await Staking.connect(userOne).stake(totalAmount.div(4));
    await Staking.grantRole(Staking.DAO(), owner.address);

    const balanceAfter = await XXXLPToken.balanceOf(userOne.address);
    const daoBalanceAfter = await XXXLPToken.balanceOf(Staking.address);

    expect(balanceAfter).to.be.equal(BigNumber.from("0"));
    expect(daoBalanceAfter).to.be.equal(totalAmount.div(4));

    // Should not be able to claim when reward time is not came
    await expect(Staking.connect(userOne).claim()).to.be.revertedWith(
      "No unclaimed rewards"
    );

    // Roll up lock time
    await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    const jsonInterface = ["function mint(address _to,uint256 _value)"];

    const iface = new ethers.utils.Interface(jsonInterface);
    const callData = iface.encodeFunctionData("mint", [userTwo.address, 9990]);

    // Add proposal to mint 9990 tokens to userTwo
    await DAO.connect(chairman).addProposal(
      callData,
      XXXToken.address,
      "Mint 9990 XXX to userOne"
    );

    // Deposit Votes to DAO
    await DAO.connect(userOne).deposit();

    // Should get proper votes from Staking to DAO
    expect((await DAO.voters(userOne.address))[0]).to.be.equal(
      totalAmount.div(4)
    );

    // Vote for minting
    await DAO.connect(userOne).vote(0, totalAmount.div(4), true);

    // Should get proper amount of reward after claim as 3 percent
    await Staking.connect(userOne).claim();

    const balanceAfterClaim = await XXXToken.balanceOf(userOne.address);
    expect(balanceAfterClaim).to.be.equal(totalAmount.div(4).mul(3).div(100));

    // Should not be able to claim when already claimed
    await expect(Staking.connect(userOne).claim()).to.be.revertedWith(
      "No unclaimed rewards"
    );

    // Should not be able to unstake when have active voting
    await expect(Staking.connect(userOne).unstake()).to.be.revertedWith(
      "Finish votes first"
    );

    // Roll up proposal finish time
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    // Should execute mint function after finishing proposal
    await DAO.connect(userOne).finishProposal(0);
    const balanceAfterExecute = await XXXToken.balanceOf(userTwo.address);
    expect(balanceAfterExecute).to.be.equal(9990);

    // Should get proper amount after unstake
    await Staking.connect(userOne).unstake();
    const balanceAfterUnstake = await XXXLPToken.balanceOf(userOne.address);
    expect(balanceAfterUnstake).to.be.equal(totalAmount.div(4));
  });

  it("should set new reward percent, lock time and reward rate from DAO voting", async function () {
    // Mint
    await XXXLPToken.mint(userOne.address, totalAmount.div(4));
    await XXXLPToken.connect(userOne).approve(
      Staking.address,
      totalAmount.div(4)
    );

    // Stake
    await Staking.connect(userOne).stake(totalAmount.div(4));
    await Staking.grantRole(Staking.DAO(), owner.address);

    // Add proposal to set reward percent to 5
    const setRewardPercentJSON = [
      "function setRewardPercent(uint256 _newPercent)",
    ];

    const setRewardPercentInterface = new ethers.utils.Interface(
      setRewardPercentJSON
    );
    const setRewardPercentCalldata =
      setRewardPercentInterface.encodeFunctionData("setRewardPercent", [5]);

    await DAO.connect(chairman).addProposal(
      setRewardPercentCalldata,
      Staking.address,
      "Change reward to 5%"
    );

    // Add proposal to set reward rate to 1 day
    const setRewardRateJSON = ["function setRewardRate(uint256 _newRate)"];

    const setRewardRateInterface = new ethers.utils.Interface(
      setRewardRateJSON
    );
    const setRewardRateCalldata = setRewardRateInterface.encodeFunctionData(
      "setRewardRate",
      [1 * 24 * 60 * 60]
    );

    await DAO.connect(chairman).addProposal(
      setRewardRateCalldata,
      Staking.address,
      "Set reward rate to 1 day"
    );

    // Add proposal to set lock time to 3 days
    const setLockTimeJSON = ["function setLockTime(uint256 _newTime)"];

    const setLockTimeInterface = new ethers.utils.Interface(setLockTimeJSON);
    const setLockTimeCalldata = setLockTimeInterface.encodeFunctionData(
      "setLockTime",
      [3 * 24 * 60 * 60]
    );

    await DAO.connect(chairman).addProposal(
      setLockTimeCalldata,
      Staking.address,
      "Set lock time to 3 days"
    );

    // Deposit Votes to DAO
    await DAO.connect(userOne).deposit();

    // Should get proper votes from Staking to DAO
    expect((await DAO.voters(userOne.address))[0]).to.be.equal(
      totalAmount.div(4)
    );

    // Vote less amount against change reward percent
    await DAO.connect(userOne).vote(0, totalAmount.div(4).div(4), false);

    // Roll up proposal finish time
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    // Should revert when quiroum not reached
    await expect(DAO.connect(userOne).finishProposal(0)).to.be.revertedWith(
      "Quorum not reached"
    );

    // Vote enough amount for change reward percent
    await DAO.connect(userOne).vote(0, totalAmount.div(4).div(4).mul(3), true);

    // Vote enough amount for change reward rate
    await DAO.connect(userOne).vote(1, totalAmount.div(4), true);

    // Vote enough amount for change lock time
    await DAO.connect(userOne).vote(2, totalAmount.div(4), true);

    // Should get reward with new changes after finishing proposals
    await DAO.connect(userTwo).finishProposal(0);
    await DAO.connect(userTwo).finishProposal(1);
    await DAO.connect(userTwo).finishProposal(2);

    // Should claim proper reward after unstake
    await Staking.connect(userOne).unstake();
    const balanceAfterUnstake = await XXXToken.balanceOf(userOne.address);
    expect(balanceAfterUnstake).to.be.equal(
      totalAmount.div(4).mul(5).div(100).mul(3)
    );
  });

  it("should not change reward percent when for votes not reached", async function () {
    // Mint
    await XXXLPToken.mint(userOne.address, totalAmount.div(4));
    await XXXLPToken.connect(userOne).approve(
      Staking.address,
      totalAmount.div(4)
    );

    // Stake
    await Staking.connect(userOne).stake(totalAmount.div(4));
    await Staking.grantRole(Staking.DAO(), owner.address);

    const jsonInterface = ["function setRewardPercent(uint256 _newPercent)"];

    const iface = new ethers.utils.Interface(jsonInterface);
    const callData = iface.encodeFunctionData("setRewardPercent", [95]);

    // Add proposal to set reward percent to 95
    await DAO.connect(chairman).addProposal(
      callData,
      Staking.address,
      "Change reward to 95%"
    );

    // Deposit Votes to DAO
    await DAO.connect(userOne).deposit();

    // Should get proper votes from Staking to DAO
    expect((await DAO.voters(userOne.address))[0]).to.be.equal(
      totalAmount.div(4)
    );

    // Vote against set new reward percent
    await DAO.connect(userOne).vote(0, totalAmount.div(4), false);

    // Roll up proposal finish time
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    // Should get reward with old percent after finishing proposal
    await DAO.connect(userOne).finishProposal(0);

    // Roll up for reach reward time
    await ethers.provider.send("evm_increaseTime", [4 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    // Should claim proper reward after unstake
    await Staking.connect(userOne).unstake();
    const balanceAfterUnstake = await XXXToken.balanceOf(userOne.address);
    expect(balanceAfterUnstake).to.be.equal(totalAmount.div(4).mul(3).div(100));
  });

  it("should send trade commission and all ETH from DAO voting", async function () {
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

    // Should redeem partly for 0.5 ETH
    await ACDMPlatform.connect(userTwo).redeemOrder(0, 25000 * 10 ** 6, {
      value: BigNumber.from("500000000000000000"),
    });

    // Mint
    await XXXLPToken.mint(userOne.address, totalAmount.div(4));
    await XXXLPToken.connect(userOne).approve(
      Staking.address,
      totalAmount.div(4)
    );

    // Stake
    await Staking.connect(userOne).stake(totalAmount.div(4));
    await Staking.grantRole(Staking.DAO(), owner.address);

    // Add proposal to send trade commission to receiver
    const sendCommissionOnlyJSON = [
      "function sendCommissionOnly(address reciever)",
    ];

    const sendCommissionOnlyInterface = new ethers.utils.Interface(
      sendCommissionOnlyJSON
    );
    const sendCommissionOnlyCalldata =
      sendCommissionOnlyInterface.encodeFunctionData("sendCommissionOnly", [
        reciever.address,
      ]);

    await DAO.connect(chairman).addProposal(
      sendCommissionOnlyCalldata,
      ACDMPlatform.address,
      "Send trade commission"
    );

    // Add proposal to send trade commission to receiver
    const sendAllEthJSON = ["function sendAll(address reciever)"];

    const sendAllEthInterface = new ethers.utils.Interface(sendAllEthJSON);
    const sendAllEthCalldata = sendAllEthInterface.encodeFunctionData(
      "sendAll",
      [reciever.address]
    );

    await DAO.connect(chairman).addProposal(
      sendAllEthCalldata,
      ACDMPlatform.address,
      "Send all ETH"
    );

    // Deposit Votes to DAO
    await DAO.connect(userOne).deposit();

    // Should get proper votes from Staking to DAO
    expect((await DAO.voters(userOne.address))[0]).to.be.equal(
      totalAmount.div(4)
    );

    // Vote enough amount for send trade commission
    await DAO.connect(userOne).vote(0, totalAmount.div(4), true);

    // Vote enough amount for send all ETH
    await DAO.connect(userOne).vote(1, totalAmount.div(4), true);

    // Roll up proposal finish time
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    // Get ETH balances before finish proposal 0
    const recieverBalanceBefore = await ethers.provider.getBalance(
      reciever.address
    );

    await DAO.connect(userTwo).finishProposal(0);

    // Get ETH balances after finish proposal 0
    const recieverBalanceAfter = await ethers.provider.getBalance(
      reciever.address
    );

    // Get ETH balance before finish proposal 1
    const recieverBalanceBeforeAll = await ethers.provider.getBalance(
      reciever.address
    );
    const platformBalanceBeforeAll = await ethers.provider.getBalance(
      ACDMPlatform.address
    );

    await DAO.connect(userTwo).finishProposal(1);

    // Get reciever ETH balance after finish proposal 1
    const recieverBalanceAfterAll = await ethers.provider.getBalance(
      reciever.address
    );
    const platformBalanceAfterAll = await ethers.provider.getBalance(
      ACDMPlatform.address
    );

    // Should get trade commission as 5% of 0.5ETH
    expect(recieverBalanceAfter.sub(recieverBalanceBefore)).to.be.equal(
      BigNumber.from("500000000000000000").mul(5).div(100)
    );

    // Should spend 0.5 ETH
    expect(platformBalanceBeforeAll.sub(platformBalanceAfterAll)).to.be.equal(
      BigNumber.from("1000000000000000000").div(2)
    );

    // Should get all left ETH
    expect(recieverBalanceAfterAll.sub(recieverBalanceBeforeAll)).to.be.equal(
      BigNumber.from("1000000000000000000").div(2)
    );
  });

  it("should buy XXXToken and burn from DAO voting", async function () {
    await ACDMPlatform.connect(userOne).register();
    await ACDMPlatform.connect(userTwo).register();

    await ACDMPlatform.connect(userOne).startSaleRound();

    // Buy ACDM for 0.5 ETH
    await ACDMPlatform.connect(userOne).buy({
      value: BigNumber.from("1000000000000000000").div(2),
    });

    // Roll up to trade round
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    await ACDMPlatform.connect(userOne).startTradeRound();

    // Add order with double price and full amount
    await ACDMToken.connect(userOne).approve(
      ACDMPlatform.address,
      50000 * 10 ** 6
    );
    const orderPrice = 10000000 * 2;
    await ACDMPlatform.connect(userOne).addOrder(orderPrice, 50000 * 10 ** 6);

    // Should redeem partly for 0.5 ETH
    await ACDMPlatform.connect(userTwo).redeemOrder(0, 25000 * 10 ** 6, {
      value: BigNumber.from("500000000000000000"),
    });

    // Mint
    await XXXLPToken.mint(userOne.address, totalAmount.div(4));
    await XXXLPToken.connect(userOne).approve(
      Staking.address,
      totalAmount.div(4)
    );

    // Stake
    await Staking.connect(userOne).stake(totalAmount.div(4));
    await Staking.grantRole(Staking.DAO(), owner.address);

    // Add proposal to send trade commission to receiver
    const burnForAllJSON = ["function burnForAll(address token)"];

    const burnForAllInterface = new ethers.utils.Interface(burnForAllJSON);
    const burnForAllCalldata = burnForAllInterface.encodeFunctionData(
      "burnForAll",
      [XXXToken.address]
    );

    await DAO.connect(chairman).addProposal(
      burnForAllCalldata,
      ACDMPlatform.address,
      "Burn XXXToken after buy"
    );

    // Deposit Votes to DAO
    await DAO.connect(userOne).deposit();

    // Should get proper votes from Staking to DAO
    expect((await DAO.voters(userOne.address))[0]).to.be.equal(
      totalAmount.div(4)
    );

    // Vote enough amount for burn XXXToken after buy for all ETH
    await DAO.connect(userOne).vote(0, totalAmount.div(4), true);

    // Roll up proposal finish time
    await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    // Get ETH balances before finish proposal
    const platformBalanceBefore = await ethers.provider.getBalance(
      ACDMPlatform.address
    );

    await DAO.connect(userTwo).finishProposal(0);

    // Get ETH balances after finish proposal
    const platformBalanceAfter = await ethers.provider.getBalance(
      ACDMPlatform.address
    );

    // Should spend 0.5 ETH
    expect(platformBalanceBefore.sub(platformBalanceAfter)).to.be.equal(
      BigNumber.from("1000000000000000000").div(2).add("25000000000000000")
    );
  });
});
