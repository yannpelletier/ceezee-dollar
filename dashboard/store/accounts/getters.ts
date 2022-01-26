import { GetterTree } from 'vuex'
import { RootState } from '@/store/state'
import { AccountsState } from '~/store/accounts/state'

const abbreviateAddress: Function = (address: string) => {
  const begin = address.slice(0, 6)
  const end = address.slice(38)
  return `${begin}...${end}`
}

const getters: GetterTree<AccountsState, RootState> = {
  isAccountConnected ({ address }) {
    return typeof address === 'string'
  },

  getAddress ({ address }) {
    return address
  },
  getAbbreviatedAddress ({ address }) {
    return address ? abbreviateAddress(address) : ''
  },

  isLoading ({ loading }) {
    return loading
  }
}

export default getters
