import axios from 'axios'
import * as types from '../mutation_types'

const state = {
  loading: false,
  items: []
}

const getters = {
  items (state) {
    return state.items
  },
  loading (state) {
    return state.loading
  }
}

const actions = {
  async suggest ({commit}, term) {
    commit(types.AIRPORTS_LOADING)
    try {
      const response = await axios.get('http://api.delfinchik.net/airports', {params: {q: term}})
      commit(types.AIRPORTS_LOADED, response.data)
    } catch (e) {
      commit(types.AIRPORTS_LOADED, [])
    }
  }
}

const mutations = {
  [types.AIRPORTS_LOADING] (state) {
    state.loading = true
  },
  [types.AIRPORTS_LOADED] (state, items) {
    state.items = items
    state.loading = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
