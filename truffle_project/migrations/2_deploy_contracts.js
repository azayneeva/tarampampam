// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
var CampaignFactory = artifacts.require("CampaignFactory");

module.exports = function(deployer) {
  deployer.deploy(CampaignFactory);
};
