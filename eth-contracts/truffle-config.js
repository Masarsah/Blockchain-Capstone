
const HDWallet = require('truffle-hdwallet-provider');
const infuraKey = "b4aec756b14349c181f23c72ce3355ea";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    develop: {
      port: 8545
    }
  },
  rinkeby: {
    provider: () => new HDWallet("<>", `https://rinkeby.infura.io/v3/${infuraKey}`),
    network_id: 4,       // rinkeby's id
    gas: 4500000,        // rinkeby has a lower block limit than mainnet
    gasPrice: 10000000000
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
