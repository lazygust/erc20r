// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract NFortress is OwnableUpgradeable {
    using ECDSA for bytes32;
    using AddressUpgradeable for address;

    error InvalidAddress(string variable, address addr);
    error InvalidValue(string variable, uint256 value);
    error ServiceExpired(uint256 value);

    struct UserData {
        address safeAddr;
        uint256 endTime;
    }
    struct DiscountData {
        address nftAddress;     // NFT contract address to promotion
        uint256 feeDiscount;    // percentage*100 to reduce fee
    }

    mapping(address=>UserData) private userData;    // proxyAddress to UserData
    mapping(address=>address) private proxyAddr;    // safeAddress to proxyAddress

    DiscountData[] public discountData;
    uint256 public discountBulk;
    uint256 public totalBound;
    uint256 public fee;
    uint256 private constant yearSecs = 31600000;

    function initialize() public initializer {
        __Ownable_init();
        fee = 0; // 0.039 ETH * 10**18
        discountBulk = 151005; // 10y%*10000 + 5y%*100 + 3y%
    }

    function bindAddress(address proxy, uint256 year) external payable {
        unchecked {
            if(proxy == address(0) || proxy == msg.sender) revert InvalidAddress("proxy", proxy);
            if(year < 1 || year > 10) revert InvalidValue("year", year);
            if(proxyAddr[msg.sender] != address(0)) revert InvalidAddress("msg.sender", msg.sender);
            if(msg.value < getFee(msg.sender,year)*year) revert InvalidValue("msg.value", msg.value);
            userData[proxy] = UserData(msg.sender, block.timestamp + (year*yearSecs));
            proxyAddr[msg.sender] = proxy;
            ++totalBound;
        }
    }

    function renewService(uint256 year) external payable {
        unchecked {
            if(year < 1 || year > 10) revert InvalidValue("year", year);
            address proxy = proxyAddr[msg.sender];
            UserData memory data = userData[msg.sender];
            address addr = msg.sender;
            if(data.safeAddr == address(0) && proxy != address(0)){
                data = userData[proxy];
                addr = proxy;
            }
            if(data.safeAddr == address(0)) revert InvalidAddress("msg.sender", msg.sender);
            if(msg.value < getFee(msg.sender,year)*year) revert InvalidValue("msg.value", msg.value);
            
            uint256 curTime = block.timestamp;
            uint256 endTime = data.endTime;
            uint256 newTime;
            if (endTime > curTime){
                newTime = endTime + (year*yearSecs);
            } else {
                newTime = curTime + (year*yearSecs);
            }
            userData[addr].endTime = newTime;
        }
    }

    function changeAddress(address oldProxy, address newProxy) external {
        if(
            oldProxy == address(0) ||
            proxyAddr[msg.sender] != oldProxy
        ) revert InvalidAddress("oldProxy", oldProxy);
        if(
            newProxy == address(0) ||
            newProxy == msg.sender ||
            newProxy == oldProxy ||
            userData[newProxy].safeAddr != address(0) ||
            proxyAddr[newProxy] != address(0)
        ) revert InvalidAddress("newProxy", newProxy);

        UserData memory oldData = userData[oldProxy];
        if(oldData.endTime < block.timestamp) revert ServiceExpired(oldData.endTime);

        userData[newProxy] = UserData(msg.sender, oldData.endTime);
        proxyAddr[msg.sender] = newProxy;
        delete userData[oldProxy];
    }

    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function setPromotion(address _nftAddress, uint256 _feeDiscount) external onlyOwner {
        discountData.push(DiscountData(_nftAddress, _feeDiscount)); // percentage*100 to reduce fee
    }

    // format 10y%*10000 + 5y%*100 + 3y%
    function setBulkDiscount(uint256 _discont) external onlyOwner {
        discountBulk = _discont;
    }

    function removePromotion(address _nftAddress) external onlyOwner {
        DiscountData[] memory data = discountData;
        uint256 last = data.length - 1;
        for (uint256 i = 0; i <= last; ++i) {
            if(data[i].nftAddress == _nftAddress){
                (discountData[i],discountData[last]) = (data[last],data[i]);
                discountData.pop();
                break;
            }
        }
    }

    function withdraw(address addr) external onlyOwner {
        payable(addr).transfer(address(this).balance);
    }

    function getAddress(address addr) external view returns (address, uint256) {
        address returnAddr;
        uint256 conType;
        UserData memory data = userData[addr];
        address proxy = proxyAddr[addr];
        if(data.safeAddr != address(0)) {
            returnAddr = data.safeAddr;
            conType = 1;
        } else {
            if(proxy != address(0)) {
                data = userData[proxy];
                returnAddr = proxy;
            }
        }
        if(returnAddr == address(0)) revert InvalidAddress("addr", addr);
        if(data.endTime < block.timestamp) revert ServiceExpired(data.endTime);
        return (returnAddr, conType);
    }

    function getExpire(address addr) external view returns (uint256) {
        UserData memory data = userData[addr];
        address proxy = proxyAddr[addr];
        if(data.safeAddr == address(0) && proxy != address(0)) data = userData[proxy];
        if(data.safeAddr == address(0)) revert InvalidAddress("addr", addr);
        return data.endTime;
    }

    function getPromotion(address addr) public view returns (uint256) {
        uint256 discountFee;
        DiscountData[] memory data = discountData;
        for (uint256 i = 0; i < data.length; ++i) {
            uint256 nftHold = IERC721(data[i].nftAddress).balanceOf(addr);
            if(nftHold > 0 && data[i].feeDiscount > discountFee){
                discountFee = data[i].feeDiscount;
            }
        }
        return discountFee; // percentage*100 to reduce fee
    }

    function getFee(address addr, uint256 year) public view returns (uint256) {
        uint256 _fee = fee;
        uint256 discb = discountBulk;
        uint256 discount = getPromotion(addr);
        if(year > 2 && year < 5 ) _fee -= (_fee * (discb % 100)) / 100;
        if(year > 4 && year < 10) _fee -= (_fee * ((discb / 100) % 100)) / 100;
        if(year > 9) _fee -= (_fee * (discb / 10000)) / 100;
        return _fee - (_fee * discount) / 100;
    }

    function balanceOfERC721(address nftAddr, string calldata message, bytes calldata signature) external view returns (uint256) {
        if(nftAddr == address(0)) revert InvalidAddress("nftAddr", nftAddr);
        bytes memory hashMsg = bytes(message);
        address wallet = verifyMsg(hashMsg, signature);
        uint256 balance = IERC721(nftAddr).balanceOf(wallet);
        address proxy = proxyAddr[wallet];
        address safeAddr = userData[wallet].safeAddr;
        if(proxy != address(0)){
            balance += IERC721(nftAddr).balanceOf(proxy);
        }
        if(safeAddr != address(0)){
            balance += IERC721(nftAddr).balanceOf(safeAddr);
        }
        return balance;
    }

    function ownerOfERC721(address nftAddr, uint256 tokenId, string calldata message, bytes calldata signature) external view returns (bool) {
        if(nftAddr == address(0)) revert InvalidAddress("nftAddr", nftAddr);
        bytes memory hashMsg = bytes(message);
        address wallet = verifyMsg(hashMsg, signature);
        address owner = IERC721(nftAddr).ownerOf(tokenId);
        bool ownerOf =  owner == wallet;
        address proxy = proxyAddr[wallet];
        address safeAddr = userData[wallet].safeAddr;
        if(proxy != address(0)){
            ownerOf = ownerOf || owner == proxy;
        }
        if(safeAddr != address(0)){
            ownerOf = ownerOf || owner == safeAddr;
        }
        return ownerOf;
    }

    function balanceOfERC1155(address nftAddr, uint256 tokenId, string calldata message, bytes calldata signature) external view returns (uint256) {
        if(nftAddr == address(0)) revert InvalidAddress("nftAddr", nftAddr);
        bytes memory hashMsg = bytes(message);
        address wallet = verifyMsg(hashMsg, signature);
        uint256 balance = IERC1155(nftAddr).balanceOf(wallet, tokenId);
        address proxy = proxyAddr[wallet];
        address safeAddr = userData[wallet].safeAddr;
        if(proxy != address(0)){
            balance += IERC1155(nftAddr).balanceOf(proxy, tokenId);
        }
        if(safeAddr != address(0)){
            balance += IERC1155(nftAddr).balanceOf(safeAddr, tokenId);
        }
        return balance;
    }

    // function verifyMsg(bytes calldata signature)
    function verifyMsg(bytes memory message, bytes calldata signature)
        internal
        pure
        returns (address)
    {   
        bytes32 hash = ECDSA.toEthSignedMessageHash(message);
        return ECDSA.recover(hash, signature);
    }
}
