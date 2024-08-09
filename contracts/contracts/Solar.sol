// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


import "@openzeppelin/contracts/access/Ownable.sol";


contract Solar is Ownable {

    uint256 solarId;
    enum Role {Buyer, Seller}


    struct Registration {
        uint256 solarId;
        string fullName;
        string email;
        string country;
        Role userRole;
        address userAddress;
        uint256 solarCapacity;
        string gridStatus;
    }

    Registration [] registrations;

    mapping(uint256 => address) addressId;
    mapping(address => bool) userRegistered;

    function register(string _fullName, string _email, string _country, userRole, uint256 _solarCapacity, string _gridStatus) public {
        require(userRegistered[msg.sender] == false ,"user already registered");

        registrations.push(Registration ({
            solarId: solarId,
            name: _fullName,
            email: _email,
            country: _country,
            role: _userRole,
            capacity: _solarCapacity,
            grid: _gridStatus
        }));

        solarId++;
    }

    

}