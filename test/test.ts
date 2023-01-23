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
  // bindAddress
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

<<<<<<< HEAD
  it("pass> withdraw", async () => {
    const sendAmt = BigNumber.from("100000000000000000");
    const oldAmount = await testSC.balanceOf(addr2.address);
    console.log("oldAmount: " + oldAmount);
    await expect(await testSC.connect(addr2).withdraw(sendAmt)).to.changeEtherBalances([addr2], [sendAmt]);
    const newAmount = await testSC.balanceOf(addr2.address);
    console.log("newAmount: " + newAmount);
=======
  it("fail> bindAddress: Not bind wallet itself", async () => {
    const year = BigNumber.from(1);
    await expect(testSC.connect(addr1).bindAddress(addr1.address, year)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> bindAddress: Allow 1-10 years", async () => {
    let year = BigNumber.from(0);
    await expect(testSC.connect(addr1).bindAddress(addr2.address, year)).to.be.revertedWith("InvalidValue");
    year = BigNumber.from(11);
    await expect(testSC.connect(addr1).bindAddress(addr2.address, year)).to.be.revertedWith("InvalidValue");
  });

  it("fail> bindAddress: Invalid fee value", async () => {
    const year = BigNumber.from(1);
    const fee = await testSC.fee();
    if(fee != 0){
      await expect(testSC.connect(addr1).bindAddress(addr2.address, year)).to.be.revertedWith("InvalidValue");
    }
  });

  it("pass> bindAddress", async () => {
    const year = BigNumber.from(1);
    const fee = await testSC.getFee(addr1.address, year);
    await expect(testSC.connect(addr1).bindAddress(addr2.address, year, { value: fee.mul(year) })).to.not.reverted;
    const get1 = await testSC.getAddress(addr1.address);
    const get2 = await testSC.getAddress(addr2.address);
    expect(get1[0]).eq(addr2.address);
    expect(get2[0]).eq(addr1.address);
    await expect(testSC.connect(addr3).bindAddress(addr4.address, year, { value: fee.mul(year) })).to.not.reverted;
    const get3 = await testSC.getAddress(addr3.address);
    const get4 = await testSC.getAddress(addr4.address);
    expect(get3[0]).eq(addr4.address);
    expect(get4[0]).eq(addr3.address);
    await expect(testSC.connect(addr5).bindAddress(addr6.address, year, { value: fee.mul(year) })).to.not.reverted;
    const get5 = await testSC.getAddress(addr5.address);
    const get6 = await testSC.getAddress(addr6.address);
    expect(get5[0]).eq(addr6.address);
    expect(get6[0]).eq(addr5.address);
    await expect(testSC.connect(addr7).bindAddress(addr8.address, year, { value: fee.mul(year) })).to.not.reverted;
    const get7 = await testSC.getAddress(addr7.address);
    const get8 = await testSC.getAddress(addr8.address);
    expect(get7[0]).eq(addr8.address);
    expect(get8[0]).eq(addr7.address);
  });

  it("fail> bindAddress: Address already bound", async () => {
    const year = BigNumber.from(1);
    await expect(testSC.connect(addr1).bindAddress(addr2.address, year)).to.be.revertedWith("InvalidAddress");
  });

  it("pass> bindAddress More", async () => {
    const year = BigNumber.from(1);
    const fee = await testSC.getFee(addr11.address, year);
    await expect(testSC.connect(addr11).bindAddress(addr12.address, year, { value: fee.mul(year) })).to.not.reverted;
    await expect(testSC.connect(addr13).bindAddress(addr14.address, year, { value: fee.mul(year) })).to.not.reverted;
    await expect(testSC.connect(addr15).bindAddress(addr16.address, year, { value: fee.mul(year) })).to.not.reverted;
  });

  // #################################################
  // renewService
  // #################################################
  it("fail> renewService: Allow 1-10 years", async () => {
    let year = BigNumber.from(0);
    await expect(testSC.connect(addr1).renewService(year)).to.be.revertedWith("InvalidValue");
    year = BigNumber.from(11);
    await expect(testSC.connect(addr1).renewService(year)).to.be.revertedWith("InvalidValue");
  });

  it("fail> renewService: Address not bound", async () => {
    const year = BigNumber.from(1);
    await expect(testSC.connect(addr17).renewService(year)).to.be.revertedWith("InvalidAddress");
    await expect(testSC.connect(addr18).renewService(year)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> renewService: Invalid fee value", async () => {
    const year = BigNumber.from(1);
    const fee = await testSC.fee();
    if(fee != 0){
      await expect(testSC.connect(addr1).renewService(year)).to.be.revertedWith("InvalidValue");
    }
  });

  it("pass> renewService with safe wallet", async () => {
    const year = BigNumber.from(1);
    const fee = await testSC.getFee(addr1.address, year);
    const oldExpire = await testSC.getExpire(addr1.address);
    console.log("oldExpire:", oldExpire);
    await expect(testSC.connect(addr1).renewService(year, { value: fee.mul(year) })).to.not.reverted;
    const newExpire = await testSC.getExpire(addr1.address);
    console.log("newExpire:", newExpire);
    const diff = newExpire.sub(oldExpire);
    const sec = BigNumber.from(31600000).sub(10);
    expect(diff).gt(sec);
  });

  it("pass> renewService with proxy wallet", async () => {
    const year = BigNumber.from(1);
    const fee = await testSC.getFee(addr2.address, year);
    const oldExpire = await testSC.getExpire(addr2.address);
    console.log("oldExpire:", oldExpire);
    await expect(testSC.connect(addr2).renewService(year, { value: fee.mul(year) })).to.not.reverted;
    const newExpire = await testSC.getExpire(addr2.address);
    console.log("newExpire:", newExpire);
    const diff = newExpire.sub(oldExpire);
    const sec = BigNumber.from(31600000).sub(10);
    expect(diff).gt(sec);
  });

  // #################################################
  // changeAddress
  // #################################################

  it("fail> changeAddress: Burn address not allow", async () => {
    console.log("###### START changeAddress TEST ##########");
    await expect(testSC.connect(addr1).changeAddress(zero, addr2.address)).to.be.revertedWith("InvalidAddress");
    await expect(testSC.connect(addr1).changeAddress(addr2.address, zero)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> changeAddress: Not bind wallet itself", async () => {
    await expect(testSC.connect(addr1).changeAddress(addr2.address, addr1.address)).to.be.revertedWith("InvalidAddress");
    await expect(testSC.connect(addr1).changeAddress(addr4.address, addr1.address)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> changeAddress: It's old wallet", async () => {
    await expect(testSC.connect(addr1).changeAddress(addr2.address, addr2.address)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> changeAddress: New address already bound", async () => {
    await expect(testSC.connect(addr1).changeAddress(addr2.address, addr4.address)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> changeAddress: New address already use", async () => {
    await expect(testSC.connect(addr1).changeAddress(addr2.address, addr3.address)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> changeAddress: Invalid address", async () => {
    await expect(testSC.connect(addr1).changeAddress(addr4.address, owner.address)).to.be.revertedWith("InvalidAddress");
    await expect(testSC.connect(addr3).changeAddress(addr2.address, owner.address)).to.be.revertedWith("InvalidAddress");
  });

  it("pass> changeAddress", async () => {
    const oldAddress = await testSC.getAddress(addr1.address);
    console.log("old Address:", oldAddress[0]);
    await expect(testSC.connect(addr1).changeAddress(addr2.address, owner.address)).to.not.reverted;
    const newAddress = await testSC.getAddress(addr1.address);
    console.log("new Address:", newAddress[0]);
    expect(newAddress[0]).equal(owner.address);
    await expect(testSC.connect(addr5).changeAddress(addr6.address, addr9.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeAddress(addr8.address, addr10.address)).to.not.reverted;
    await expect(testSC.connect(addr5).changeAddress(addr9.address, addr6.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeAddress(addr10.address, addr8.address)).to.not.reverted;

    await expect(testSC.connect(addr5).changeAddress(addr6.address, addr9.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeAddress(addr8.address, addr10.address)).to.not.reverted;
    await expect(testSC.connect(addr5).changeAddress(addr9.address, addr6.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeAddress(addr10.address, addr8.address)).to.not.reverted;

    await expect(testSC.connect(addr5).changeAddress(addr6.address, addr9.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeAddress(addr8.address, addr10.address)).to.not.reverted;
    await expect(testSC.connect(addr5).changeAddress(addr9.address, addr6.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeAddress(addr10.address, addr8.address)).to.not.reverted;

    await expect(testSC.connect(addr5).changeAddress(addr6.address, addr9.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeAddress(addr8.address, addr10.address)).to.not.reverted;
    await expect(testSC.connect(addr5).changeAddress(addr9.address, addr6.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeAddress(addr10.address, addr8.address)).to.not.reverted;

    await expect(testSC.connect(addr5).changeAddress(addr6.address, addr9.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeAddress(addr8.address, addr10.address)).to.not.reverted;
    await expect(testSC.connect(addr5).changeAddress(addr9.address, addr6.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeAddress(addr10.address, addr8.address)).to.not.reverted;
  });

  it("fail> changeAddress: Service expired, please renew", async () => {
    const expireTime = await testSC.getExpire(addr1.address);
    const curTime = BigNumber.from(Date.now()).div(1000);
    const diff = expireTime.sub(curTime).add(1).toNumber();
    increaseTime(diff);
    await expect(testSC.connect(addr1).changeAddress(owner.address, addr2.address)).to.be.revertedWith("ServiceExpired");
  });

  it("fail> getAddress: Service expired, please renew", async () => {
    await expect(testSC.getAddress(addr1.address)).to.be.revertedWith("ServiceExpired");
    await expect(testSC.getAddress(owner.address)).to.be.revertedWith("ServiceExpired");
  });

  it("pass> renewService", async () => {
    const year = BigNumber.from(1);
    const fee = await testSC.getFee(addr1.address, year);
    const oldExpire = await testSC.getExpire(addr1.address);
    await expect(testSC.connect(addr1).renewService(year, { value: fee.mul(year) })).to.not.reverted;
    const newExpire = await testSC.getExpire(addr1.address);
    const diff = newExpire.sub(oldExpire);
    const sec = BigNumber.from(31600000).sub(10);
    expect(diff).gt(sec);
  });

  it("pass> changeAddress back", async () => {
    const oldAddress = await testSC.getAddress(addr1.address);
    console.log("old Address:", oldAddress[0]);
    await expect(testSC.connect(addr1).changeAddress(owner.address, addr2.address)).to.not.reverted;
    const newAddress = await testSC.getAddress(addr1.address);
    console.log("new Address:", newAddress[0]);
    expect(newAddress[0]).equal(addr2.address);
  });

  // #################################################
  // External call, isExpired
  // #################################################

  it("pass> getExpire", async () => {
    const blockNum = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNum);
    const curTime = block.timestamp;
    const check1 = await testSC.getExpire(addr1.address);
    console.log(`check1 = ${check1} <= ${curTime}`);
    expect(check1).gt(curTime);
    const check2 = await testSC.getExpire(addr2.address);
    console.log(`check2 = ${check2} <= ${curTime}`);
    expect(check2).gt(curTime);
    const check3 = await testSC.getExpire(addr3.address);
    console.log(`check3 = ${check3} >= ${curTime}`);
    expect(check3).lt(curTime);
    const check4 = await testSC.getExpire(addr4.address);
    console.log(`check4 = ${check4} >= ${curTime}`);
    expect(check4).lt(curTime);

    await expect(testSC.getExpire(owner.address)).revertedWith("InvalidAddress");
    console.log("InvalidAddress");

    const expireTime = await testSC.getExpire(addr1.address);
    const diff = expireTime.sub(curTime).add(1).toNumber();
    increaseTime(diff);

    const check5 = await testSC.getExpire(addr1.address);
    console.log(`check5 = ${check5} >= ${curTime}`);
    expect(expireTime).gt(curTime);
  });

  // #################################################
  // Withdraw Fund
  // #################################################
  it("fail> Release to others wallet", async () => {
    console.log("###### START RELEASE FUND TEST ##########");
    await expect(testSC.connect(addr1).withdraw(addr18.address)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("pass> Release to allow wallet", async () => {
    const fee = await testSC.fee();
    const fundBefore = await addr18.getBalance();
    await testSC.connect(owner).withdraw(addr18.address);
    const fundAfter = await addr18.getBalance();
    console.log("fund before:", BigNumber.from(fundBefore));
    console.log("fund after:", BigNumber.from(fundAfter));
    if(fee != 0){
      expect(fundAfter).gt(fundBefore);
    } else {
      expect(fundAfter).eq(fundBefore);
    }
  });

  // #################################################
  // Promotion check
  // #################################################
  it("pass> Set Promotion", async () => {
    await testNFT1.connect(owner).airdrop([addr1.address], BigNumber.from(5));
    const nft1Balance = await testNFT1.balanceOf(addr1.address);
    console.log("NFT1 Balance: ", nft1Balance);

    const feeBefore = await testSC.getFee(addr1.address, BigNumber.from(1));
    console.log("Fee before: ", feeBefore);

    const fee = await testSC.fee();
    await testSC.connect(owner).setPromotion(testNFT1.address, BigNumber.from(30));
    console.log("Promotion set");

    const discount = await testSC.getPromotion(addr1.address);
    console.log("Discount: ", discount);

    const feeAfter = await testSC.getFee(addr1.address, BigNumber.from(1));
    console.log("Fee after: ", feeAfter);
    
    if(fee != 0){
      expect(feeBefore).gt(feeAfter);
    } else {
      expect(feeBefore).eq(feeAfter);
    }

    let feeDisc = feeAfter.sub(feeAfter.mul(BigNumber.from(500)).div(BigNumber.from(10000)));
    let feeAfter1 = await testSC.getFee(addr1.address, BigNumber.from(3));
    console.log("Fee after 1.1: ", feeAfter1);
    expect(feeAfter1).eq(feeDisc);
    feeAfter1 = await testSC.getFee(addr1.address, BigNumber.from(4));
    console.log("Fee after 1.2: ", feeAfter1);
    if(fee != 0){
      expect(feeAfter1).eq(feeDisc);
    }

    feeDisc = feeAfter.sub(feeAfter.mul(BigNumber.from(1000)).div(BigNumber.from(10000)));
    feeAfter1 = await testSC.getFee(addr1.address, BigNumber.from(5));
    console.log("Fee after 2.1: ", feeAfter1);
    if(fee != 0){
      expect(feeAfter1).eq(feeDisc);
    }
    feeAfter1 = await testSC.getFee(addr1.address, BigNumber.from(7));
    console.log("Fee after 2.2: ", feeAfter1);
    if(fee != 0){
      expect(feeAfter1).eq(feeDisc);
    }
    feeAfter1 = await testSC.getFee(addr1.address, BigNumber.from(9));
    console.log("Fee after 2.3: ", feeAfter1);
    if(fee != 0){
      expect(feeAfter1).eq(feeDisc);
    }

    feeDisc = feeAfter.sub(feeAfter.mul(BigNumber.from(1500)).div(BigNumber.from(10000)));
    feeAfter1 = await testSC.getFee(addr1.address, BigNumber.from(10));
    console.log("Fee after 3: ", feeAfter1);
    if(fee != 0){
      expect(feeAfter1).eq(feeDisc);
    }

    await testSC.connect(owner).removePromotion(testNFT1.address);
    console.log("Promotion remove");

    const feeLast = await testSC.getFee(addr1.address, BigNumber.from(1));
    console.log("Fee last: ", feeLast);
    expect(feeBefore).eq(feeLast);

    feeDisc = feeLast.sub(feeLast.mul(BigNumber.from(500)).div(BigNumber.from(10000)));
    console.log("Fee Disc 1: ", feeDisc);
    let feeLast1 = await testSC.getFee(addr1.address, BigNumber.from(3));
    console.log("Fee last 1.1: ", feeLast1);
    if(fee != 0){
      expect(feeLast1).eq(feeDisc);
    }
    feeLast1 = await testSC.getFee(addr1.address, BigNumber.from(4));
    console.log("Fee last 1.2: ", feeLast1);
    if(fee != 0){
      expect(feeLast1).eq(feeDisc);
    }

    feeDisc = feeLast.sub(feeLast.mul(BigNumber.from(1000)).div(BigNumber.from(10000)));
    console.log("Fee Disc 2: ", feeDisc);
    feeLast1 = await testSC.getFee(addr1.address, BigNumber.from(5));
    console.log("Fee last 2.1: ", feeLast1);
    if(fee != 0){
      expect(feeLast1).eq(feeDisc);
    }
    feeLast1 = await testSC.getFee(addr1.address, BigNumber.from(7));
    console.log("Fee last 2.2: ", feeLast1);
    if(fee != 0){
      expect(feeLast1).eq(feeDisc);
    }
    feeLast1 = await testSC.getFee(addr1.address, BigNumber.from(9));
    console.log("Fee last 2.3: ", feeLast1);
    if(fee != 0){
      expect(feeLast1).eq(feeDisc);
    }

    feeDisc = feeLast.sub(feeLast.mul(BigNumber.from(1500)).div(BigNumber.from(10000)));
    console.log("Fee Disc 3: ", feeDisc);
    feeLast1 = await testSC.getFee(addr1.address, BigNumber.from(10));
    console.log("Fee last 3: ", feeLast1);
    if(fee != 0){
      expect(feeLast1).eq(feeDisc);
    }

    let discBulk = await testSC.discountBulk();
    console.log("Old discountBulk: ", discBulk);
    await testSC.connect(owner).setBulkDiscount(BigNumber.from(201005));
    discBulk = await testSC.discountBulk();
    console.log("New discountBulk: ", discBulk);

    feeDisc = feeLast.sub(feeLast.mul(BigNumber.from(2000)).div(BigNumber.from(10000)));
    console.log("Fee Disc 4: ", feeDisc);
    feeLast1 = await testSC.getFee(addr1.address, BigNumber.from(10));
    console.log("Fee last 4: ", feeLast1);
    if(fee != 0){
      expect(feeLast1).eq(feeDisc);
    }
  });

  // #################################################
  // Check ownership from proxy address
  // #################################################
  it("pass> Check BalanceOf OwnerOf", async () => {
    const year = BigNumber.from(10);
    const fee = await testSC.getFee(addr3.address, year);
    await testSC.connect(addr3).renewService(year, { value: fee.mul(year) });

    const msg = "nFortressLab";
    let sig = await signWallet(addr4, msg);
    const addr3Balance = await testSC.balanceOfERC721(testNFT1.address, msg, sig);
    console.log("addr3 Balance: ", addr3Balance);
    expect(addr3Balance).eq(BigNumber.from(0));

    const addr3Owner = await testSC.ownerOfERC721(testNFT1.address, 1, msg, sig);
    console.log("addr3 Owner Of: ", addr3Owner);
    expect(addr3Owner).eq(false);

    sig = await signWallet(addr2, msg);
    const addr1Balance = await testSC.balanceOfERC721(testNFT1.address, msg, sig);
    console.log("addr1 Balance: ", addr1Balance);
    expect(addr1Balance).eq(BigNumber.from(5));

    const addr1Owner = await testSC.ownerOfERC721(testNFT1.address, 1, msg, sig);
    console.log("addr1 Owner Of: ", addr1Owner);
    expect(addr1Owner).eq(true);

    sig = await signWallet(addr10, msg);
    const addr10Balance = await testSC.balanceOfERC721(testNFT1.address, msg, sig);
    console.log("addr10 Balance: ", addr10Balance);
    expect(addr10Balance).eq(BigNumber.from(0));

    const addr10Owner = await testSC.ownerOfERC721(testNFT1.address, 1, msg, sig);
    console.log("addr10 Owner Of: ", addr10Owner);
    expect(addr10Owner).eq(false);

    sig = await signWallet(addr2, msg);
    await expect(testSC.ownerOfERC721(testNFT1.address, 0, msg, sig)).to.be.reverted;

    const test = await testSC.ownerOfERC721(testNFT1.address, 2, msg, sig);
    console.log("test: ", test);
    expect(test).eq(true);

    await expect(testSC.ownerOfERC721(testNFT1.address, 6, msg, sig)).to.be.reverted;
  });

  // #################################################
  // totalBound
  // #################################################
  it("pass> TotalBound", async () => {
    const total = await testSC.totalBound();
    console.log("Total Bound: ", total);
    expect(total).eq(BigNumber.from(7));
>>>>>>> 5b80d6791d95baa478f51ab21b585fb212a5824d
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
