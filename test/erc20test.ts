import { ethers } from "hardhat";
import { ContractFactory, Signer } from "ethers";
import { expect } from "chai";
import { Address } from "cluster";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Token", function () {
  before(async function() {
   
  })
  beforeEach(async function () {
    let NutBuxFactory: ContractFactory = await ethers.getContractFactory("NutBux");
    let [founder, addr1, addr2, ...addrs] = await ethers.getSigners();
    let NutBux = await NutBuxFactory.deploy();
    console.log("sneed");
  });
  it("should set the correct owner", async function () {
    let NutBuxFactory: ContractFactory = await ethers.getContractFactory("NutBux");
    let [founder, addr1, addr2, ...addrs] = await ethers.getSigners();
    let NutBux = await NutBuxFactory.deploy();
    expect(await NutBux.founder()).to.equal(founder.address);
  });
  it("Should assign the total supply of tokens to the founder", async function () {
    let NutBuxFactory: ContractFactory = await ethers.getContractFactory("NutBux");
    let [founder, addr1, addr2, ...addrs] = await ethers.getSigners();
    let NutBux = await NutBuxFactory.deploy();
    const founderBalance = await NutBux.balanceOf(founder.address);
    expect(await NutBux.totalSupply()).to.equal(founderBalance);
  });
describe("Approval functions", function () {
    it("Should be able to approve a token spend", async function () {
      let NutBuxFactory: ContractFactory = await ethers.getContractFactory("NutBux");
      let [founder, addr1, addr2, ...addrs] = await ethers.getSigners();
      let NutBux = await NutBuxFactory.deploy();
        await NutBux.approve(addr1.address, 5000);
        const allowance = await NutBux.allowance(founder.address, addr1.address);
        expect(allowance).to.equal(5000);
    });
    it("Should revert if allowance is lower than attempted spend", async function() {
      let NutBuxFactory: ContractFactory = await ethers.getContractFactory("NutBux");
      let [founder, addr1, addr2, ...addrs] = await ethers.getSigners();
      let NutBux = await NutBuxFactory.deploy();
        await NutBux.approve(addr1.address, 4999);
        await expect(NutBux.transferFrom(founder.address, addr1.address, 5000)).to.be.reverted;
    });
});
describe("Transfer functions", function () {
    it("Should be able to send tokens to another wallet", async function () {
      let NutBuxFactory: ContractFactory = await ethers.getContractFactory("NutBux");
      let [founder, addr1, addr2, ...addrs] = await ethers.getSigners();
      let NutBux = await NutBuxFactory.deploy();
        await NutBux.transfer(addr1.address, 999);
        expect(await NutBux.balanceOf(addr1.address)).to.equal(999);
    });
    it("Should be able to transfer approved spend", async function () {
      let NutBuxFactory: ContractFactory = await ethers.getContractFactory("NutBux");
      let [founder, addr1, addr2, ...addrs] = await ethers.getSigners();
      let NutBux = await NutBuxFactory.deploy();
        await NutBux.approve(addr1.address, 5000)
        await NutBux.transferFrom(founder.address, addr1.address, 5000);
        expect(await NutBux.balanceOf(addr1.address)).to.equal(5000);
    });
});
});