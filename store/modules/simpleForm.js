import moment from 'moment';
import _ from 'lodash';

const state = {
  form: {
    route: {
      departure: '',
      departureName: '',
      arrival: '',
      arrivalName: '',
      date: moment().add(15, 'days').format('YYYY-MM-DD'),
      date_return: moment().add(25, 'days').format('YYYY-MM-DD')
    },
    type: 'simple'
  },
  strict: process.env.NODE_ENV !== 'production'
};

const getters = {
  departure: st => st.form.route.departure,
  departureName: st => st.form.route.departureName,
  arrival: st => st.form.route.arrival,
  arrivalName: st => st.form.route.arrivalName,
  date: st => st.form.route.date,
  date_return: st => st.form.route.date_return,
  form: st => st.form
};

const mutations = {
  update(st, form) {
    st.form = _.merge(st.form, form);
  }
};


export default {
  namespaced: true,
  state,
  getters,
  mutations
};
