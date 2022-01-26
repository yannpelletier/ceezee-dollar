<template>
  <v-container class="page-container pa-10">
    <v-col class="mt-10">
      <v-row class="page-title" align="center" justify="center">
        What are the tokenomics?
      </v-row>
      <v-row class="page-content mt-12">
        <v-col cols="12" md="8">
          CZD was a grass roots release ‒ no dev funds, no sales, no allotted tokens, no funny
          business. Just 3000 CZD and 3000 BUSD put into liquidity on Pancakeswap. The target/peg
          of CZD is 1 BUSD.
        </v-col>
        <v-col cols="12" md="4" align="center">
          <v-img :src="require('~/static/distribution.png')" contain max-height="300" />
        </v-col>
      </v-row>
      <v-row class="page-content mt-12">
        <v-col order="2" order-md="1" cols="12" md="4" align="center">
          <v-img :src="require('~/static/tax.png')" max-width="225" contain />
        </v-col>
        <v-col order="1" order-md="2" cols="12" md="8">
          <p>
            Every transfer and sell has a 5% transaction fee applied to it. This fee is distributed as follows:
          </p>
          <h4>
            <ul>
              <li>
                1.67% gets burned
              </li>
              <li>
                2.5% of each tx is sent to CZD/BUSD liquidity providers on PancakeSwap
              </li>
              <li>
                0.83% of each tx is shared among stakers
              </li>
            </ul>
          </h4>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'Tokenomics'
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
