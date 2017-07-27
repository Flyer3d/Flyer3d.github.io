<template>
  <v-card class="delfin elevation-0 avia-form">

    <v-card-text>
      <h4 class="white--text mt-3">Поиск авиабилетов по всем направлениям</h4>

      <v-layout row wrap>
        <v-flex xs12 sm6 md3 class="pa-0 pr-1">
          <suggest v-model="departure" placeholder="Откуда" @done="focus('arrival')" @focus="departureError = false" ref="departure" :isError="departureError"></suggest>
        </v-flex>
        <v-flex xs12 sm6 md3 class="pa-0 pr-1">
          <suggest v-model="arrival" placeholder="Куда" @done="focus('date')" @focus="arrivalError = false" ref="arrival" :isError="arrivalError"></suggest>
        </v-flex>

        <v-flex xs12 sm3 md2 class="pa-0 pr-1">
          <flat-picker v-model="date" placeholder="Когда" @done="focus('date_return')" ref="date"></flat-picker>
        </v-flex>
        <v-flex xs12 sm3 md2 class="pa-0 pr-1">
          <flat-picker v-model="date_return" v-bind:minDate="date" :clear="true" placeholder="Только туда" ref="date_return"></flat-picker>
        </v-flex>
        <v-flex xs12 sm6 md2 class="pa-0 pr-1">
          <persons></persons>
        </v-flex>
      </v-layout>

      <div class="text-xs-center">
        <span v-tooltip:top=" { html: 'Заполните обязательные поля!', visible: !(departureError && arrivalError)} ">
        <v-btn large dark class="delfin avia-form__submit" @click.native="submit">
          <v-icon dark left>flight</v-icon>
          Найти авиабилеты
        </v-btn>
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>


<script>

  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import moment from 'moment';
  import FlatPicker from './FlatPicker';
  import Suggest from './Suggest';
  import Persons from './Persons';

  export default {
    components: { FlatPicker, Suggest, Persons },
    data() {
      return {
        item: '',
        suggestions: [],
        departureError: false,
        arrivalError: false
      };
    },
    computed: {
      ...mapGetters({
        storeDeparture: 'form/departure',
        storeArrival: 'form/arrival',
        storeDate: 'form/date',
        storeDateReturn: 'form/date_return',
        form: 'form/form'

      }),
      departure : {
        get: function () {
          return this.storeDeparture;
        },
        set: function (value) {
          this.updateForm({route: {departure: value.code}});
        }
      },
      arrival : {
        get: function () {
          return this.storeArrival;
        },
        set: function (value) {
          this.updateForm({route: {arrival: value.code}});
        }
      },
      date : {
        get: function () {
          return this.storeDate;
        },
        set: function (value) {
          this.updateForm({route: {date: value}});
        }
      },
      date_return : {
        get: function () {
          return this.storeDateReturn;
        },
        set: function (value) {
          this.updateForm({route: {date_return: value}});
        }
      },
    },
    methods: {
      validate(){
        let valid = true;
        if(!this.departure){
          valid = false;
          this.departureError = true;
        }
        if(!this.arrival){
          valid = false;
          this.arrivalError = true;
        }
        return valid;
      },
      changed() {
        this.suggest = this.suggest(this.value);
      },
      getLabel(item) {
        return item.name;
      },
      submit () {
        if(this.validate()){
          this.search(this.form);
        }
      },
      ...mapActions({
        search: 'search/load'
      }),
      ...mapMutations({
        updateForm: 'form/update'
      }),
      focus(control) {
        this.$refs[control] && this.$refs[control].$refs.control.focus();
        this.$refs[control] && this.$refs[control].$refs.control.$refs.input.focus();
        this.$refs[control] && this.$refs[control].$refs.control.$refs.input.click();
      }
    }
  };
</script>

<style lang="stylus">
  .avia-form

    & &__submit.theme--dark.btn--disabled:not(.btn--icon):not(.btn--flat)
      background: #ff9a0d !important;
      /*opacity: .7;*/
      color: #fff;

</style>
