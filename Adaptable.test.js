const { expect } = require("chai");
const { ethers } = require("hardhat");

const CONTRACT_NAME = process.env.CONTRACT_NAME || "MyContract";
const DEPLOY_ARGS = (() => {
  try { return JSON.parse(process.env.DEPLOY_ARGS || "[]"); }
  catch(e) { return []; }
})();

describe(`${CONTRACT_NAME} — adaptable unit tests`, function () {
  let ContractFactory, contract, owner, addr1, addr2, addrs;

  function hasMethod(c, name){
    return c.interface.fragments.some(f => f.type === 'function' && f.name === name);
  }

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    ContractFactory = await ethers.getContractFactory(CONTRACT_NAME);
    contract = await ContractFactory.deploy(...DEPLOY_ARGS);
    await contract.deployed();
  });

  it("deployed and has an address", async function () {
    expect(contract.address).to.properAddress;
  });

  it("owner should be correct (if owner() exists)", async function () {
    if (!hasMethod(contract, "owner")) this.skip();
    expect(await contract.owner()).to.equal(owner.address);
  });

  it("simple setter/getter flow (setValue/getValue) if present", async function () {
    if (!hasMethod(contract, "setValue") || !hasMethod(contract, "getValue")) this.skip();
    await contract.connect(owner).setValue(123);
    expect(await contract.getValue()).to.equal(123);
  });
});
