import { Plugin } from '@nuxt/types/app'
import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { Web3ConnectorsManager } from '~/classes/web3-connectors-manager'

declare module 'vue/types/vue' {
  interface Vue {
    $web3: Web3
    $web3ConnectorsManager: Web3ConnectorsManager
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $web3: Web3
    $web3ConnectorsManager: Web3ConnectorsManager
  }
  interface Context {
    $web3: Web3
    $web3ConnectorsManager: Web3ConnectorsManager
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $web3: Web3
    $web3ConnectorsManager: Web3ConnectorsManager
  }
}

const plugin: Plugin = (_, inject) => {
  try {
    const web3ConnectorsManager = new Web3ConnectorsManager({
      cacheConnector: true,
      connectorOptions: {
        injected: {
          connectorClass: InjectedConnector
        },
        binanceChainWallet: {
          connectorClass: BscConnector
        }
      }
    })
    inject('web3ConnectorsManager', web3ConnectorsManager)

    const web3 = new Web3('https://bsc-dataseed.binance.org/')
    inject('web3', web3)
  } catch (e) {
    console.log(e)
  }
}

export default plugin
