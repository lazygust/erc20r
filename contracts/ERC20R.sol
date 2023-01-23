// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20R is Ownable, ERC20 {
    using Address for address;

    error InvalidExecution(uint allowTime);
    error InvalidAddress(string param, address addr);
    event RecoveryWaitTimeUpdateRequest(uint256 allowTime, uint256 value);
    event RecoveryWaitTimeUpdated(uint256 value);

    struct ExecutionData {
        uint256 allowTime;     // address for inheritant of fund, if not set will be project owner
        uint256 value;    // last tansaction timestamp
    }

    mapping(address=>uint256) public modifyTime;
    mapping(address=>address) public inheritAddress;
    mapping(uint=>ExecutionData) public executions;

    address[] public accounts;

    address public defaultAddress = owner();
    uint public constant timeLock = 10; // 604800 7 days lock before change can made
    uint public recoveryWaitTime = 60; // 63200000 2 years of inactive will make fund can recovery

    constructor (string memory name, string memory symbol) ERC20(name, symbol) {
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        if(balanceOf(to) == 0 && to != address(0) && amount > 0) accounts.push(to);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        uint blcokTime = block.timestamp;
        if(from != address(0) && amount > 0) modifyTime[from] = blcokTime;
        if(to != address(0) && amount > 0) modifyTime[to] = blcokTime;
    }

    function recovery(address[] memory users) public {
        uint currentTime = block.timestamp;
        for (uint i = 0; i < users.length; ++i) {
            uint modifyTimeData = modifyTime[users[i]];
            address inheritAddressData = inheritAddress[users[i]];
            if(currentTime < modifyTimeData + recoveryWaitTime){
                address to = inheritAddressData == address(0) ? defaultAddress : inheritAddressData;
                transfer(to, balanceOf(users[i]));
                delete modifyTime[users[i]];
                delete inheritAddress[users[i]];
                address[] memory listUsers = accounts;
                uint256 last = listUsers.length;
                for (uint j = 0; j < last; ++j) {
                    if(listUsers[j] == users[i]){
                        (accounts[j],accounts[last]) = (accounts[last],accounts[j]);
                        accounts.pop();
                        break;
                    }
                }
            }
        }
    }

    function requestChangeRecoveryWaitTime(uint time) external onlyOwner returns (uint) {
        uint id = getId();
        uint allowTime = block.timestamp + timeLock;
        executions[id].value = time;
        executions[id].allowTime = allowTime;
        emit RecoveryWaitTimeUpdateRequest(time, allowTime);
        return id;
    }

    function setRecoveryWaitTime(uint id, uint time) external onlyOwner {
        uint allowTime = executions[id].allowTime;
        if(time < 60) revert InvalidExecution(time); // 31600000, Should not allow inactive time less than 1 year to recovery
        if(id == 0 || allowTime == 0 || allowTime >= block.timestamp) revert InvalidExecution(allowTime);
        recoveryWaitTime = time;
        emit RecoveryWaitTimeUpdated(time);
        delete executions[id];
    }

    function setDefaultAddress(address addr) external onlyOwner {
        if(addr == address(0)) revert InvalidAddress("addr", addr);
        defaultAddress = addr;
    }

    function getInactive() public view returns (address[] memory) {
        uint currentTime = block.timestamp;
        address[] memory listUsers = accounts;
        uint256 last = listUsers.length;
        address[] memory listInactive = new address[](last);
        uint count = 0;
        for (uint i = 0; i < last; ++i) {
            if(currentTime < modifyTime[listUsers[i]] + recoveryWaitTime){
                listInactive[count] = listUsers[i];
                ++count;
            }
        }
        return listInactive;
    }

    function getId() internal view returns (uint) {
        uint blcokNumber = block.number;
        uint id = uint(keccak256(
            abi.encode(
                block.timestamp,
                blcokNumber,
                block.coinbase,
                blockhash(blcokNumber)
            )
        ));
        return id;
    }
}
