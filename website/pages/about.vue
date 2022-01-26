<template>
  <v-container class="page-container pa-10">
    <v-col class="mt-10">
      <v-row class="page-title" align="center" justify="center">
        What is CZD?
      </v-row>
      <v-row class="page-content mt-12">
        <v-col cols="12" md="8">
          CZD is a next-gen elastic supply token built on Binance Smart Chain (BSC) with unique transaction
          tax features that have never before been combined into a rebase token. Think BUSD, RFI, AMPL,
          BNB and CORE — all in one! A brand new concept in rebase tokens that not only
          rebases itself according to market supply and demand, at an interval of 10 hours, rather than a 24 hour interval,
          to give every timezone a chance to take advantage of rebase market opportunities equally, but also burns, rewards LPs and rewards
          stakers each and every single transaction.
        </v-col>
        <v-col cols="12" md="4" align="center">
          <v-img :src="require('~/static/tokens/czd.png')" max-width="150" />
        </v-col>
      </v-row>
      <v-row class="page-content mt-12">
        <v-col order="2" order-md="1" cols="12" md="4" align="center">
          <v-img :src="require('~/static/logos/pancakeswap.png')" max-width="225" />
        </v-col>
        <v-col order="1" order-md="2" cols="12" md="8">
          <p>
            CZD was a grass roots release ‒ no dev funds, no sales, no allotted tokens, no funny
            business. Just 3000 CZD and 3000 BUSD put into liquidity on Pancakeswap.
            To prevent greedy bots from buying up initial supply, we are put a 99% tax on the first
            30 minutes after listing. After which we reverted back to the standard 5% tax on
            transfers and sales and 0% tax on buys.
          </p>
        </v-col>
      </v-row>
      <v-row class="page-content mt-12">
        <v-col cols="12" md="8">
          With the rising use of Ethereum, the many issues regarding its scalability and cost of use
          are becoming more apparent by the day to the mainstream user. This is why we've deciding
          to launch our token on Binance Smart Chain in order to make one's ability to take advantage
          of market opportunities provided by CZD's rebase mechanic dependant on ability to pay for
          fees.
        </v-col>
        <v-col cols="12" md="4" align="center">
          <v-img :src="require('~/static/logos/binance-smart-chain.svg')" max-width="250" />
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'About'
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
