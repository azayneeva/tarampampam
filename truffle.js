module.exports = {
  networks: {
    // development: {
    //   host: 'localhost',
    //   port: 8545,
    //   network_id: '*' // Match any network id
    // },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      host: "127.0.0.1",
      port: 8545,
      network_id: '4',
      from: '0x6403e1c470f3bb7f0f1bd23756624e0293f98079',
      gas: 4700000 
    },
  },
  solc: {
    // Turns on the Solidity optimizer. For development the optimizer's
    // quite helpful, just remember to be careful, and potentially turn it
    // off, for live deployment and/or audit time. For more information,
    // see the Truffle 4.0.0 release notes.
    //
    // https://github.com/trufflesuite/truffle/releases/tag/v4.0.0
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
