// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFortress_v1 is OwnableUpgradeable {
    using AddressUpgradeable for address;

    error InvalidAddress(string variable, address addr);

    mapping(address=>address) private safeAddr;    // proxyAddress to safeAddress
    mapping(address=>address) private proxyAddr;    // safeAddress to proxyAddress
    uint256 public totalLinked;

    function initialize() public initializer {
        __Ownable_init();
    }

    function linkWallet(address proxy) external {
        unchecked {
            if(proxy == address(0) || proxy == msg.sender) revert InvalidAddress("proxy", proxy);
            if(proxyAddr[msg.sender] != address(0)) revert InvalidAddress("msg.sender", msg.sender);
            safeAddr[proxy] = msg.sender;
            proxyAddr[msg.sender] = proxy;
            ++totalLinked;
        }
    }

    function changeWallet(address newProxy) external {
        if(newProxy == address(0) || newProxy == msg.sender || safeAddr[newProxy] != address(0) ||
        proxyAddr[newProxy] != address(0)) revert InvalidAddress("newProxy", newProxy);

        address oldProxy = proxyAddr[msg.sender];
        if(oldProxy == address(0)) revert InvalidAddress("proxy not found for", msg.sender);
        proxyAddr[msg.sender] = newProxy;
        safeAddr[newProxy] = msg.sender;
        delete safeAddr[oldProxy];
    }

    function unlinkWallet() external {
        unchecked {
            address proxy = proxyAddr[msg.sender];
            if(proxy == address(0)) revert InvalidAddress("proxy not found for", msg.sender);
            delete safeAddr[proxy];
            delete proxyAddr[msg.sender];
            --totalLinked;
        }
    }

    function getAddress(address addr) external view returns (address, uint256) {
        address returnAddr;
        uint256 conType; // 0 mean addr is safe, 1 mean addr is proxy
        address safe = safeAddr[addr];
        address proxy = proxyAddr[addr];
        if(safe != address(0)) {
            returnAddr = safe;
            conType = 1;
        } else {
            if(proxy != address(0)) {
                returnAddr = proxy;
            }
        }
        if(returnAddr == address(0)) revert InvalidAddress("addr", addr);
        return (returnAddr, conType);
    }

    // Allow only proxy or non-linked address to get balanceOf ERC721 or got 0
    function balanceOfERC721(address nftAddr, address wallet) external view returns (uint256) {
        if(nftAddr == address(0)) revert InvalidAddress("nftAddr", address(0));
        uint256 balance = IERC721(nftAddr).balanceOf(wallet);
        if(proxyAddr[wallet] != address(0)) balance = 0; // when connect with safe wallet set balance to 0;
        address safe = safeAddr[wallet];
        if(safe != address(0)){
            balance += IERC721(nftAddr).balanceOf(safe);
        }
        return balance;
    }

    // Allow only proxy or non-linked address to get ownerOf ERC721 or got false
    function ownerOfERC721(address nftAddr, uint256 tokenId, address wallet) external view returns (bool) {
        if(nftAddr == address(0)) revert InvalidAddress("nftAddr", address(0));
        address owner = IERC721(nftAddr).ownerOf(tokenId);
        bool ownerOf =  owner == wallet;
        if(proxyAddr[wallet] != address(0)) ownerOf = false; // when connect with safe wallet set ownerOf to false;
        address safe = safeAddr[wallet];
        if(safe != address(0)){
            ownerOf = ownerOf || owner == safe;
        }
        return ownerOf;
    }

     // Allow only proxy or non-linked address to get balanceOf ERC1155 or got 0
    function balanceOfERC1155(address nftAddr, uint256 tokenId, address wallet) external view returns (uint256) {
        if(nftAddr == address(0)) revert InvalidAddress("nftAddr", address(0));
        uint256 balance = IERC1155(nftAddr).balanceOf(wallet, tokenId);
        if(proxyAddr[wallet] != address(0)) balance = 0; // when connect with safe wallet set balance to 0;
        address safe = safeAddr[wallet];
        if(safe != address(0)){
            balance += IERC1155(nftAddr).balanceOf(safe, tokenId);
        }
        return balance;
    }
}
