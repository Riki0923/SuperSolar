// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Solar is Ownable {

    uint256 solarId;
    uint256 nextTransactionId;

    enum GridStatus {
        ConnectedWithoutPermission,
        ConnectedWithPermission
    }

    struct Registration {
        uint256 solarId;
        string fullName;
        string email;
        string country;
        address userAddress;
        uint256 solarCapacity;
        GridStatus gridStatus;
        bool isVerified;
    }

    struct SolarEnergy {
        uint256 solarId; // Unique identifier for each transaction
        address seller; // Seller of the energy
        string sellerName;
        string sellerEmail;
        string sellerCountry;
        address buyer; // Buyer of the energy
        uint256 amount; // in kWh
        uint256 price;  // price in wei
        bool isSold;
    }

    Registration[] public registrations;
    SolarEnergy[] public solarEnergies;

    mapping(uint256 => SolarEnergy) public solarEnergyById;
    mapping(address => bool) public userRegistered;
    mapping(uint256 => address) addressId;
    mapping(address => uint256) userSolarId;

    event Registered(uint256 indexed solarId, address indexed userAddress);
    event Verified(uint256 indexed solarId, address indexed userAddress);
    event EnergySold(uint256 indexed solarId, address indexed seller, uint256 price);
    event EnergyBought(uint256 indexed solarId, address indexed buyer, uint256 price);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function register(
        string memory _fullName,
        string memory _email,
        string memory _country,
        uint256 _solarCapacity,
        GridStatus _gridStatus
    ) public {
        require(!userRegistered[msg.sender], "User already registered");

        registrations.push(
            Registration({
                solarId: solarId,
                fullName: _fullName,
                email: _email,
                country: _country,
                userAddress: msg.sender,
                solarCapacity: _solarCapacity,
                gridStatus: _gridStatus,
                isVerified: false
            })
        );

        userRegistered[msg.sender] = true;
        addressId[solarId] = msg.sender;
        userSolarId[msg.sender] = solarId; 
        emit Registered(solarId, msg.sender);

        solarId++;
    }

    function getUsers() public view returns(Registration[] memory) {
        return registrations;
    }

    function verify(uint256 _solarId) public onlyOwner {
        address userAddress = addressId[_solarId];
        require(userAddress != address(0), "User not found");

        for (uint256 i = 0; i < registrations.length; i++) {
            if (registrations[i].solarId == _solarId) {
                require(!registrations[i].isVerified, "User already verified");
                registrations[i].isVerified = true;
                emit Verified(_solarId, userAddress);
                return;
            }
        }
        revert("User not found");
    }

function sellEnergy(
    uint256 _amount, // in kWh
    uint256 _price // price in wei
) public returns (uint256) {
    require(userRegistered[msg.sender], "Seller not registered");

    uint256 txId = nextTransactionId++;

    // Fetch seller's solarId
    uint256 sellerSolarId = userSolarId[msg.sender];
    
    // Fetch seller details from registration
    Registration storage sellerRegistration = registrations[sellerSolarId];
    
    // Create new SolarEnergy entry
    SolarEnergy memory newEnergy = SolarEnergy({
        solarId: txId,
        seller: msg.sender,
        sellerName: sellerRegistration.fullName,
        sellerEmail: sellerRegistration.email,
        sellerCountry: sellerRegistration.country,
        buyer: address(0), // Initially no buyer
        amount: _amount,
        price: _price,
        isSold: false
    });

    solarEnergies.push(newEnergy);
    solarEnergyById[txId] = newEnergy;

    emit EnergySold(txId, msg.sender, _price);

    return txId;
}

    function buyEnergy(uint256 _solarId) public payable {
        SolarEnergy storage energy = solarEnergyById[_solarId]; // Access the energy in storage
        require(energy.solarId == _solarId, "Energy not found");
        require(!energy.isSold, "Energy already sold");
        require(userRegistered[msg.sender], "Buyer not registered");
        require(msg.value == energy.price, "Incorrect payment amount");

        // Mark the energy as sold in the mapping
        energy.buyer = msg.sender;
        energy.isSold = true;

        // Update the solarEnergies array as well
        for (uint256 i = 0; i < solarEnergies.length; i++) {
            if (solarEnergies[i].solarId == _solarId) {
                solarEnergies[i].buyer = msg.sender;
                solarEnergies[i].isSold = true;
                break;
            }
        }

        // Transfer the payment to the seller
        payable(energy.seller).transfer(msg.value);

        emit EnergyBought(_solarId, msg.sender, msg.value);
    }

    function getSolarEnergies() public view returns(SolarEnergy[] memory){
        return solarEnergies;
    }
}
