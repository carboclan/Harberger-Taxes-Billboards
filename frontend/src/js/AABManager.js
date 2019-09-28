import AABoard from '../../build/contracts/AABoard.json'
import blockchainManager from './BlockchainManager'
import { SC_METHODS } from '../util/constants'
import { ethToWei } from './utilities'

let aabManager = null

class AABManager {
  constructor () {
    aabManager = aabManager || this
    return aabManager
  }
  
  buyAdBoard (param = {}) {
    return new Promise(function (resolve, reject) {
      let adId = param.adId
      let price = ethToWei(param.price)
      let content = param.content
      let val = ethToWei(param.value)

      const data = Object.assign({}, {
        state: param.state,
        contractToUse: AABoard,
        contractMethod: SC_METHODS.BUY_AD_BOARD,
        methodParam: Object.assign({}, { adId, price, content }),
        value: val
      })
  
      return blockchainManager.invokeBlockChain(data)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject({err})
        })
    })
  }

  forkAdBoard (param = {}) {
    return new Promise(function (resolve, reject) {
      let price = ethToWei(param.price) //blockchainManager.zeroNum(param.price)
      let parentId = param.parentId
      let content = param.content
      let val = ethToWei(param.value)

      const data = Object.assign({}, {
        state: param.state,
        contractToUse: AABoard,
        contractMethod: SC_METHODS.CREATE_AD_BOARD,
        methodParam: Object.assign({}, { price, parentId, content }),
        value: val
      })
  
      return blockchainManager.invokeBlockChain(data)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject({err})
        })
    })
  }

  changePrice (param = {}) {
    return new Promise(function (resolve, reject) {
      let adId = param.adId
      let priceToChange = ethToWei(param.priceToChange)

      const data = Object.assign({}, {
        state: param.state,
        contractToUse: AABoard,
        contractMethod: SC_METHODS.CHANGE_PRICE,
        methodParam: Object.assign({}, { adId, priceToChange }),
        value: ''
      })
  
      return blockchainManager.invokeBlockChain(data)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject({err})
        })
    })
  }

  changeContent (param = {}) {
    return new Promise(function (resolve, reject) {
      let adId = param.adId
      let contentToChange = param.contentToChange

      const data = Object.assign({}, {
        state: param.state,
        contractToUse: AABoard,
        contractMethod: SC_METHODS.CHANGE_CONTENT,
        methodParam: Object.assign({}, { adId, contentToChange }),
        value: ''
      })
  
      return blockchainManager.invokeBlockChain(data)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject({err})
        })
    })
  }

  addDeposit (param = {}) {
    return new Promise(function (resolve, reject) {
      let adId = param.adId
      let val = ethToWei(param.depositToAdd)

      const data = Object.assign({}, {
        state: param.state,
        contractToUse: AABoard,
        contractMethod: SC_METHODS.ADD_DEPOSITE,
        methodParam: Object.assign({}, { adId }),
        value: val
      })
  
      return blockchainManager.invokeBlockChain(data)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject({err})
        })
    })
  }

  withdrawDeposit (param = {}) {
    return new Promise(function (resolve, reject) {
      let adId = param.adId
      let amount = ethToWei(param.amountToWithdraw)

      const data = Object.assign({}, {
        state: param.state,
        contractToUse: AABoard,
        contractMethod: SC_METHODS.WITHDRAW_DEPOSIT,
        methodParam: Object.assign({}, { adId, amount }),
        value: ''
      })
  
      return blockchainManager.invokeBlockChain(data)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject({err})
        })
    })
  }

  testCallBlockchain() {

  }

  randomShow (adId, state) {
    return new Promise(function (resolve, reject) {

      const param = Object.assign({}, {
        state: state,
        contractToUse: AABoard,
        contractMethod: SC_METHODS.GET_AD_BOARD_DATA,
        methodParam: adId,
        value: ''
      })
  
      return blockchainManager.accessBlockChain(param)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject({err})
        })
    })
  }

  async getTotalNumAdBoards (state) {
    const param = Object.assign({}, {
      state: state,
      contractToUse: AABoard,
      contractMethod: SC_METHODS.GET_TOTAL_NUM_AD_BOARD,
      methodParam: Object.assign({})
    })
    return await blockchainManager.callBlockchain(param)
  }

  async getAdBoardData (adId, state) {
    const param = Object.assign({}, {
      state: state,
      contractToUse: AABoard,
      contractMethod: SC_METHODS.GET_AD_BOARD_DATA,
      methodParam: Object.assign({}, { adId })
    })
    return await blockchainManager.callBlockchain(param)
  }

  async totalTaxIncome (state) {
    const param = Object.assign({}, {
      state: state,
      contractToUse: AABoard,
      contractMethod: SC_METHODS.GET_TOTAL_TAX_INCOME,
      methodParam: Object.assign({})
    })
    return await blockchainManager.callBlockchain(param)
  }

  async getOwnerOf (adId, state) {
    const param = Object.assign({}, {
      state: state,
      contractToUse: AABoard,
      contractMethod: SC_METHODS.GET_OWNER_OF,
      methodParam: Object.assign({}, { adId })
    })
    return await blockchainManager.callBlockchain(param)
  }

  async getDepositAbleToWithdraw (adId, state) {
    const param = Object.assign({}, {
      state: state,
      contractToUse: AABoard,
      contractMethod: SC_METHODS.GET_DEPOSIT_CAN_WITHDRAW,
      methodParam: Object.assign({}, { adId })
    })
    return await blockchainManager.callBlockchain(param)
  }
  
  async getDueDate (adId, state) {
    const param = Object.assign({}, {
      state: state,
      contractToUse: AABoard,
      contractMethod: SC_METHODS.GET_DUE_DATE,
      methodParam: Object.assign({}, { adId })
    })
    return await blockchainManager.callBlockchain(param)
  }
}

aabManager = new AABManager()
export default aabManager
