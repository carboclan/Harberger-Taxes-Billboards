export default {
  currentRoute: null,
  currentView: null,
  web3: {
    address: null,
    coinbase: null,
    error: null,
    instance: null,
    isInjected: false,
    networkId: null
  },
  currentAdBoard: {
    adId: 0,
    owner: null,
    parentId: 0,
    price: 0,
    taxRate: 0,
    state: 0,
    lastTaxPayTimestamp: 0,
    content: ''
  },
  isDAppReady: false,
}
