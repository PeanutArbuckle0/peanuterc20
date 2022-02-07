const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {

    let NutBux;
    let hardhatToken;
    let founder;
    let addr1;
    let addr2;
    let addrs;
    var assert = require('chai').assert;

    this.beforeEach(async function () {
        NutBux = await ethers.getContractFactory("NutBux");
        [founder, addr1, addr2, ...addrs] = await ethers.getSigners();

        hhNutBux = await NutBux.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right founder", async function () {
            expect(await hhNutBux.founder()).to.equal(founder.address);
        });
        it("Should assign the total supply of tokens to the founder", async function () {
            const founderBalance = await hhNutBux.balanceOf(founder.address);
            expect(await hhNutBux.totalSupply()).to.equal(founderBalance);
        });
    });
    describe("Approval functions", function () {
        it("Should be able to approve a token spend", async function () {
            await hhNutBux.approve(addr1.address, 5000);
            const allowance = await hhNutBux.allowance(founder.address, addr1.address);
            expect(allowance).to.equal(5000);
        });
        it("Should revert if allowance is lower than attempted spend", async function() {
            await hhNutBux.approve(addr1.address, 4999);
            await expect(hhNutBux.transferFrom(founder.address, addr1.address, 5000)).to.be.reverted;
        });
    });
    describe("Transfer functions", function () {
        it("Should be able to send tokens to another wallet", async function () {
            await hhNutBux.transfer(addr1.address, 999);
            expect(await hhNutBux.balanceOf(addr1.address)).to.equal(999);
        });
        it("Should be able to transfer approved spend", async function () {
            await hhNutBux.approve(addr1.address, 5000)
            await hhNutBux.transferFrom(founder.address, addr1.address, 5000);
            expect(await hhNutBux.balanceOf(addr1.address)).to.equal(5000);
        });
    });
});