import contract from 'truffle-contract'
import { APPROVED_NETWORK_ID, NETWORKS } from '../util/constants'

let blockchainManager = null

class BlockchainManager {
  constructor () {
    blockchainManager = blockchainManager || this
    return blockchainManager
  }

  invokeBlockChain (param = {}) {
    return new Promise((resolve, reject) => {
      const state = param.state;
      if (!state || !state.web3 || !(state.web3.instance)) {
        reject({ error: true, warningMessage: 'Web3 is not initialised. Use a Web3 injector' })
      } else {
        const approvedNetworkId = APPROVED_NETWORK_ID || state.web3.networkId
        if (state.web3.networkId === approvedNetworkId) {
          const contractToUse = param.contractToUse;
          let ethVueContract = contract(contractToUse)
          ethVueContract.setProvider(state.web3.instance().currentProvider)
          state.web3.instance().eth.getCoinbase((error, coinbase) => {
            if (error) {
              reject({ error, warningMessage: 'Unable to get coinbase for this operation' })
            } else {
              
              const contractMethod = param.contractMethod;

              const value = param.value;
              const fromValue = value !== '' ? { from: coinbase, value } : { from: coinbase }
              const methodParam = param.methodParam;

              ethVueContract.deployed()
                .then((instance) => {
                  instance[contractMethod](...(Object.values(methodParam)), fromValue)
                    .then((result) => {
                      resolve(result)
                    })
                    .catch((error) => {
                      reject(error)
                    })
                })
                .catch((error) => {
                  reject({ error, isValid: true, warningMessage: "We couldn't find Smart Contracts on your detected network. This is because the Smart Contracts aren't deployed there." })
                })
            }
          })
        } else {
          reject({ error: true, warningMessage: `You're not on the same blockchain as us. Please connect to the ${NETWORKS[APPROVED_NETWORK_ID]}` })
        }
      }
    })
  }
  
  async callBlockchain (param = {}) {
    const state = param.state;

    if (!state || !state.web3 || !(state.web3.instance)) {
      return null
    }

    const approvedNetworkId = APPROVED_NETWORK_ID || state.web3.networkId
    if (state.web3.networkId === approvedNetworkId) {
      const contractMethod = param.contractMethod
      let ethVueContract = contract(param.contractToUse)
      ethVueContract.setProvider(state.web3.instance().currentProvider)

      const methodParam = param.methodParam;

      let instance = await ethVueContract.deployed();
      let returnVal = await instance[contractMethod](...(Object.values(methodParam)))
      return returnVal;
    }

    return null
  }
}

blockchainManager = new BlockchainManager()
export default blockchainManager
