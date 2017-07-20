import axios from 'axios';
import { AIRPORTS_LOADING, AIRPORTS_LOADED } from '../mutation_types';

const state = {
  loading: true
};

const getters = {
  loading(store) {
    return store.loading;
  }
};

const actions = {
  async load({ commit }, term) {
    commit(AIRPORTS_LOADING);
    try {
      const response = await axios.get(
        'http://api.delfinchik.net/airports',
        { params: { q: term } }
      );
      commit(AIRPORTS_LOADED, response.data);
    } catch (e) {
      commit(AIRPORTS_LOADED, []);
    }
  }
};

const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations
};
