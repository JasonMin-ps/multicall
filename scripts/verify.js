"use strict";
const { run } = require("hardhat");

const { greeterAddress, multicallAddress } = require("../config.json").address.mumbai;

async function main() {
  // verify greeter
  const verifyGreeter = run("verify:verify", {
    address: greeterAddress,
    constructorArguments: ["Hello, Peter!"],
  });

  // verify multicall
  const verifyMulticall = run("verify:verify", {
    address: multicallAddress,
    constructorArguments: [],
  });

  await Promise.all([verifyGreeter, verifyMulticall]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
