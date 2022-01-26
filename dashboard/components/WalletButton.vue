<template>
  <div>
    <template v-if="isLoading">
      <v-skeleton-loader width="150" height="35" type="card" />
    </template>
    <template v-else-if="!isAccountConnected">
      <v-btn
        outlined
        @click="openDialog"
      >
        Connect Wallet
      </v-btn>
      <v-dialog
        :value="state !== 'closed'"
        persistent
        max-width="600"
        transition="fade-transition"
        overlay-opacity="0.9"
        @click:outside="onDialogClose"
      >
        <v-card>
          <v-col v-if="state === 'show-wallets'">
            <v-row align="center" justify="center" class="mb-5">
              <v-col cols="1">
                <v-img :src="require('~/static/symbols/wallet.png')" />
              </v-col>
              <v-col>
                Select a wallet to connect to
              </v-col>
            </v-row>
            <v-row>
              <v-col v-for="(wallet, index) in wallets" :key="index" cols="6" md="4">
                <v-card width="100%" color="gray" class="pa-2 wallet-btn" flat @click="connect(wallet, index)">
                  <v-col>
                    <v-row align="center" justify="center" class="mb-2">
                      <v-img max-height="100" contain :src="wallet.image" />
                    </v-row>
                    <v-row align="center" justify="center">
                      {{ wallet.name }}
                    </v-row>
                  </v-col>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col v-else-if="state === 'loading' && selectedWallet">
            <v-row align="center" justify="center" class="pt-5">
              Connecting to {{ selectedWallet.name }}
            </v-row>
            <v-row>
              <v-progress-linear indeterminate />
            </v-row>
            <v-row align="center" justify="center" class="mb-5 my-10">
              <v-img max-height="150" contain :src="selectedWallet.image" />
            </v-row>
          </v-col>
          <v-col v-else-if="state === 'error-missing'" class="pa-10">
            <v-row align="center" justify="center">
              <v-col cols="2">
                <v-img contain :src="selectedWallet.image" />
              </v-col>
              <v-col>
                {{ selectedWallet.name }}
              </v-col>
            </v-row>
            <v-row align="center" justify="center" class="mb-5 my-10">
              You'll need to install {{ selectedWallet.name }} to continue. Once you have it installed, go ahead and refresh the page.
            </v-row>
            <v-row>
              <v-btn class="mr-5" color="primary" outlined @click="openDialog">
                Back
              </v-btn>
              <v-btn v-if="selectedWallet.installLink" color="primary" @click="installWallet(selectedWallet)">
                Install {{ selectedWallet.name }}
              </v-btn>
            </v-row>
          </v-col>
        </v-card>
      </v-dialog>
    </template>

    <template v-else>
      <v-menu offset-y tile>
        <template #activator="{ on, attrs }">
          <v-btn
            class="pa-2"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon size="12" color="green" class="mr-3">
              mdi-circle
            </v-icon>
            {{ abbreviatedAddress }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="viewOnBscScan">
            View on BscScan
          </v-list-item>
          <v-list-item @click="disconnect">
            Disconnect
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { NoEthereumProviderError } from '@web3-react/injected-connector'
import { NoBscProviderError } from '@binance-chain/bsc-connector'

export default {
  name: 'WalletButton',
  data () {
    return {
      state: 'closed',
      selectedWalletIndex: null,

      wallets: [
        {
          name: 'Metamask',
          image: require('~/static/logos/metamask.svg'),
          installLink: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
          connectorId: 'injected'
        },
        {
          name: 'Binance Chain Wallet',
          image: require('~/static/logos/bscwallet.svg'),
          installLink: 'https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp',
          connectorId: 'binanceChainWallet'
        },
        {
          name: 'Trust Wallet',
          image: require('~/static/logos/trust.svg'),
          connectorId: 'injected'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('accounts', {
      isAccountConnected: 'isAccountConnected',
      address: 'getAddress',
      abbreviatedAddress: 'getAbbreviatedAddress',
      isLoading: 'isLoading'
    }),

    selectedWallet () {
      return this.wallets[this.selectedWalletIndex]
    }
  },
  methods: {
    ...mapActions('accounts', ['updateAccount']),

    async connect (wallet, index) {
      try {
        this.selectedWalletIndex = index
        this.state = 'loading'
        const provider = await this.$web3ConnectorsManager.connect(wallet.connectorId)
        this.$web3.setProvider(provider)
        await this.updateAccount()
        this.state = 'closed'
      } catch (e) {
        if (e instanceof NoEthereumProviderError) {
          this.state = 'error-missing'
        } else if (e instanceof NoBscProviderError) {
          this.state = 'error-missing'
        } else {
          this.state = 'show-wallets'
        }
      }
    },
    async disconnect () {
      this.$web3ConnectorsManager.disconnect()
      await this.updateAccount()
    },

    viewOnBscScan () {
      window.open(`https://bscscan.com/address/${this.address}`)
    },

    installWallet (wallet) {
      window.open(wallet.installLink)
    },

    openDialog () {
      this.state = 'show-wallets'
      this.selectedWalletIndex = null
    },
    onDialogClose () {
      this.state = 'closed'
    }
  }
}
</script>

<style scoped>
  .wallet-btn {
    transition: filter .5s;
    filter: brightness(1);
  }

  .wallet-btn:hover {
    transition: filter .5s;
    filter: brightness(0.5);
  }

  .disconnect-btn {
    font-size: 10px;
    cursor: pointer;
  }
</style>
