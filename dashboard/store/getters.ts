import { GetterTree } from 'vuex'
import { RootState } from '~/store/state'

const getters: GetterTree<RootState, RootState> = {
  getNow (state) {
    return state.now
  }
}

export default getters
