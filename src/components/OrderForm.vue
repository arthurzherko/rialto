<template>
  <form @submit.prevent="saveProduct">
    <div class="content">
      <div class="form-group">
        <label>Баланс:</label>
        <div class="onlyread">{{balance}}</div>
      </div>
      <div class="form-group">
        <label>Количество BTC:</label>
        <input
          type="text"
          placeholder="Количество"
          v-model="order.amount"
          name="amount"
          @keyup="updateOrder"
          @blur="selectAll"
          data-vv-as="Количество BTC"
          v-validate="`required|min_value:0.00010`" />
      </div>
      <span v-show="errors.has('amount')" class="text-danger">{{ errors.first('amount') }}</span>
      <div class="form-group">
        <label>Цена (USD):</label>
        <input
          type="text"
          placeholder="Цена"
          v-model="order.price"
          name="price"
          @keyup="updateOrder"
          @blur="selectAll"
          data-vv-as="Цена (USD)"
          v-validate="`required|between:${this.minPrice},${this.maxPrice}`" />
      </div>
      <span v-show="errors.has('price')" class="text-danger">{{ errors.first('price') }}</span>
      <div class="form-group">
        <label>Всего (USD):</label>
        <input
          type="text"
          placeholder="Всего"
          v-model="order.total"
          name="total"
          @keyup="updateTotal"
          @blur="selectAll"
          data-vv-as="Всего (USD)"
          v-validate="`required|max_value:${this.balance}|min_value:0.00010`" />
      </div>
      <span v-show="errors.has('total')" class="text-danger">{{ errors.first('total') }}</span>
      <div class="form-group">
        <label>Ком (0.2%) (USD):</label>
        <div class="onlyread">{{order.commission}}</div>
      </div>
      <div class="form-group">
        <label>Всего+Ком (USD):</label>
        <div class="onlyread">{{order.totalCommission}}</div>
      </div>
    </div>
  </form>
</template>

<script>
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru'

Validator.localize('ru', ru)
Vue.use(VeeValidate, {
  locale: 'ru',
  inject: true
})

export default {
  name: 'order-form',

  inject: ['$validator'],

  model: {
    prop: 'order'
  },

  props: {
    order: {
      type: Object,
      required: true
    },

    buyCurrencyId: {
      type: Number,
      required: true
    },

    saleCurrencyId: {
      type: Number,
      required: true
    },

    lastPrice: {
      type: String,
      required: true
    }
  },

  mounted () {
    this.order.price = this.lastPrice
    this.updateOrder()
    this.selectAll()
  },

  computed: {
    balance () {
      return this.$store.getters.balanceById(this.saleCurrencyId).value
    },

    minPrice () {
      return parseFloat(this.lastPrice * 0.9).toFixed(5)
    },

    maxPrice () {
      return parseFloat(this.lastPrice * 1.1).toFixed(5)
    }
  },

  methods: {
    updateOrder () {
      this.order.total = (this.order.amount * this.order.price).toFixed(5)
      this.updateComission()
    },

    updateTotal () {
      this.order.amount = (this.order.total / this.order.price).toFixed(5)
      this.updateComission()
    },

    updateComission () {
      this.order.commission = (this.order.total * 0.002).toFixed(5)
      this.order.totalCommission = (parseFloat(this.order.total) + parseFloat(this.order.commission)).toFixed(5)
    },

    selectAll () {
      this.order.commission = parseFloat(this.order.commission).toFixed(5)
      this.order.price = parseFloat(this.order.price).toFixed(5)
      this.order.totalCommission = parseFloat(this.order.totalCommission).toFixed(5)
      this.order.amount = parseFloat(this.order.amount).toFixed(5)
      this.order.total = parseFloat(this.order.total).toFixed(5)
    }
  }
}
</script>

<style scoped>
  
.content {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  align-items: flex-start;
}

.form-group label {
  flex: 1;
  margin: 0 0 10px;
}

.form-group input, .form-group .onlyread {
  flex: 1;
  max-width: 140px;
}

.text-danger {
  color: #dc3545;
  margin: 0 0 5px 0;
}
</style>
