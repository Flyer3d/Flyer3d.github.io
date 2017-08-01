import moment from 'moment';
import _ from 'lodash';

const state = {
  form: {
    route: [],
    type: 'complex'
  },
  strict: process.env.NODE_ENV !== 'production'
};

const getters = {

  form: st => st.form,
  routes: st => st.form.route,
  routesCount: st => st.form.route.length,
  getRouteByNumber: (st, getters) => (num) => {
    return st.form.route[num];
  }
};

const mutations = {
  addRoute(st, route = {}) {
    const newRoute = Object.assign({
      departure: '',
      departureName: '',
      arrival: '',
      arrivalName: '',
      date: null,
      minDate: (st.form.route.length > 0) ? st.form.route[st.form.route.length - 1].date : null
    }, route);
    st.form.route.push(newRoute);
  },
  deleteLastRoute(st) {
    if (st.form.route.length <= 1) {
      return false;
    }
    st.form.route.pop();
    return true;
  },
  updateRouteByNumber(st, payload) {
    const n = payload && payload.n;
    const route = payload && payload.route;
    if (!(route && (n >= 0) && (n < st.form.route.length))) {
      return false;
    }
    st.form.route[n] = _.merge(st.form.route[n], route);
    if (route.date && (n < st.form.route.length - 1)) {
      st.form.route[n + 1].minDate = route.date;
    }
    return true;
  }
};


export default {
  namespaced: true,
  state,
  getters,
  mutations
};
