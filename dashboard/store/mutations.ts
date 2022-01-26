import { MutationTree } from 'vuex'
import { RootState } from '~/store/state'

// ************ FUNCTIONS *************
const mutations: MutationTree<RootState> = {
  REFRESH_NOW (state) {
    state.now = Math.round((new Date()).getTime() / 1000)
  }
}

export default mutations
