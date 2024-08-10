const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const initialOwner = "0xE395793777e5619296b804b29b1E7f4E81524e0b";  // Replace with the actual initial owner address

module.exports = buildModule("SolarModule", (m) => {
  // Get parameters if you want to make them configurable
  // For example, you could pass the initial owner address as a parameter

  const solar = m.contract("Solar", [initialOwner]);

  return { solar };
});
