import moment from 'moment';
import _ from 'lodash';

const state = {
  form: {
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
    aviaClass: 'A'
  },
  strict: process.env.NODE_ENV !== 'production'
};

const getters = {
  departure(st) {
    return st.form.route.departure;
  },
  arrival(st) {
    return st.form.route.arrival;
  },
  date(st) {
    return st.form.route.date;
  },
  date_return(st) {
    return st.form.route.date_return;
  },
  adults(st) {
    return st.form.adults;
  },
  kids(st) {
    return st.form.kids;
  },
  infants(st) {
    return st.form.infants;
  },
  aviaClass(st) {
    return st.form.aviaClass;
  },
  form(st) {
    return st.form;
  }
};

const mutations = {
  update(st, form) {
    st.form = _.merge(st.form, form);
//    st.form = Object.assign(st.form, form);
  }
};


export default {
  namespaced: true,
  state,
  getters,
  mutations
};
