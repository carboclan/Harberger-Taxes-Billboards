var contract = artifacts.require("./escrow.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(contract);
};
