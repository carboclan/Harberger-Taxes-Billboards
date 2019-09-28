export const NETWORKS = {
  '1': 'Main Net',
  '2': 'Deprecated Morden test network',
  '3': 'Ropsten test network',
  '4': 'Rinkeby test network',
  '42': 'Kovan test network',
  '4447': 'Truffle Develop Network',
  '5777': 'Ganache Blockchain',
  '666': 'Daniel Private Blockchain' // This is a test private blockchain. You can change it to your own private blockchain if you have one.
}

export const APPROVED_NETWORK_ID = '1' // Default is undefined. Set as you choose

export const CRYPTO_COMPARE_URL = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
//export const BACKEND_SERVER_ADDRESS = 'http://127.0.0.1:3000'
export const BACKEND_SERVER_ADDRESS = 'http://ec2-52-194-251-95.ap-northeast-1.compute.amazonaws.com:3000'

export const MUTATION_TYPES = {
  CHANGE_CURRENT_ROUTE_TO: 'changeCurrentRouteTo',
  REGISTER_WEB3_INSTANCE: 'registerWeb3Instance',
  UPDATE_WEB3_PROPERTIES: 'updateWeb3Properties',
  SET_CURRENT_VIEW: 'setCurrentView',
  UPDATE_DAPP_READINESS: 'updateDAppReadiness',
  UPDATE_CURRENT_ADBOARD: 'updateCurrentAdBoard'
}

export const ACTION_TYPES = MUTATION_TYPES

export const SC_METHODS = {
  BUY_AD_BOARD: 'buyAdBoard',
  CREATE_AD_BOARD: 'createAdBoard',
  CHANGE_PRICE: 'changePrice',
  CHANGE_CONTENT: 'changeContent',
  ADD_DEPOSITE: 'addDeposit',
  WITHDRAW_DEPOSIT: 'withdrawDeposit',
  GET_AD_BOARD_DATA: 'getAdBoardData',
  GET_TOTAL_TAX_INCOME: 'allTaxIncome',
  GET_OWNER_OF: 'ownerOf',
  GET_DUE_DATE: 'dueDate',
  GET_DEPOSIT_CAN_WITHDRAW: 'depositAbleToWithdraw',
  GET_TOTAL_NUM_AD_BOARD: 'totalSupply'
}

export const SC_EVENTS = {
  BUY: 'BuyEvent',
  CREATE: 'CreateEvent',
  TAX_PAY: 'TaxPayEvent',
  CHANGE_PRICE: 'ChangePriceEvent',
  CHANGE_CONTENT: 'ChangeContentEvent',  
  ADD_DEPOSITE: 'AddDepositEvent',
  WITHDRAW_DEPOSIT: 'WithdrawDepositEvent',
  TRANSFER: 'Transfer',
  Debug: 'DebugEvent',
  Debug1: 'DebugEvent1'
}
