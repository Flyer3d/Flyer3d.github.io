<template>
  <main>
    <v-container fluid>

      <v-card class="delfin elevation-0">

        <v-card-text>
          <h4 class="white--text mt-3">Поиск авиабилетов по всем направлениям</h4>

          <v-layout row wrap>
            <v-flex xs12 sm6 md3 class="pa-0 pr-1">
              <suggest v-model="form.route.departure" placeholder="Откуда" @done="focus('arrival')" ref="departure"></suggest>
            </v-flex>
            <v-flex xs12 sm6 md3 class="pa-0 pr-1">
              <suggest v-model="form.route.arrival" placeholder="Куда" @done="focus('date')" ref="arrival"></suggest>
            </v-flex>

            <v-flex xs12 sm6 md3 class="pa-0 pr-1">
              <flat-picker v-model="form.route.date" placeholder="Когда" @done="focus('date_return')" ref="date"></flat-picker>
            </v-flex>
            <v-flex xs12 sm6 md3 class="pa-0 pr-1">
              <flat-picker v-model="form.route.date_return" placeholder="Обратно" ref="date_return"></flat-picker>
            </v-flex>
          </v-layout>

          <div class="text-xs-center">
            <v-btn large dark class="delfin" @click.native="search(form)">
              <v-icon dark left>flight</v-icon>
              Найти авиабилеты
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
      <v-progress-linear v-bind:indeterminate="true" :height="5" warning class="mt-0" v-show="searchLoading"></v-progress-linear>


      <ticket v-for="item in searchResults" v-bind:key="item.id" :item="item"></ticket>

    </v-container>



  </main>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';
  import FlatPicker from '~components/FlatPicker';
  import Suggest from '~components/Suggest';
  import Ticket from '~components/Ticket';

  export default {
    components: { FlatPicker, Suggest, Ticket },
    data() {
      return {
        form: {
          route: {
            departure: 'MOW',
            arrival: 'PAR',
            date: moment().add(15, 'days').format('YYYY-MM-DD'),
            date_return: moment().add(25, 'days').format('YYYY-MM-DD')
          },
          type: 'simple',
          adults: 2,
          kids: 0,
          infants: 0
        },
        e3: null,
        item: '',
        suggestions: []
      };
    },
    computed: {
      ...mapGetters({
        searchLoading: 'search/loading',
        searchResults: 'search/items'
      })
    },
    methods: {
      datesFrom(date) {
        return moment(date).isSameOrAfter(moment(), 'day');
      },
      changed() {
        this.suggest = this.suggest(this.value);
      },
      getLabel(item) {
        return item.name;
      },
      ...mapActions({
        search: 'search/load'
      }),
      focus(control) {
        this.$refs[control] && this.$refs[control].$refs.control.focus();
        this.$refs[control] && this.$refs[control].$refs.control.$refs.input.focus();
        this.$refs[control] && this.$refs[control].$refs.control.$refs.input.click();
      }
    }
  };
</script>
