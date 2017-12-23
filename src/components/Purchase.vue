<template>
  <div class="purchase">
    <div class="title">
      Покупка
    </div>
    <order-form v-if="order" v-model="order" :buyCurrencyId="0" :saleCurrencyId="1" :lastPrice="'13000.00000'" :type="'buy'"></order-form>
    <button type="button" @click="createOrder">Купить</button>
    <div v-if="showError" class="text-danger">К сожалению на данный момент мы предоставляем возможность создания только одного ордера</div>
  </div>
</template>

<script>
import orderForm from '@/components/orderForm'
import { ADD_TO_CART, MINUS_BALANCE } from '@/store/mutation-types'

const defaultOrder = {
  id: null,
  amount: '1.00000',
  price: '0.00000',
  total: '0.00000',
  commission: '0.00000',
  totalCommission: '0.00000',
  type: 'buy',
  currencyId: 1
}

export default {
  name: 'purchase',

  components: {
    orderForm
  },

  data () {
    return {
      order: defaultOrder,
      cart: this.$store.state.cart,
      showError: false
    }
  },

  methods: {
    createOrder () {
      this.$validator.validateAll()
      if (this.errors.any()) {
        return
      }

      if (this.cart.length > 0) {
        this.showError = true
        return
      }

      setTimeout(() => {
        if (this.errors.any()) {
          return
        }
        this.$store.commit(ADD_TO_CART, this.order)
        this.$store.commit(MINUS_BALANCE, this.order)
      }, 0)
      // whithout setTimeout there is a bug, i'll fix it later
      // it was late at night :(
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.purchase {
  border: 1px solid #e5e5e5;
  border-left: none;
}

.text-danger {
  color: #dc3545;
}

button {
  background-color: #25b02b;
  border: none;
  color: #fff;
  border-radius: 4px;
  padding: 10px 16px;
  cursor: pointer;
}

</style>
