
<template>
  <div class="main-wrapper">
    <balances></balances>
    <purchase></purchase>
    <sale></sale>
    <order-list></order-list>
  </div>
</template>

<script>
import balances from '@/components/Balances'
import purchase from '@/components/Purchase'
import sale from '@/components/Sale'
import orderList from '@/components/OrderList'

export default {
  name: 'app',

  components: {
    balances,
    purchase,
    sale,
    orderList
  }
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-wrapper {
  display: flex;
}

.balances, .purchase, .sale, .order-list {
  flex: 2;
  text-align: left;
  padding: 15px;
}

.balances {
  flex: 1.5;
}

.title {
  color: #0aadef;
  text-transform: uppercase;
  font-size: 16px;
  margin: 0 0 15px;
}
</style>
