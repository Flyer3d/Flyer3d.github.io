<template>
  <v-card class="delfin elevation-0 avia-form">

    <v-card-text>
      <h4 class="white--text mt-3">Поиск авиабилетов по всем направлениям</h4>
      <div white v-html="toggleText" @click="toggleForm">
      </div>
        <keep-alive>
          <component ref="form" :is="currentForm">
          </component>
        </keep-alive>
      <div class="text-xs-center">
        <v-btn large dark class="delfin avia-form__submit" @click.native="submit" :loading="searchLoading" :disabled="searchLoading">
          <v-icon dark left>flight</v-icon>
          Найти авиабилеты
          <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>


<script>

  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';
  import _ from 'lodash';
  import SimpleRouteForm from './SimpleRouteForm';
  import ComplexRouteForm from './ComplexRouteForm';

  export default {
    components: { SimpleRouteForm, ComplexRouteForm },
    data() {
      return {
        currentForm: 'SimpleRouteForm',
        toggleText: 'Составной маршрут'
      }
    },
    computed: {
      ...mapGetters({
        persons: 'Persons/form',
        simpleForm: 'simpleForm/form',
        complexForm: 'complexForm/form',
        searchLoading: 'search/loading'
      })
    },
    methods: {
      validate(){
        return this.$refs.form.validate();
      },
      toggleForm () {
        if(this.currentForm === 'SimpleRouteForm') {
          this.toggleText = 'Простой маршрут';
          this.currentForm = 'ComplexRouteForm';
        } else {
          this.toggleText = 'Составной маршрут';
          this.currentForm = 'SimpleRouteForm';
        }
      },
      submit () {
        if(this.validate()){
          this.search(_.merge(this.$refs.form.getForm(), this.persons));
        }
      },
      ...mapActions({
        search: 'search/load'
      })
    }
  }
</script>

<style lang="stylus">
  .avia-form

    & &__submit.theme--dark.btn--disabled:not(.btn--icon):not(.btn--flat)
      background: #ff9a0d !important;
      opacity: .7;
      color: #fff;

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
