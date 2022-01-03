// SPDX-License-Identifier: MIT
/*
   DataworksBI Reward Point
*/
pragma solidity ^0.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RewardPoint is ERC20("RewardPoint", "REWARDPT"), Ownable {
	// Defined Roles
    mapping(address => uint256) private _ownerRewards;
    bytes32 private constant VENDOR = keccak256("VENDOR");
    bytes32 private constant CONSUMER = keccak256("CONSUMER");

     // Special address
//    address private _supplyManager;

/*    constructor() public {
        balances[tx.origin] = 10000;
    }
*/
    function mint(address account, uint256 amount) public onlyOwner {
        require(account != address(0), "ERC20: mint to the zero address");
        _ownerRewards[account] += amount;
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public onlyOwner {
        require(account != address(0), "ERC20: mint to the zero address");
        uint256 accountBalance = balanceOf(account);
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        _ownerRewards[account] -= amount;
        _burn(account, amount);
    }
}
