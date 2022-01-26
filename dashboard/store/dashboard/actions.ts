import { ActionTree } from 'vuex'
import { RootState } from '@/store/state'
import { DashboardState } from '~/store/dashboard/state'

// ************ ACTIONS *************
const actions: ActionTree<DashboardState, RootState> = {
  async updateDashboardData ({ commit, dispatch }) {
    await Promise.all([
      dispatch('updateTokenDashboardData'),
      dispatch('updateAccountDashboardData')
    ])
    commit('FLAG_LOADED')
  },

  async updateTokenDashboardData ({ commit }) {
    const zeroAddress = '0x0000000000000000000000000000000000000000'
    const ustakeAddress = await this.$contracts.CZD.methods.ustake().call()
    const results = await Promise.all([
      this.$axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ampleforth&vs_currencies=usd'),
      this.$contracts.CZD.methods.totalSupply().call(),
      this.$contracts.CZD.methods.balanceOf(zeroAddress).call(),
      this.$contracts.CZD.methods.balanceOf(ustakeAddress).call(),
      this.$contracts.MonetaryPolicy.methods.nextRebaseTime().call()
    ])

    commit('SET_TOKEN_DATA', {
      marketPrice: results[0].data.ampleforth.usd,
      oraclePrice: '1.00',
      totalSupply: results[1],
      totalBurned: results[2],
      totalStaked: results[3],
      nextRebaseTimestamp: parseInt(results[4])
    })
  },

  async updateAccountDashboardData ({ commit, rootGetters }) {
    const isAccountConnected = rootGetters['accounts/isAccountConnected']
    if (isAccountConnected) {
      const address = rootGetters['accounts/getAddress']
      const results = await Promise.all([
        this.$contracts.CZD.methods.balanceOf(address).call(),
        this.$contracts.CZD.methods.getStakeBalance(address).call(),
        this.$contracts.CZD.methods.getUnstakeTime(address).call()
      ])

      commit('SET_ACCOUNT_DATA', {
        balance: results[0],
        staked: results[1],
        unstakeTimestamp: parseInt(results[2])
      })
    }
  },

  async stakeTokens ({ dispatch }, amount: string) {
    const transaction = this.$contracts.CZD.methods.stake(amount)
    await dispatch('dispatchTransaction', transaction, { root: true })
  },
  async unstakeTokens ({ dispatch }) {
    const transaction = this.$contracts.CZD.methods.unstake()
    await dispatch('dispatchTransaction', transaction, { root: true })
  },

  async rebase ({ dispatch }) {
    const transaction = this.$contracts.CZD.methods.rebase()
    await dispatch('dispatchTransaction', transaction, { root: true })
  }
}

export default actions
