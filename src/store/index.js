import Vue from 'vue'
import Vuex from 'vuex'

import { balancesGetter, ordersGetter } from './getters'
import { cartMutations, balanceMutations } from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    // all balances
    cart: [],
    balances: [
      { id: 0, code: 'BTC', name: 'Bitcoin', value: '2.32323' },
      { id: 1, code: 'USD', name: 'Dollars', value: '42442.32323' }
    ]
  },

  getters: Object.assign({}, balancesGetter, ordersGetter),
  mutations: Object.assign({}, cartMutations, balanceMutations)

})
