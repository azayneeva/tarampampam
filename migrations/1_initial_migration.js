// const Migrations = artifacts.require('./Migrations.sol')

// module.exports = function (deployer) {
//   deployer.deploy(Migrations)
// }

const Web3 = require('web3');

const TruffleConfig = require('../truffle');

var Migrations = artifacts.require("./Migrations.sol");


module.exports = function(deployer, network, addresses) {
  const config = TruffleConfig.networks[network];
    const web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));

    console.log('>> Unlocking account ' + config.from);
    web3.eth.personal.unlockAccount(config.from, 'Alina1988');
  

  console.log('>> Deploying migration');
  deployer.deploy(Migrations);
};