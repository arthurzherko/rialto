<template>
  <div class="order-list">
    <div class="title">
      Мои Ордера
    </div>
    <div v-if="cart.length">
      <div class="order" v-for="order in cart" :key="order.id">
        <div class="type">{{order.type}}</div>
        <div class="price">{{order.price}}</div>
        <div class="amount">{{order.amount}}</div>
        <div class="amount">{{order.id}}</div>
        <button type="button" @click="removeOrder(order)">x</button>
      </div>
    </div>
    <div v-else>Нет ордеров</div>
  </div>
</template>

<script>
import { REMOVE_FROM_CART, ADD_BALANCE } from '@/store/mutation-types'

export default {
  name: 'order-list',

  data () {
    return {
      cart: this.$store.state.cart
    }
  },

  methods: {
    removeOrder (order) {
      this.$store.commit(REMOVE_FROM_CART, order.id)
      this.$store.commit(ADD_BALANCE, order)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.order-list {
  border: 1px solid #e5e5e5;
  border-left: none;
}

.order {
  display: flex;
}

.order div {
  padding: 0 5px;
  flex: 1;
}

.type {
  text-transform: uppercase;
}

button {
  vertical-align: top;
  cursor: pointer;
}

</style>
