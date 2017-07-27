<template>
  <v-layout class="suggest elevation-4 pt-1" v-bind:class="{suggest_error: isError, white: !isError}">
    <v-btn small icon absolute class="suggest__clear" v-show="val.display" @click.stop="clear()">
      <v-icon>close</v-icon>
    </v-btn>
    <v-menu
      ref="menu "
      :close-on-click="true"
      offset-y
      full-width
      bottom
      content-class="menu suggest__menu"
      :max-height="400"
      :max-width="400"
      :nudge-top="-5"
      :nudge-left="-12"
      transition="none"
      v-bind="showMenu"
    >
      <v-text-field
        ref="control"
        v-model="val.display"
        readonly
        autocomplete="off"
        full-width
        required
        single-line
        hide-details
        :placeholder="placeholder"
        slot="activator"
        class="suggest__input ma-1 pa-0"
        @focus="onFocus(val.display)"
        @blur="onBlur"
      ></v-text-field>
      <v-progress-linear v-bind:indeterminate="true" height="3" class="my-0 suggest__loading" warning v-show="loading"></v-progress-linear>
      <v-list two-line class="suggest__airports" >
        <v-list-tile v-for="item in items" :key="item.id" @click.native="select(item)">
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title>{{ ([item.country_name, item.city_name]).join(',') }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>{{ item.code }}</v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: ['value', 'placeholder', 'isError'],
    data() {
      return {
        showMenu:false,
        val: {
          airport: null,
          display: this.value && this.value.title
        },
        selected: null
      };
    },
    mounted() {
      this.suggest(this.val.display);
      console.log('Suggest mounted');
      console.dir(this.$refs.control.$refs.input)
      this.$refs.control.$refs.input.onblur = this.onBlur
    },
    computed: {
      ...mapGetters({
        items: 'airports/items',
        loading: 'airports/loading'
      })
    },
    watch: {
      'val.display': function () {
        if (document.activeElement === this.$refs.control.$refs.input) {
          this.suggest(this.val.display);
          this.$refs.menu.activate();
        }
      }
    },
    methods: {
      ...mapActions({
        suggest: 'airports/suggest'
      }),
      validate () {
        return Boolean(val.airport)
      },
      clear() {
        this.val = {
          airport: null,
          display: ''

        };
        this.$emit('input', {code: ''});
        this.$refs.control.focus();
        this.$refs.control.$refs.input.focus();
        this.$refs.control.$refs.input.click();
      },
      onFocus(val) {
        this.$refs.control.$refs.input.select();
        this.suggest(val);
        this.$emit('focus');
      },
      onBlur(){
        this.showMenu = false;
      },
      select(item) {
        this.val.airport = item;
        this.val.display = item.title;

        this.$emit('input', item);
        this.$refs.control.$refs.input.blur();

        this.$emit('done');
        this.$refs.menu.deactivate();
      }
    }
  }
</script>


<style lang="stylus">
  .suggest.suggest_error
    background: #ffcccc
    border 1px solid #FF4A4A

  .suggest
    margin: 18px 0
    padding-left: 8px
    position: relative


    &__clear
      right: 5px
      top: 8px
      z-index: 1000

    &__airports
      min-width: 400px

    &__loading
      position: absolute
      top: 0px
      left: 0


</style>
