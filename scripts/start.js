"use strict";
const { ethers, web3 } = require("hardhat");

const GreeterArtifact = require("../artifacts/contracts/Greeter.sol/Greeter.json");
const MulticallArtifact = require("../artifacts/contracts/Multicall.sol/Multicall.json");

// rinkeby, mumbai
const greeterAddress = "0x503d195187F5c756fabAcA0b32AC4201d9B93a42";
const multicallAddress = "0xB1c6c7689fAc4b64081E4BB617F9C372C9994cF9";

async function mainEthers() {
  const [Greeter, Multicall] = await Promise.all([
    ethers.getContractFactory("Greeter"),
    ethers.getContractFactory("Multicall"),
  ]);

  const [greeter, multicall] = await Promise.all([Greeter.attach(greeterAddress), Multicall.attach(multicallAddress)]);

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
