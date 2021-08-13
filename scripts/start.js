"use strict";
const { ethers, web3 } = require("hardhat");

const GreeterArtifact = require("../artifacts/contracts/Greeter.sol/Greeter.json");
const MulticallArtifact = require("../artifacts/contracts/Multicall.sol/Multicall.json");

const { greeterAddress, multicallAddress } = require("../config.json").address.rinkeby;

async function mainWeb3() {
  const [account] = await web3.eth.getAccounts();

  const greeter = new web3.eth.Contract(GreeterArtifact.abi, greeterAddress);
  const multicall = new web3.eth.Contract(MulticallArtifact.abi, multicallAddress);

  const data = greeter.methods.setGreeting("Peter test multicall").encodeABI();

  const result = await multicall.methods
    .tryAggregate(false, [{ target: greeterAddress, callData: data }])
    .send({ from: account });

  // const result = await multicall.methods
  //   .aggregate([{ target: greeterAddress, callData: data }])
  //   .send({ from: account });

  console.log("result:", result);

  console.log("greet:", await greeter.methods.greet().call());
}

mainWeb3()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
