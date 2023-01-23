// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./ERC20R.sol";

contract ETHr is ERC20R {
    using Address for address;

    constructor (string memory name, string memory symbol) ERC20R(name, symbol) {}

    function deposit() public payable {
        _mint(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }

}
