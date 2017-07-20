import Vue from 'vue';
import Vuex from 'vuex';

import airports from './modules/airports';
import search from './modules/search';

Vue.use(Vuex);

const store = function () {
  return new Vuex.Store({
    state: {},
    modules: {
      airports,
      search
    }
  });
};

export default store;
