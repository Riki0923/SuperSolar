// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SolarTokenVault is ERC20, ERC4626, Ownable {

    mapping(address => uint256) public userYield;
    address[] public shareholders;
    mapping(address => bool) public isShareholder;

    constructor(address initialOwner) Ownable(initialOwner)
        ERC20("SolarToken", "SLT") 
        ERC4626(IERC20(address(this))) // The vault uses this token itself as the asset
    {
        _mint(msg.sender, 300000000 * 10**18); 
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function deposit(uint256 assets, address receiver) public override returns (uint256 shares) {
        require(balanceOf(msg.sender) >= assets, "Insufficient balance");
        shares = super.deposit(assets, receiver);
        return shares;
    }

    function withdraw(uint256 assets, address receiver, address owner) public override returns (uint256 shares) {
        shares = super.withdraw(assets, receiver, owner);
        return shares;
    }

    function addShareholder(address shareholder) external onlyOwner {
        if (!isShareholder[shareholder]) {
            shareholders.push(shareholder);
            isShareholder[shareholder] = true;
        }
    }

    function removeShareholder(address shareholder) external onlyOwner {
        if (isShareholder[shareholder]) {
            isShareholder[shareholder] = false;
            // Remove shareholder from the array
            for (uint256 i = 0; i < shareholders.length; i++) {
                if (shareholders[i] == shareholder) {
                    shareholders[i] = shareholders[shareholders.length - 1];
                    shareholders.pop();
                    break;
                }
            }
        }
    }

    function distributeYield(uint256 yieldAmount) external onlyOwner {
        require(yieldAmount <= balanceOf(address(this)), "Not enough tokens in the vault");

        uint256 totalShareholders = shareholders.length;
        if (totalShareholders == 0) return;

        uint256 yieldPerShareholder = yieldAmount / totalShareholders;
        for (uint256 i = 0; i < totalShareholders; i++) {
            address shareholder = shareholders[i];
            userYield[shareholder] += yieldPerShareholder;
        }
    }

    function claimYield() external {
        uint256 yield = userYield[msg.sender];
        require(yield > 0, "No yield available");
        userYield[msg.sender] = 0;
        _transfer(address(this), msg.sender, yield);
    }

    function decimals() public view virtual override(ERC20, ERC4626) returns (uint8) {
        return 18; // or the desired decimal precision
    }

    function returnUserYieldAmount() public view returns (uint256) {
        return userYield[msg.sender];
    }
}
