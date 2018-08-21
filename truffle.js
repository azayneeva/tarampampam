module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
     },
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
  }
}
