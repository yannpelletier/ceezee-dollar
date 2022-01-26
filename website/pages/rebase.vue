<template>
  <v-container class="page-container pa-10">
    <v-col class="mt-10">
      <v-row class="page-title" align="center" justify="center">
        How does the rebase mechanism work?
      </v-row>
      <v-row class="page-content mt-12">
        <v-col cols="12" md="8">
          Every 10 hrs, CZD rebases itself to adjust to supply and demand of the market.
          CZD has a target price of 1 BUSD. The contract automatically takes a
          TWAP (Time-Weighted Average Price), which becomes the oracle and then expands or
          contracts the CZD supply accordingly. All wallets, pools, farms, etc. rebase every 10 hrs.
        </v-col>
        <v-col cols="12" md="4" align="center">
          <v-img :src="require('~/static/printer.png')" max-width="250" />
        </v-col>
      </v-row>
      <v-row class="page-content mt-12">
        <v-col order="2" order-md="1" cols="12" md="4" align="center">
          <v-img :src="require('~/static/tokens/busd.png')" max-width="225" />
        </v-col>
        <v-col order="1" order-md="2" cols="12" md="8">
          <p>
            When price is over the target price of 1 BUSD, it triggers a rebase — adding
            of coins and expansion of supply to all addresses. When price is under the target
            price of 1 BUSD, it triggers debase — removal of coins and contraction of supply
            from all addresses. The Rebase lag is 6. The Debase lag is 2. This unique feature
            gets debase periods over quicker while easing supply shocks during rebasing as we grow.
            Note that CZD doesn't guarantee that the market price will adjust accordingly, it expects
            the market to do so as a result of the supply change.
          </p>
        </v-col>
      </v-row>
      <v-row class="page-content mt-12">
        <v-col cols="12" md="12">
          The rebase supply change is calculated according to the following equation:
        </v-col>
        <v-col cols="12" md="12" align="center" class="ma-0 pa-0">
          <v-img class="ma-5" :src="require('~/static/equaimage.png')" contain />
        </v-col>
        <v-col cols="12" md="12">
          <h1>
            Examples:
          </h1>
          <p>
            If the oracle price at the time of rebase is $1.10, supply will increase by 1.667% in an
            attempt to decrease price by the same percentage. If I had a balance of 100 CZD, my balance
            would become 101.667 CZD.
          </p>

          <p>
            If the oracle price at the time of rebase is $0.90, supply will decrease by 5% in an
            attempt to increase price by the same percentage. If I had a balance of 100 CZD, my balance
            would become 95 CZD.
          </p>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'Rebase'
}
</script>

<style scoped>
.page-container {
  max-width: 1000px;
}

.page-title {
  font-size: 65px;
  font-weight: bolder;
  color: #f3ba2f;
  text-align: center;
}

.page-content {
  font-size: 20px;
  font-weight: lighter;
  color: #bababa;
  text-align: justify;
}
</style>
