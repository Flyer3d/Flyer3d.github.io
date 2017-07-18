import Vue from 'vue';
import Vuex from 'vuex';

import airports from './modules/airports'

Vue.use(Vuex);

const store = function () {
  return new Vuex.Store({
    state: {},
    modules: {
      airports
    }
  });
}

export default store;
