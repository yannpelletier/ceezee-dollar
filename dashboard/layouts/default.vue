<template>
  <v-app dark>
    <v-app-bar flat max-height="75" color="transparent">
      <v-spacer />
      <v-row class="page-container px-5" align="center" justify="center">
        <v-col cols="4" md="2">
          <v-img max-width="175px" contain :src="require('~/static/logos/ceezee.png')" />
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <wallet-button />
        </v-col>
      </v-row>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container class="page-container px-5">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import WalletButton from '@/components/WalletButton'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { WalletButton },
  computed: {
    ...mapGetters('accounts', ['isAccountConnected'])
  },
  watch: {
    isAccountConnected () {
      this.updateDashboardData()
    }
  },
  mounted () {
    this.setupOnFocus()
    this.setupDashboardData()
  },
  methods: {
    ...mapActions('accounts', ['updateAccount']),
    ...mapActions('dashboard', ['updateDashboardData']),

    refreshDashboardData () {
      this.updateAccount()
      this.updateDashboardData()
    },

    setupOnFocus () {
      window.onfocus = () => {
        this.refreshDashboardData()
      }
    },

    setupDashboardData () {
      if (this.$web3ConnectorsManager.isConnectorCached) {
        const thisRef = this
        setTimeout(async () => {
          const provider = await thisRef.$web3ConnectorsManager.connect()
          thisRef.$web3.setProvider(provider)
          await thisRef.refreshDashboardData()
        }, 1000)
      } else {
        this.refreshDashboardData()
      }
    }
  }
}
</script>

<style scoped>
  .page-container {
    width: 100vw;
    max-width: 1250px;
  }
</style>
