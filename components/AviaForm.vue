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
          <flat-picker v-model="date_return" v-bind:minDate="date" :clear="true" placeholder="Только туда" ref="date_return"></flat-picker>
        </v-flex>
        <v-flex xs12 sm6 md2 class="pa-0 pr-1">
          <persons></persons>
        </v-flex>
      </v-layout>

      <div class="text-xs-center">
        <span v-tooltip:top=" { html: 'Заполните обязательные поля!', visible: !(storeDeparture && storeArrival)} ">
        <v-btn large dark class="delfin" @click.native="search(form)" v-bind:disabled="!(storeDeparture && storeArrival)">
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
        suggestions: []
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
      changed() {
        this.suggest = this.suggest(this.value);
      },
      getLabel(item) {
        return item.name;
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
