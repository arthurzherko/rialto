export const balancesGetter = {
  // All balances
  allBalances: (state, getters) => {
    return state.balances
  },
  // Get Balance by ID
  balanceById: (state, getters) => id => {
    if (getters.allBalances.length > 0) {
      return getters.allBalances.filter(item => item.id === id)[0]
    }
  }
}

export const ordersGetter = {
  // All orders
  allOrders: (state, getters) => {
    return state.cart
  }
}
