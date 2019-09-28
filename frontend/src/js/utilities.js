import Vue from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(VueMoment, {
  moment,
})

export const ethToWei = function (eth) {
  return (eth * 10**18).toString();
}

export const weiToEth = function (wei) {
  return (wei / 10**18).toString();
}

export const timestampToDataString = function (timestamp) {
  return moment(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss");
}
