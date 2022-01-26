import { MutationTree } from 'vuex'
import { AccountsState } from '~/store/accounts/state'

// ************ PAYLOADS *************
interface SetAccountInfoPayload {
  address: string;
}

const mutations: MutationTree<AccountsState> = {
  SET_ACCOUNT_INFO (state, { address }: SetAccountInfoPayload) {
    state.address = address
    state.loading = false
  }
}

export default mutations
