import axios from 'axios';
import { AIRPORTS_LOADING as LOADING, AIRPORTS_LOADED as LOADED } from '../mutation_types';

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
    commit(LOADING);
    try {
      const response = await axios.get('http://api.delfinchik.net/airports', { params: { q: term } });
      commit(LOADED, response.data);
    } catch (e) {
      commit(LOADED, []);
    }
  }
};

const mutations = {
  [LOADING](st) {
    st.loading = true;
  },
  [LOADED](st, items) {
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
