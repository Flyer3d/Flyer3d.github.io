<template>
  <v-layout row wrap>
    <v-flex xs12 sm4 md4 class="pa-0 pr-1">
      <suggest v-model="departure" placeholder="Откуда" @done="focus('arrival')" @focus="departureError = false" ref="departure" :isError="departureError"></suggest>
    </v-flex>
    <v-flex xs12 sm4 md4 class="pa-0 pr-1">
      <suggest v-model="arrival" placeholder="Куда" @done="focus('date')" @focus="arrivalError = false" ref="arrival" :isError="arrivalError"></suggest>
    </v-flex>

    <v-flex xs12 sm4 md4 class="pa-0 pr-1">
      <flat-picker v-model="date" placeholder="Когда" v-bind:minDate="minDate" @active="dateError = false" ref="date" :isError="dateError"></flat-picker>
    </v-flex>
  </v-layout>
</template>

<script>

  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import FlatPicker from './FlatPicker';
  import Suggest from './Suggest';


  export default {
    components: { FlatPicker, Suggest },
    props: {
      index: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        departureError: false,
        arrivalError: false,
        dateError: false
      };
    },
    computed: {
      ...mapGetters({
        routesCount: 'complexForm/routesCount',
        route: 'complexForm/getRouteByNumber',
      }),
      departure : {
        get: function () {
          return {code: this.route(this.index).departure, title: this.route(this.index).departureName};

        },
        set: function (value) {
          this.updateRoute({n: this.index, route: {departure: value.code, departureName: value.title}});
        }
      },
      arrival : {
        get: function () {
          return {code: this.route(this.index).arrival, title: this.route(this.index).arrivalName};
        },
        set: function (value) {
          this.updateRoute({n: this.index, route: {arrival: value.code, arrivalName: value.title}});
        }
      },
      date : {
        get: function () {
          return this.route(this.index).date;
        },
        set: function (value) {
          this.updateRoute({n: this.index, route: {date: value}});
        }
      },
      minDate: function () {
        return this.route(this.index).minDate;
      }
    },

    methods: {
      validate () {
        let valid = true;
        if(!this.departure.code){
          valid = false;
          this.departureError = true;
        }
        if(!this.arrival.code){
          valid = false;
          this.arrivalError = true;
        }
        if(!this.date){
          valid = false;
          this.dateError = true;
        }
        return valid;
      },
      ...mapMutations({
        updateRoute: 'complexForm/updateRouteByNumber',
        removeSelf: 'complexForm/deleteLastRoute'
      }),
      focus(control) {
        this.$refs[control] && this.$refs[control].$refs.control.focus();
        this.$refs[control] && this.$refs[control].$refs.control.$refs.input.focus();
        this.$refs[control] && this.$refs[control].$refs.control.$refs.input.click();
      }
    }
  };
</script>


