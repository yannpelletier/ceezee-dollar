import { ActionTree } from 'vuex'
import { RootState } from '@/store/state'
import { AccountsState } from '~/store/accounts/state'

// ************ ACTIONS *************
const actions: ActionTree<AccountsState, RootState> = {
  async updateAccount ({ commit }) {
    const address = await this.$web3ConnectorsManager.getAccount()
    commit('SET_ACCOUNT_INFO', {
      address
    })
  }
}

export default actions
