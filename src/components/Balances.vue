<template>
  <div class="balances">
    <div class="title">
      Балансы
    </div>
    <div class="content">
      <div class="item">
        <div class="column">
          <div class="column-title">
            Валюта
          </div>
        </div>
        <div class="column">
          <div class="column-title">
            Количество
          </div>
        </div>
      </div>
      <div class="item" v-for="balance in balances" :key="balance.id">
        <div class="column">
          <div class="column-content">
            {{balance.code}}
          </div>
        </div>
        <div class="column">
          <div class="column-content">
            {{balance.value}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'balances',

  computed: {
    balances () {
      return this.$store.getters.allBalances
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.balances {
  border: 1px solid #e5e5e5;
}

.content {
  display: flex;
  flex-direction: column;
}

.content .item {
  display: flex;
}

.column {
  flex: 1;
}

.column-title {
  color: #b2b2b2;
  font-size: 13px;
  font-weight: bold;
  margin: 0 0 5px;
}

.column-content {
  color: #5e5e5e;
  font-size: 13px;
}
</style>
