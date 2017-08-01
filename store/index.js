import Vue from 'vue';
import Vuex from 'vuex';


import airports from './modules/airports';
import search from './modules/search';
import Persons from './modules/Persons';
import simpleForm from './modules/simpleForm';
import complexForm from './modules/complexForm';


Vue.use(Vuex);

const store = function () {
  return new Vuex.Store({
    state: {
    },
    modules: {
      airports,
      search,
      Persons,
      simpleForm,
      complexForm
    }
  });
};

export default store;
