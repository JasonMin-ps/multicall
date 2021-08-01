"use strict";
const { ethers, web3 } = require("hardhat");

const GreeterArtifact = require("../artifacts/contracts/interfaces/IGreeter.sol/IGreeter.json");
const MulticallArtifact = require("../artifacts/contracts/interfaces/IMulticall.sol/IMulticall.json");

const { greeterAddress, multicallAddress } = require("../config.json").address.arbitrumTestnet;

async function mainEthers() {
  const [greeter, multicall] = await Promise.all([
    ethers.getContractAt("Greeter", greeterAddress),
    ethers.getContractAt("Multicall", multicallAddress),
  ]);

  const { data } = await greeter.populateTransaction.setGreeting("test multicall");

  const result = await multicall.tryBlockAndAggregate(true, [{ target: greeterAddress, callData: data }]);

  console.log("result:", result);

  console.log("greet:", await greeter.greet());
}

async function mainWeb3() {
  const [account] = await web3.eth.getAccounts();

  const greeter = new web3.eth.Contract(GreeterArtifact.abi, greeterAddress);
  const multicall = new web3.eth.Contract(MulticallArtifact.abi, multicallAddress);

  const data = greeter.methods.setGreeting("Peter test multicall").encodeABI();

  const result = await multicall.methods
    .tryBlockAndAggregate(true, [{ target: greeterAddress, callData: data }])
    .send({ from: account });

  console.log("result:", result);

  console.log("greet:", await greeter.methods.greet().call());
}

mainWeb3()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
