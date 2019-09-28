import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', async () => {
  //window.addEventListener('load', function () {
    var web3 = window.web3

    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false
      web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed

        resolve({
          hasInjectedWeb3: web3.isConnected(),
          web3() {
            return web3
          }
        })
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      web3 = new Web3(web3.currentProvider)
      resolve({
        hasInjectedWeb3: web3.isConnected(),
        web3() {
          return web3
        }
      })
      // Acccounts always exposed
      //web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      reject({
        result: null,
        err: 'Unable to connect to Web3'
      })
    }
  })
})
  .then((result) => { // get blockchain network Id
    return new Promise(function (resolve, reject) {
      result.web3().version.getNetwork((err, networkId) => {
        if (err) {
          result = Object.assign({}, result)

          /* eslint-disable-next-line */
          reject({
            result,
            err
          })
        } else {
          networkId = networkId.toString()
          result = Object.assign({}, result, { networkId })
          resolve(result)
        }
      })
    })
  })
  .then((networkIdResult) => { // get coinbase
    return new Promise(function (resolve, reject) {
      networkIdResult.web3().eth.getCoinbase((err, coinbase) => {
        let result
        if (err) {
          result = Object.assign({}, networkIdResult)

          /* eslint-disable-next-line */
          reject({
            result,
            err
          })
        } else {
          result = Object.assign({}, networkIdResult, { coinbase })
          resolve(result)
        }
      })
    })
  })
  .then((coinbaseResult) => {
    return new Promise(function (resolve, reject) {
      let address = coinbaseResult.web3().eth.defaultAccount
      let result = Object.assign({}, coinbaseResult, { address })
      resolve(result)
    })
  })

export default getWeb3
