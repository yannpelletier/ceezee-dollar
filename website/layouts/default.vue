<template>
  <v-app dark>
    <v-app-bar flat max-height="70" color="transparent">
      <v-spacer />
      <v-row class="page-container px-5" align="center" justify="center">
        <v-col cols="4" md="3">
          <nuxt-link to="/">
            <v-img class="logo" max-width="150px" contain :src="require('~/static/logos/ceezee.png')" />
          </nuxt-link>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-menu offset-y open-on-hover nudge-bottom="5" close-delay="200">
            <template #activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                About CZD <v-icon>mdi-menu-down</v-icon>
              </span>
            </template>
            <v-list>
              <v-list-item to="/about">
                What is CZD?
              </v-list-item>
              <v-list-item to="/rebase">
                Rebase
              </v-list-item>
              <v-list-item to="/tokenomics">
                Tokenomics
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" @click="buyCZD">
            <v-img class="mr-2" width="16" height="16" contain :src="require('~/static/logos/pancakeswap.png')" />
            Buy CZD
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" @click="addLiquidity">
            <v-img class="mr-2" width="16" height="16" contain :src="require('~/static/logos/pancakeswap.png')" />
            Add Liquidity
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" outlined @click="launchApp">
            Launch Staking App
          </v-btn>
        </v-col>
      </v-row>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    buyCZD () {
      window.open('https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xEDB4C8396DEB55ECE0aac6BaaA273B6543F76A7d')
    },
    addLiquidity () {
      window.open('https://exchange.pancakeswap.finance/#/add/0xEDB4C8396DEB55ECE0aac6BaaA273B6543F76A7d/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
    },
    launchApp () {
      window.open('')
    }
  }
}
</script>

<style>
  * {
    font-family: Rubik, serif;
  }

  .page-container {
    width: 100vw;
  }

  .nav-link {
    cursor: pointer;
    text-decoration: none;
    color: white !important;
  }

  .logo {
    cursor: pointer;
    filter: brightness(1.0);
    transition: all .25s;
  }

  .logo:hover {
    filter: brightness(0.6);
    transition: all .25s;
  }
</style>
