<template>
  <v-card class="delfin elevation-0">

    <v-card-text>
      <h4 class="white--text mt-3">Поиск авиабилетов по всем направлениям</h4>

      <v-layout row wrap>
        <v-flex xs12 sm6 md3 class="pa-0 pr-1">
          <suggest v-model="departure" placeholder="Откуда" @done="focus('arrival')" ref="departure"></suggest>
        </v-flex>
        <v-flex xs12 sm6 md3 class="pa-0 pr-1">
          <suggest v-model="arrival" placeholder="Куда" @done="focus('date')" ref="arrival"></suggest>
        </v-flex>

        <v-flex xs12 sm3 md2 class="pa-0 pr-1">
          <flat-picker v-model="date" placeholder="Когда" @done="focus('date_return')" ref="date"></flat-picker>
        </v-flex>
        <v-flex xs12 sm3 md2 class="pa-0 pr-1">
          <flat-picker v-model="date_return" v-bind:minDate="date" placeholder="Обратно" ref="date_return"></flat-picker>
        </v-flex>
        <v-flex xs12 sm6 md2 class="pa-0 pr-1">
          <persons></persons>
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
</template>


<script>

  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';
  import FlatPicker from './FlatPicker';
  import Suggest from './Suggest';
  import Ticket from './Ticket';
  import Persons from './Persons';

  export default {
    components: { FlatPicker, Suggest, Ticket, Persons },
    data() {
      return {
        item: '',
        suggestions: []
      };
    },
    computed: {
      form () {
        return this.$store.state
      },
      departure : {
        get: function () {
          return this.$store.state.route.departure;
        },
        set: function (value) {
          this.$store.commit('setDeparture', value.code);
        }
      },
      arrival : {
        get: function () {
          return this.$store.state.route.arrival;
        },
        set: function (value) {
          this.$store.commit('setArrival', value.code);
        }
      },
      date : {
        get: function () {
          return this.$store.state.route.date;
        },
        set: function (value) {
          this.$store.commit('setDate', value);
        }
      },
      date_return : {
        get: function () {
          return this.$store.state.route.date_return;
        },
        set: function (value) {
          this.$store.commit('setDateReturn', value);
        }
      },
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
