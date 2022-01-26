import { MutationTree } from 'vuex'
import { DashboardState } from '~/store/dashboard/state'

// ************ PAYLOADS *************
interface SetTokenDataPayload {
  marketPrice: string;
  oraclePrice: string;
  totalSupply: string;
  totalBurned: string;
  totalStaked: string;
  nextRebaseTimestamp: number;
}

interface SetAccountDataPayload {
  balance: string;
  staked: string;
  unstakeTimestamp: number;
}

const mutations: MutationTree<DashboardState> = {
  SET_TOKEN_DATA (state, { marketPrice, oraclePrice, totalSupply, totalBurned, totalStaked, nextRebaseTimestamp }: SetTokenDataPayload) {
    state.marketPrice = marketPrice
    state.oraclePrice = oraclePrice
    state.totalSupply = totalSupply
    state.totalBurned = totalBurned
    state.totalStaked = totalStaked
    state.nextRebaseTimestamp = nextRebaseTimestamp
  },

  SET_ACCOUNT_DATA (state, { balance, staked, unstakeTimestamp }: SetAccountDataPayload) {
    state.balance = balance
    state.staked = staked
    state.unstakeTimestamp = unstakeTimestamp
  },

  FLAG_LOADED (state) {
    state.loading = false
  }
}

export default mutations
