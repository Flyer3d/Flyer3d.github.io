import _ from 'lodash';

const state = {
  form: {
    adults: 2,
    kids: 0,
    infants: 0,
    aviaClass: 'A'
  },
  strict: process.env.NODE_ENV !== 'production'
};

const getters = {
  adults: st => st.form.adults,
  kids: st => st.form.kids,
  infants: st => st.form.infants,
  aviaClass: st => st.form.aviaClass,
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
