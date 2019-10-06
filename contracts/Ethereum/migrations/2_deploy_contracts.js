var AABoard = artifacts.require("./AABoard.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(AABoard, "HBB", "HBB");
};
