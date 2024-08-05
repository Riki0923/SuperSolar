// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


contract Solar {

    uint256 solarId;


    function createSolar() public returns(bool){
        solarId++;
        return true;
    }

    function getSolar() public view returns (uint256) {
        return solarId;
    }

}