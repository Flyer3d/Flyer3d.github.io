<template>
  <v-layout row wrap class="complex-form">
    <v-flex
      md12
      v-for="index in routesCount"
      class="complex-form__route"
    >
      <route-form
        ref="form"
        v-bind:index="index - 1"
        v-bind:key="index"
      ></route-form>
      <v-btn
        fab
        dark
        small
        secondary
        v-show="(index > 1) && (index === routesCount)"
        class="complex-form__remove-btn"
        @click="removeRoute">
        <v-icon dark small>remove</v-icon>
      </v-btn>
    </v-flex>

    <v-flex xs12 sm8 md8 class="pa-0 pr-1">
      <v-btn
        outline
        block
        flat
        dark
        class="complex-form__add-btn"
        :disabled="routesCount > 6"
        @click="addRoute({departure: nRoute(routesCount - 1).arrival, departureName: nRoute(routesCount - 1).arrivalName})">
        <v-icon dark>add</v-icon>
        Добавить перелет
      </v-btn>
    </v-flex>
    <v-flex xs12 sm4 md4 class="pa-0 pr-1">
      <persons></persons>
    </v-flex>
  </v-layout>
</template>
<script>

  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import moment from 'moment';
  import RouteForm from './RouteForm';
  import Persons from './Persons';

  export default {
    components: { RouteForm, Persons },
    data() {
      return {
        now: moment().format('YYYY-MM-DD')
      };
    },
    computed: {
      ...mapGetters({
        simpleDeparture: 'simpleForm/departure',
        simpleDepartureName: 'simpleForm/departureName',
        simpleArrival: 'simpleForm/arrival',
        simpleArrivalName: 'simpleForm/arrivalName',
        simpleDate: 'simpleForm/date',
        routes: 'complexForm/routes',
        form: 'complexForm/form',
        nRoute: 'complexForm/getRouteByNumber',
        routesCount: 'complexForm/routesCount'
      })
    },
    created () {
      if(this.routesCount > 0) return;
      this.addRoute({
        departure: this.simpleDeparture,
        departureName: this.simpleDepartureName,
        arrival: this.simpleArrival,
        arrivalName: this.simpleArrivalName,
        date: this.simpleDate
      });
      this.addRoute({
        departure: this.simpleArrival,
        departureName: this.simpleArrivalName,
        arrival: '',
        arrivalName: '',
        date: null
      });

    },
    methods: {
      getForm () {
        return this.form;
      },
      validate () {
        const forms = this.$refs.form;
        let res = true;
        forms && forms.forEach(function(item, index){
          let itemRes = item.validate();
          res = res && itemRes;
        });
        return res;
      },
      ...mapMutations({
        removeRoute: 'complexForm/deleteLastRoute',
        addRoute: 'complexForm/addRoute'
      })
    }
  };
</script>

<style lang="stylus">

  .complex-form__route
    position: relative;

  .complex-form__remove-btn
    position: absolute;
    right: -20px;
    top: 38px;
    z-index: 100;

  .complex-form__add-btn
    height 44px
    margin-top 18px

</style>
