import { expect } from "chai";
import { ethers, hardhatArguments } from "hardhat";
import { BigNumber, Contract } from "ethers";
import * as dotenv from "dotenv";
// eslint-disable-next-line node/no-missing-import
// import { MockNFT } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
dotenv.config();

describe("ETHr", () => {
  const netId = 31337;
  let testSC: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  const zero = "0x0000000000000000000000000000000000000000";

  // Configure
  before(async () => {
    console.log("Start Test script");
    [owner, addr1, addr2] = await ethers.getSigners();
    console.log("owner: ", owner.address);

    const TestSC = await ethers.getContractFactory("ETHr");
    testSC = await TestSC.deploy("ETHr", "ETHr");
    await testSC.deployed();
    console.log("contract address:", testSC.address);
    console.log("deployer address:", testSC.deployTransaction.from);

    console.log("chain ID:", netId);
  });

  // #################################################
  // Test
  // #################################################

  it("pass> deposit", async () => {
    const sendAmt = BigNumber.from("1000000000000000000");
    const oldAmount = await testSC.balanceOf(addr1.address);
    console.log("oldAmount: " + oldAmount);
    await expect(await testSC.connect(addr1).deposit({ value: sendAmt})).to.changeEtherBalances([addr1], [sendAmt.mul(-1)]);
    const newAmount = await testSC.balanceOf(addr1.address);
    console.log("newAmount: " + newAmount);
    expect(newAmount.sub(oldAmount)).eq(BigNumber.from(sendAmt));
    const account = await testSC.accounts(0);
    console.log("account: " + account);
    expect(account).eq(addr1.address);
  });

  it("pass> transfer", async () => {
    const sendAmt = BigNumber.from("200000000000000000");
    const oldAmount1 = await testSC.balanceOf(addr1.address);
    console.log("oldAmount1: " + oldAmount1);
    const oldAmount2 = await testSC.balanceOf(addr2.address);
    console.log("oldAmount2: " + oldAmount2);
    await expect(testSC.connect(addr1).transfer(addr2.address, sendAmt)).to.not.reverted;
    const newAmount1 = await testSC.balanceOf(addr1.address);
    console.log("newAmount1: " + newAmount1);
    const newAmount2 = await testSC.balanceOf(addr2.address);
    console.log("newAmount2: " + newAmount2);
    expect(newAmount2.sub(oldAmount2)).eq(sendAmt);
    expect(oldAmount1.sub(newAmount1)).eq(sendAmt);
    const account = await testSC.accounts(1);
    console.log("account: " + account);
    expect(account).eq(addr2.address);
  });

  it("pass> withdraw", async () => {
    const sendAmt = BigNumber.from("100000000000000000");
    const oldAmount = await testSC.balanceOf(addr2.address);
    console.log("oldAmount: " + oldAmount);
    await expect(await testSC.connect(addr2).withdraw(sendAmt)).to.changeEtherBalances([addr2], [sendAmt]);
    const newAmount = await testSC.balanceOf(addr2.address);
    console.log("newAmount: " + newAmount);

  });
});

async function increaseTime(sec: number) {
  await ethers.provider.send("evm_increaseTime", [sec]);
  await ethers.provider.send("evm_mine", []);
  const blockNum = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNum);
  const curTime = block.timestamp;
  console.log("current time:", BigNumber.from(curTime));
}
