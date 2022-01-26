import { ActionTree } from 'vuex'
import { RootState } from '~/store/state'

const actions: ActionTree<RootState, RootState> = {
  refreshNow ({ commit }) {
    commit('REFRESH_NOW')
  },

  async dispatchTransaction ({ dispatch, rootGetters }, transaction) {
    const postTransaction = () => {
      setTimeout(async () => {
        await Promise.all([
          dispatch('updateAccount'),
          dispatch('updateDashboardData')
        ])
      }, 1000)
    }

    try {
      const address = rootGetters['accounts/getAddress']
      await transaction.send({ from: address })

      await postTransaction()
    } catch (e) {
      await postTransaction()
    }
  }
}

export default actions
