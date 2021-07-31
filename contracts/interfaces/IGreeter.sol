//SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

interface IGreeter {
    event GreetingChanged(string _greeting);

    function greet() external returns (string memory _greeting);

    function setGreeting(string memory _greeting) external;
}
