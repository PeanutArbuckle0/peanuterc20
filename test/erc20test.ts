import { ethers } from "hardhat";
import { ContractFactory, Signer } from "ethers";
import { expect } from "chai";
import { Address } from "cluster";

describe("Token", function () {
    let founder: Address;
  beforeEach(async function () {
    let NutBuxFactory: ContractFactory = await ethers.getContractFactory("NutBux");
    let [founder, addr1, addr2, ...addrs] = await ethers.getSigners();
    let NutBux = await NutBuxFactory.deploy();
  });

  it("should set the correct owner", async function () {
    expect(await NutBux.founder()).to.equal(founder.address);
  });
  it("Should assign the total supply of tokens to the founder", async function () {
    const founderBalance = await NutBux.balanceOf(founder.address);
    expect(await NutBux.totalSupply()).to.equal(founderBalance);
  });
});