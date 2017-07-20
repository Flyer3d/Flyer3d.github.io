import axios from 'axios';
import * as types from '../mutation_types';

const state = {
  loading: false,
  items: []
};

const getters = {
  items(st) {
    return st.items;
  },
  loading(st) {
    return st.loading;
  }
};

const actions = {
  async suggest({ commit }, term) {
    commit(types.AIRPORTS_LOADING);
    try {
      const response = await axios.get('http://api.delfinchik.net/airports', { params: { q: term } });
      commit(types.AIRPORTS_LOADED, response.data);
    } catch (e) {
      commit(types.AIRPORTS_LOADED, []);
    }
  }
};

const mutations = {
  [types.AIRPORTS_LOADING](st) {
    st.loading = true;
  },
  [types.AIRPORTS_LOADED](st, items) {
    st.items = items;
    st.loading = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
