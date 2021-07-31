"use strict";
const { run, ethers } = require("hardhat");

async function main() {
  await run("compile");

  const [Greeter, Multicall] = await Promise.all([
    ethers.getContractFactory("Greeter"),
    ethers.getContractFactory("Multicall"),
  ]);

  console.log("Deploying ...");

  const greeter = await Greeter.deploy("Hello, Peter!");
  const multicall = await Multicall.deploy();

  await Promise.all([greeter.deployed(), multicall.deployed()]);

  console.log("Greeter deployed to:", greeter.address);
  console.log("Multicall deployed to:", multicall.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
