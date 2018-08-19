module.exports = {
  networks: {
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      // host: "localhost",
      // port: 8545,
      // network_id: '4',
      // from: '0x402596a354411c73a3fe8e99ba1e7226fe88361c',
      // gas: 4700000 
      host: '127.0.0.1', // Connect to geth on the specified
      port: 8545,
      from: '0x6403e1c470f3bb7f0f1bd23756624e0293f98079', // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388, // Gas limit used for deploys
    },
  }
}
