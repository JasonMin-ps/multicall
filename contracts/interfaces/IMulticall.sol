//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

interface IMulticall {
    struct Call {
        address target;
        bytes callData;
    }

    struct Result {
        bool success;
        bytes returnData;
    }

    function aggregate(Call[] memory calls)
        external
        returns (uint256 blockNumber, bytes[] memory returnData);

    function blockAndAggregate(Call[] memory calls)
        external
        returns (
            uint256 blockNumber,
            bytes32 blockHash,
            Result[] memory returnData
        );

    function getBlockHash(uint256 blockNumber)
        external
        returns (bytes32 blockHash);

    function getBlockNumber() external returns (uint256 blockNumber);

    function getCurrentBlockCoinbase() external returns (address coinbase);

    function getCurrentBlockDifficulty() external returns (uint256 difficulty);

    function getCurrentBlockGasLimit() external returns (uint256 gaslimit);

    function getCurrentBlockTimestamp() external returns (uint256 timestamp);

    function getEthBalance(address addr) external returns (uint256 balance);

    function getLastBlockHash() external returns (bytes32 blockHash);

    function tryAggregate(bool requireSuccess, Call[] memory calls)
        external
        returns (Result[] memory returnData);

    function tryBlockAndAggregate(bool requireSuccess, Call[] memory calls)
        external
        returns (
            uint256 blockNumber,
            bytes32 blockHash,
            Result[] memory returnData
        );
}
