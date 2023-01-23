import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { BigNumber, Contract } from "ethers";
import * as dotenv from "dotenv";
// eslint-disable-next-line node/no-missing-import
// import { MockNFT } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
dotenv.config();

describe("NFortress_v1", () => {
  const netId = 31337;
  let testSC: Contract;
  let testNFT1: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;
  let addr4: SignerWithAddress;
  let addr5: SignerWithAddress;
  let addr6: SignerWithAddress;
  let addr7: SignerWithAddress;
  let addr8: SignerWithAddress;
  let addr9: SignerWithAddress;
  let addr10: SignerWithAddress;
  let addr11: SignerWithAddress;
  let addr12: SignerWithAddress;
  let addr13: SignerWithAddress;
  let addr14: SignerWithAddress;
  let addr15: SignerWithAddress;
  let addr16: SignerWithAddress;
  let addr17: SignerWithAddress;
  let addr18: SignerWithAddress;
  const zero = "0x0000000000000000000000000000000000000000";

  // Configure
  before(async () => {
    console.log("Start Test script");
    [owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10, addr11, addr12, addr13, addr14, addr15, addr16, addr17, addr18] =
      await ethers.getSigners();
    console.log("owner: ", owner.address);

    const TestSC = await ethers.getContractFactory("NFortress_v1");

    // testSC = await TestSC.connect(owner).deploy();
    testSC = await upgrades.deployProxy(TestSC, []);
    await testSC.deployed();
    console.log("contract address:", testSC.address);
    console.log("deployer address:", testSC.deployTransaction.from);

    const TestNFT = await ethers.getContractFactory("MockNFT");
    testNFT1 = await TestNFT.connect(owner).deploy("BAYC", "BAYC", "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/", "");
    await testNFT1.deployed();
    console.log("nft1 address:", testNFT1.address);

    console.log("chain ID:", netId);
  });

  // #################################################
  // linkWallet
  // #################################################

  it("fail> getAddress: Address not bound", async () => {
    console.log("###### START linkWallet TEST ##########");
    await expect(testSC.getAddress(addr1.address)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> linkWallet: Burn address not allow", async () => {
    await expect(testSC.connect(addr1).linkWallet(zero)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> linkWallet: Not bind wallet itself", async () => {
    await expect(testSC.connect(addr1).linkWallet(addr1.address)).to.be.revertedWith("InvalidAddress");
  });

  it("pass> linkWallet", async () => {
    await expect(testSC.connect(addr1).linkWallet(addr2.address)).to.not.reverted;
    const get1 = await testSC.getAddress(addr1.address);
    const get2 = await testSC.getAddress(addr2.address);
    expect(get1[0]).eq(addr2.address);
    expect(get2[0]).eq(addr1.address);
    await expect(testSC.connect(addr3).linkWallet(addr4.address)).to.not.reverted;
    const get3 = await testSC.getAddress(addr3.address);
    const get4 = await testSC.getAddress(addr4.address);
    expect(get3[0]).eq(addr4.address);
    expect(get4[0]).eq(addr3.address);
    await expect(testSC.connect(addr5).linkWallet(addr6.address)).to.not.reverted;
    const get5 = await testSC.getAddress(addr5.address);
    const get6 = await testSC.getAddress(addr6.address);
    expect(get5[0]).eq(addr6.address);
    expect(get6[0]).eq(addr5.address);
    await expect(testSC.connect(addr7).linkWallet(addr8.address)).to.not.reverted;
    const get7 = await testSC.getAddress(addr7.address);
    const get8 = await testSC.getAddress(addr8.address);
    expect(get7[0]).eq(addr8.address);
    expect(get8[0]).eq(addr7.address);
  });

  it("fail> linkWallet: Address already bound", async () => {
    await expect(testSC.connect(addr1).linkWallet(addr2.address)).to.be.revertedWith("InvalidAddress");
  });

  it("pass> linkWallet More", async () => {
    await expect(testSC.connect(addr11).linkWallet(addr12.address)).to.not.reverted;
    await expect(testSC.connect(addr13).linkWallet(addr14.address)).to.not.reverted;
    await expect(testSC.connect(addr15).linkWallet(addr16.address)).to.not.reverted;
  });

  // #################################################
  // changeWallet
  // #################################################

  it("fail> changeWallet: Burn address not allow", async () => {
    console.log("###### START changeWallet TEST ##########");
    await expect(testSC.connect(addr1).changeWallet(zero)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> changeWallet: Not bind wallet itself", async () => {
    await expect(testSC.connect(addr1).changeWallet(addr1.address)).to.be.revertedWith("InvalidAddress");
    await expect(testSC.connect(addr1).changeWallet(addr1.address)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> changeWallet: It's old wallet", async () => {
    await expect(testSC.connect(addr1).changeWallet(addr2.address)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> changeWallet: New address already bound", async () => {
    await expect(testSC.connect(addr1).changeWallet(addr4.address)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> changeWallet: New address already use", async () => {
    await expect(testSC.connect(addr1).changeWallet(addr3.address)).to.be.revertedWith("InvalidAddress");
  });

  it("fail> changeWallet: Invalid address", async () => {
    await expect(testSC.connect(addr1).changeWallet(addr1.address)).to.be.revertedWith("InvalidAddress");
    await expect(testSC.connect(addr3).changeWallet(addr3.address)).to.be.revertedWith("InvalidAddress");
  });

  it("pass> changeWallet", async () => {
    const oldAddress = await testSC.getAddress(addr1.address);
    console.log("old Address:", oldAddress[0]);
    await expect(testSC.connect(addr1).changeWallet(owner.address)).to.not.reverted;
    const newAddress = await testSC.getAddress(addr1.address);
    console.log("new Address:", newAddress[0]);
    expect(newAddress[0]).equal(owner.address);
    await expect(testSC.connect(addr5).changeWallet(addr9.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeWallet(addr10.address)).to.not.reverted;
    await expect(testSC.connect(addr5).changeWallet(addr6.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeWallet(addr8.address)).to.not.reverted;

    await expect(testSC.connect(addr5).changeWallet(addr9.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeWallet(addr10.address)).to.not.reverted;
    await expect(testSC.connect(addr5).changeWallet(addr6.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeWallet(addr8.address)).to.not.reverted;

    await expect(testSC.connect(addr5).changeWallet(addr9.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeWallet(addr10.address)).to.not.reverted;
    await expect(testSC.connect(addr5).changeWallet(addr6.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeWallet(addr8.address)).to.not.reverted;

    await expect(testSC.connect(addr5).changeWallet(addr9.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeWallet(addr10.address)).to.not.reverted;
    await expect(testSC.connect(addr5).changeWallet(addr6.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeWallet(addr8.address)).to.not.reverted;

    await expect(testSC.connect(addr5).changeWallet(addr9.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeWallet(addr10.address)).to.not.reverted;
    await expect(testSC.connect(addr5).changeWallet(addr6.address)).to.not.reverted;
    await expect(testSC.connect(addr7).changeWallet(addr8.address)).to.not.reverted;
  });

  it("pass> changeWallet back", async () => {
    const oldAddress = await testSC.getAddress(addr1.address);
    console.log("old Address:", oldAddress[0]);
    await expect(testSC.connect(addr1).changeWallet(addr2.address)).to.not.reverted;
    const newAddress = await testSC.getAddress(addr1.address);
    console.log("new Address:", newAddress[0]);
    expect(newAddress[0]).equal(addr2.address);
  });

  // #################################################
  // Check ownership from proxy address
  // #################################################
  it("pass> Check BalanceOf OwnerOf", async () => {
    await testNFT1.connect(owner).airdrop([addr1.address], BigNumber.from(5));
    const addr3Balance = await testSC.balanceOfERC721(testNFT1.address, addr4.address);
    console.log("addr3 Balance: ", addr3Balance);
    expect(addr3Balance).eq(BigNumber.from(0));

    const addr3Owner = await testSC.ownerOfERC721(testNFT1.address, 1, addr4.address);
    console.log("addr3 Owner Of: ", addr3Owner);
    expect(addr3Owner).eq(false);

    const addr1Balance = await testSC.balanceOfERC721(testNFT1.address, addr2.address);
    console.log("addr1 Balance: ", addr1Balance);
    expect(addr1Balance).eq(BigNumber.from(5));
    const addr1Balance2 = await testSC.balanceOfERC721(testNFT1.address, addr1.address);
    console.log("addr1 Balance2: ", addr1Balance2);
    expect(addr1Balance2).eq(BigNumber.from(0));

    const addr1Owner = await testSC.ownerOfERC721(testNFT1.address, 1, addr2.address);
    console.log("addr1 Owner Of: ", addr1Owner);
    expect(addr1Owner).eq(true);
    const addr1Owner2 = await testSC.ownerOfERC721(testNFT1.address, 1, addr1.address);
    console.log("addr1 Owner Of2: ", addr1Owner2);
    expect(addr1Owner2).eq(false);

    const addr10Balance = await testSC.balanceOfERC721(testNFT1.address, addr10.address);
    console.log("addr10 Balance: ", addr10Balance);
    expect(addr10Balance).eq(BigNumber.from(0));

    const addr10Owner = await testSC.ownerOfERC721(testNFT1.address, 1, addr10.address);
    console.log("addr10 Owner Of: ", addr10Owner);
    expect(addr10Owner).eq(false);

    const test = await testSC.ownerOfERC721(testNFT1.address, 2, addr2.address);
    console.log("test: ", test);
    expect(test).eq(true);

    await expect(testSC.ownerOfERC721(testNFT1.address, 6, addr2.address)).to.be.reverted;
  });

  // #################################################
  // totalLinked
  // #################################################
  it("pass> totalLinked", async () => {
    const total = await testSC.totalLinked();
    console.log("Total Linked: ", total);
    expect(total).eq(BigNumber.from(7));
  });

  it("fail> unlinkWallet from proxy", async () => {
    const total1 = await testSC.totalLinked();
    console.log("Total Linked 1: ", total1);
    await expect(testSC.connect(addr2).unlinkWallet()).to.be.reverted;
    const total2 = await testSC.totalLinked();
    console.log("Total Linked 2: ", total2);
    expect(total1).eq(total2);
  });

  it("pass> unlinkWallet", async () => {
    const total1 = await testSC.totalLinked();
    console.log("Total Linked 1: ", total1);
    await testSC.connect(addr1).unlinkWallet();
    const total2 = await testSC.totalLinked();
    console.log("Total Linked 2: ", total2);
    expect(total1).gt(total2);

    const addr1Balance = await testSC.balanceOfERC721(testNFT1.address, addr1.address);
    console.log("addr1 Balance: ", addr1Balance);
    expect(addr1Balance).eq(BigNumber.from(5));
    const addr1Balance2 = await testSC.balanceOfERC721(testNFT1.address, addr2.address);
    console.log("addr1 Balance2: ", addr1Balance2);
    expect(addr1Balance2).eq(BigNumber.from(0));

    const addr1Owner = await testSC.ownerOfERC721(testNFT1.address, 1, addr1.address);
    console.log("addr1 Owner Of: ", addr1Owner);
    expect(addr1Owner).eq(true);
    const addr1Owner2 = await testSC.ownerOfERC721(testNFT1.address, 1, addr2.address);
    console.log("addr1 Owner Of2: ", addr1Owner2);
    expect(addr1Owner2).eq(false);

    await testSC.connect(addr3).unlinkWallet();
    console.log("3");
    await testSC.connect(addr5).unlinkWallet();
    console.log("5");
    await testSC.connect(addr7).unlinkWallet();
    console.log("7");
    await testSC.connect(addr11).unlinkWallet();
    console.log("11");
    await testSC.connect(addr13).unlinkWallet();
    console.log("13");
    await testSC.connect(addr15).unlinkWallet();
    console.log("15");

  });
});
