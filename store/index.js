import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

import airports from './modules/airports';
import search from './modules/search';


Vue.use(Vuex);

const store = function () {
  const classList = ['Эконом', 'Комфорт', 'Бизнес'];
  return new Vuex.Store({
    state: {
      route: {
        departure: 'MOW',
        arrival: 'LED',
        date: moment().add(15, 'days').format('YYYY-MM-DD'),
        date_return: moment().add(25, 'days').format('YYYY-MM-DD')
      },
      type: 'simple',
      adults: 2,
      kids: 0,
      infants: 0,
      aviaClass: 'Эконом',
      strict: process.env.NODE_ENV !== 'production'
    },
    modules: {
      airports,
      search
    },
    mutations: {
      setAviaClass(state, newClass) {
        if (classList.indexOf(newClass) === -1) {
          console.warn('Store.setAviaClass bad argument!');
          return;
        }
        state.aviaClass = newClass;
      },
      setDeparture(state, value) {
        state.route.departure = value;
      },
      setArrival(state, value) {
        state.route.arrival = value;
      },
      setDate(state, value) {
        state.route.date = value;
      },
      setDateReturn(state, value) {
        state.route.date_return = value;
      },
      adultsIncrement(state) {
        if (state.adults >= 9) return;
        state.adults += 1;
      },
      adultsDecrement(state) {
        if (state.adults <= 1) return;
        state.adults -= 1;
      },
      kidsIncrement(state) {
        if (state.kids >= 9) return;
        state.kids += 1;
      },
      kidsDecrement(state) {
        if (state.kids <= 0) return;
        state.kids -= 1;
      },
      infantsIncrement(state) {
        if (state.infants >= 9) return;
        state.infants += 1;
      },
      infantsDecrement(state) {
        if (state.infants <= 0) return;
        state.infants -= 1;
      }
    }
  });
};

export default store;
