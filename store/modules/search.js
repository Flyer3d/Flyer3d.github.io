import axios from 'axios';
import moment from 'moment';
import qs from 'qs';
import { SEARCH_LOADING as LOADING, SEARCH_LOADED as LOADED } from '../mutation_types';


axios.defaults.paramsSerializer = function (params) {
  return qs.stringify(params, { encodeValuesOnly: true });
};

const state = {
  loading: false,
  session: null,
  items: []
};

const getters = {
  loading(store) {
    return store.loading;
  },
  items(store) {
    return store.items;
  },
  session(store) {
    return store.session;
  }
};

const actions = {
  async load({ commit }, { type, route, adults, kids, infants, aviaClass:service_class }) {
    const queryParams = {
      destinations: [],
      adults,
      kids,
      infants,
      service_class
    };
    if (type === 'simple') {
      queryParams.destinations.push({
        departure: route.departure,
        arrival: route.arrival,
        date: moment(route.date).format('DD-MM-YYYY')
      });

      if (route.date_return) {
        queryParams.destinations.push({
          departure: route.arrival,
          arrival: route.departure,
          date: moment(route.date_return).format('DD-MM-YYYY')
        });
      }
    }

    commit(LOADING);
    try {
      console.log('Searching in [http://api.delfinchik.net/search]. Params:');
      console.dir(queryParams);
      const response = await axios.get(
        'http://api.delfinchik.net/search',
        { params: queryParams }
      );
      console.log('Search/load!');
      console.dir(response);
      commit(LOADED, response.data);
    } catch (e) {
      console.log('Search/LOADED ERROR!!');
      console.dir(e);
      commit(LOADING, []);
    }
  }
};

const mutations = {
  [LOADING](st) {
    st.loading = true;
  },
  [LOADED](st, response) {
    console.log('Search/LOADED!');
    console.dir(response);
    const items = response.recommendations;

    items.forEach(function (item) {
      item.routes.forEach(function (route) {
        route.supplier_codes = Array.from(new Set(
          route.segments.map(s => s.supplier_code)
        ));

        route.baggage = Array.from(new Set(
          route.segments.map(s => s.baggage)
        ));

        route.layover_duration = route.route_duration -
          route.segments.reduce((total, segment) => total + segment.flight_duration, 0);

        const first = 0;
        const last = route.segments.length - 1;

        route.departure_country = route.segments[first].departure_country;
        route.departure_country_name = route.segments[first].departure_country_name;
        route.departure_city = route.segments[first].departure_city;
        route.departure_city_name = route.segments[first].departure_city_name;
        route.departure_airport = route.segments[first].departure_airport;
        route.departure_airport_name = route.segments[first].departure_airport_name;
        route.departure_time = route.segments[first].departure_time;

        route.arrival_country = route.segments[first].arrival_country;
        route.arrival_country_name = route.segments[first].arrival_country_name;
        route.arrival_city = route.segments[last].arrival_city;
        route.arrival_city_name = route.segments[last].arrival_city_name;
        route.arrival_airport = route.segments[last].arrival_airport;
        route.arrival_airport_name = route.segments[last].arrival_airport_name;
        route.arrival_time = route.segments[last].arrival_time;
      });
    });

    st.items = items;

    st.session = response.session;
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
