import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import trans from './service/Trans'
import axios from 'axios';

import { mapState, mapActions } from 'vuex'
import { ACTION_TYPES, SC_EVENTS } from './util/constants'
import aabManager from './js/AABManager'
import monitorWeb3 from './util/web3/monitorWeb3'
import { BACKEND_SERVER_ADDRESS, CRYPTO_COMPARE_URL } from './util/constants'

Vue.prototype.$trans = trans
Vue.config.devtools = true
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  computed: {
    ...mapState({
      hasInjectedWeb3: state => state.web3.isInjected,
      hasWeb3InjectedBrowser: state => state.user.hasWeb3InjectedBrowser,
      isConnectedToApprovedNetwork: state => state.user.isConnectedToApprovedNetwork,
      hasCoinbase: state => state.user.hasCoinbase,
      networkId: state => state.web3.networkId,
      coinbase: state => state.web3.coinbase,
      currentRoute: state => state.currentRoute,
      currentView: state => state.currentView,
      isDAppReady: state => state.isDAppReady,
      defaultRoute: state => state.defaultRoute
    })
  },
  watch: {
    hasInjectedWeb3(web3ConnectionValue) {
      console.log('hasInjectedWeb3: ', web3ConnectionValue)
    },
    networkId(networkId) {
      console.log('networkId: ', networkId)
    },
    coinbase(coinbase) {
      console.log('main.js coinbase: ', coinbase)
    },
    isDAppReady(isDAppReady) {
      console.log('isDAppReady: ', isDAppReady)
    },
    $route(newRoute) {
      this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](newRoute)
      this[ACTION_TYPES.SET_CURRENT_VIEW](newRoute)
    }
  },
  beforeCreate: function() {
    this.$store.dispatch(ACTION_TYPES.REGISTER_WEB3_INSTANCE)
      .then((result) => {
        let state = result.state
        monitorWeb3(state)
        if (!(this.isDAppReady)) {
          this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
        }
      })
      .catch((result = {}) => {
        let state = result.state
        monitorWeb3(state)
        if (!(this.isDAppReady)) {
          this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
        }

        console.error(result, 'Unable to REGISTER_WEB3_INSTANCE')
      })
  },
  created: function() {
    this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](this.$route)
    this[ACTION_TYPES.SET_CURRENT_VIEW](this.$route)
  },
  methods: {
    ...mapActions([
      ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO,
      ACTION_TYPES.SET_IS_VALID_USER_BUT,
      ACTION_TYPES.RESET_IS_VALID_USER_BUT,
      ACTION_TYPES.SET_CURRENT_VIEW,
      ACTION_TYPES.UPDATE_CURRENT_ADBOARD
    ]),
    reloadSite(adId) {
      let routeUrl = this.$router.resolve({
        path: "/ad/" + adId
      });
      window.open(routeUrl.href, '_blank');
    },
    buyAdBoard(data) {
      const param = Object.assign({}, {
        state: this.$store.state,
        adId: this.$store.state.currentAdBoard.adId,
        price: parseFloat(data.initPrice),
        content: data.initName,
        value: parseFloat(data.initDeposit) + parseFloat(data.artPrice)
      })

      aabManager.buyAdBoard(param)
        .then((result) => {
          for (var i = 0; i < result.logs.length; i++) {
            let log = result.logs[i]
            if (SC_EVENTS.TRANSFER == log.event) {
              /*
                "args": {
                    "0": "0x13858233FAc02Ebefb08972aC8CD61a5e739883f",
                    "1": "0x0721628278526F691b6122EeB74F5F088e8042e8",
                    "2": "0",
                    "__length__": 3,
                    "from": "0x13858233FAc02Ebefb08972aC8CD61a5e739883f",
                    "to": "0x0721628278526F691b6122EeB74F5F088e8042e8",
                    "tokenId": "0"
                }
                */
            } else if (SC_EVENTS.BUY == log.event) {
              let newAdId = log.args[0]
              this.addHistory(newAdId)
              /*
                "args": {
                    "0": "0",
                    "__length__": 1,
                    "adId": "0"
                }
                */
            } else if (SC_EVENTS.TAX_PAY == log.event) {
              /*
                "args": {
                    "0": "0",
                    "1": "11c37937e08000",
                    "2": "11c37937e08000",
                    "__length__": 3,
                    "adId": "0",
                    "copyrightAmount": "11c37937e08000",
                    "administrationAmount": "11c37937e08000"
                }
                */
            }
          }
        })
        .catch((error) => {
          // {code: -32016, message: "The execution failed due to an exception."}
          console.error("main.js buyAdBoard: " + JSON.stringify(error))
        })
    },
    forkAdBoard(data) {
      const param = Object.assign({}, {
        state: this.$store.state,
        price: parseFloat(data.forkPrice),
        parentId: this.$store.state.currentAdBoard.adId,
        content: data.forkContent,
        value: parseFloat(data.forkDeposit)
      })

      aabManager.forkAdBoard(param)
        .then((result) => {
          for (var i = 0; i < result.logs.length; i++) {
            let log = result.logs[i]
            if (SC_EVENTS.TRANSFER == log.event) {
              /*
                "args": {
                  "0": "0x13858233FAc02Ebefb08972aC8CD61a5e739883f",
                  "1": "0x0721628278526F691b6122EeB74F5F088e8042e8",
                  "2": "0",
                  "__length__": 3,
                  "from": "0x13858233FAc02Ebefb08972aC8CD61a5e739883f",
                  "to": "0x0721628278526F691b6122EeB74F5F088e8042e8",
                  "tokenId": "0"
                }
                */
            } else if (SC_EVENTS.CREATE == log.event) {

              let newAdId = log.args[0]
              this.addHistory(newAdId)
              /*
                "args": {
                  "0": "0",
                  "__length__": 1,
                  "adId": "0"
                }
                */
            } else if (SC_EVENTS.TAX_PAY == log.event) {
              /*
                "args": {
                  "0": "0",
                  "1": "11c37937e08000",
                  "2": "11c37937e08000",
                  "__length__": 3,
                  "adId": "0",
                  "copyrightAmount": "11c37937e08000",
                  "administrationAmount": "11c37937e08000"
                }
                */
            }
          }
        })
        .catch((error) => {
          console.error("main.js forkAdBoard: " + JSON.stringify(error))
        })
    },
    changePrice(data) {
      const param = Object.assign({}, {
        state: this.$store.state,
        adId: this.$store.state.currentAdBoard.adId,
        priceToChange: parseFloat(data.priceToChange)
      })

      aabManager.changePrice(param)
        .then((result) => {
          for (var i = 0; i < result.logs.length; i++) {
            let log = result.logs[i]
            if (SC_EVENTS.CHANGE_PRICE == log.event) {
              let newAdId = log.args[0]
              this.addHistory(newAdId)
            }
          }
        })
        .catch((error) => {
          // {code: -32016, message: "The execution failed due to an exception."}
          console.error("main.js forkAdBoard 333: " + JSON.stringify(error))
        })
    },
    changeContent(data) {

      const param = Object.assign({}, {
        state: this.$store.state,
        adId: this.$store.state.currentAdBoard.adId,
        contentToChange: data.contentToChange
      })

      aabManager.changeContent(param)
        .then((result) => {
          for (var i = 0; i < result.logs.length; i++) {
            let log = result.logs[i]
            if (SC_EVENTS.CHANGE_CONTENT == log.event) {
              let newAdId = log.args[0]
              this.addHistory(newAdId)
            }
          }
        })
        .catch((error) => {
          console.error("main.js changeContent: " + JSON.stringify(error))
        })
    },
    addDeposit(data) {

      const param = Object.assign({}, {
        state: this.$store.state,
        adId: this.$store.state.currentAdBoard.adId,
        depositToAdd: parseFloat(data.depositToAdd)
      })

      aabManager.addDeposit(param)
        .then((result) => {
          for (var i = 0; i < result.logs.length; i++) {
            let log = result.logs[i]
            if (SC_EVENTS.ADD_DEPOSITE == log.event) {
              let newAdId = log.args[0]
              this.addHistory(newAdId)
            }
          }
        })
        .catch((error) => {
          console.error("main.js addDeposit: " + JSON.stringify(error))
        })
    },
    withdrawDeposit(data) {
      const param = Object.assign({}, {
        state: this.$store.state,
        adId: this.$store.state.currentAdBoard.adId,
        amountToWithdraw: parseFloat(data.amountToWithdraw)
      })

      aabManager.withdrawDeposit(param)
        .then((result) => {
          for (var i = 0; i < result.logs.length; i++) {
            let log = result.logs[i]
            if (SC_EVENTS.WITHDRAW_DEPOSIT == log.event) {
              let newAdId = log.args[0]
              this.addHistory(newAdId)
            }
          }
        })
        .catch((error) => {
          console.error("main.js withdrawDeposit: " + JSON.stringify(error))
        })
    },
    async lookAround() {
      // from contract
      let numAdBoards = await aabManager.getTotalNumAdBoards(this.$store.state);
      let adId = Math.floor((Math.random() * numAdBoards));
      this.reloadSite(adId);
    },
    async getAdBoardData(adId) {
      let owner = await aabManager.getOwnerOf(adId, this.$store.state)
      let data = await aabManager.getAdBoardData(adId, this.$store.state)
      data = Object.assign({}, data, { adId, owner })
      this[ACTION_TYPES.UPDATE_CURRENT_ADBOARD](data);
      return data
    },
    async getOwnerOf(adId) {
      return await aabManager.getOwnerOf(adId, this.$store.state)
    },
    async getTotalTaxIncome() {
      return await aabManager.totalTaxIncome(this.$store.state)
    },
    async getDepositAbleToWithdraw(adId) {
      return await aabManager.getDepositAbleToWithdraw(adId, this.$store.state)
    },
    async getDueDate(adId) {
      return await aabManager.getDueDate(adId, this.$store.state)
    },
    async getEthPrice() {
      return await axios.get(CRYPTO_COMPARE_URL);
    },
    async getHistory(adId) {
      let apiUrl = BACKEND_SERVER_ADDRESS + "/api/v1/getAdBoardHistory?ad_id=" + adId;
      return await axios.get(apiUrl);
    },
    async addHistory(adId) {
      let oldAdId = this.$store.state.currentAdBoard.adId;
      let advId = parseInt(adId);

      let adboardData = await this.getAdBoardData(advId);
      let that = this;
      let apiUrl = BACKEND_SERVER_ADDRESS + '/api/v1/addAdboardHistory'
      axios.post(apiUrl, {
        ad_id: advId,
        parent_id: adboardData.parentId,
        owner_address: adboardData.owner,
        price: adboardData.price,
        deposit: adboardData.deposit,
        last_tax_pay_timestamp: adboardData.lastTaxPayTimestamp,
        content: adboardData.content,

      }
      /*, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "cache-control": "no-cache"
            }
          }*/
      )
        .then(function(response) {
          Vue.prototype.$trans.$emit("operate", "success");
          Vue.prototype.$trans.$emit("reloadHistory", { "adId": oldAdId });

          if (advId != oldAdId) {
            that.reloadSite(advId)
          }
        })
        .catch(function(error) {
          console.log("main.js addHistory: " + error)
        });
    }
  },
  template: '<App :is-d-app-ready="isDAppReady" :current-view="currentView" />'
})