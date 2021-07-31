"use strict";
const { run } = require("hardhat");

// rinkeby, mumbai
const greeterAddress = "0x503d195187F5c756fabAcA0b32AC4201d9B93a42";
const multicallAddress = "0xB1c6c7689fAc4b64081E4BB617F9C372C9994cF9";

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
