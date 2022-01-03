const RewardPoint = artifacts.require("RewardPoint");

module.exports = function(deployer) {
    deployer.deploy(RewardPoint);
};