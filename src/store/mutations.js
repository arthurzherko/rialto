import { ADD_TO_CART, REMOVE_FROM_CART, MINUS_BALANCE, ADD_BALANCE } from './mutation-types'

export const cartMutations = {
  [ADD_TO_CART]: (state, payload) => state.cart.push(payload),
  [REMOVE_FROM_CART]: (state, payload) => {
    const index = state.cart.findIndex(p => p.id === payload)
    state.cart.splice(index, 1)
  }
}

export const balanceMutations = {
  [MINUS_BALANCE]: (state, payload) => {
    const amount = payload.type === 'buy' ? payload.totalCommission : payload.amount
    const index = state.balances.findIndex(p => p.id === payload.currencyId)
    state.balances[index].value = (parseFloat(state.balances[index].value) - parseFloat(amount)).toFixed(5)
  },

  [ADD_BALANCE]: (state, payload) => {
    const amount = payload.type === 'buy' ? payload.totalCommission : payload.amount
    const index = state.balances.findIndex(p => p.id === payload.currencyId)
    state.balances[index].value = (parseFloat(state.balances[index].value) + parseFloat(amount)).toFixed(5)
  }
}
