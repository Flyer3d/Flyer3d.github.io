<template>
  <v-menu
    :close-on-content-click="false"
    ref="menu"
    v-model="menu"
    offset-y
    full-width
    bottom
    content-class="menu flat-picker__menu"
    :max-height="400"
    :max-width="308"
    :nudge-top="-1"
    :nudge-left="-0"
    transition="none"
  >
  <div slot="activator" class="flat-picker__input">
    <v-btn
      v-tooltip:left=" { html: 'Обратный билет не нужен', visible: clear && date} "
      small
      icon
      absolute
      class="flat-picker__clear" v-show="clear && date" @click.stop="clearDate()">
      <v-icon>close</v-icon>
    </v-btn>
  <v-text-field
    disabled
    readonly
    ref="control"
    v-model="date"
    readonly
    class="flat-picker__date pa-1 pt-2 pl-3 pb-0 elevation-4"
    v-bind:class="{'flat-picker_error': isError, white: !isError}"
    :placeholder="placeholder"
    single-line
    hide-details
    full-width
    @focus="onFocus(date)"
  >
  </v-text-field>
  </div>

    <v-card class="flat-picker__card">
    </v-card>
  </v-menu>
</template>

<script>
  /* eslint-disable global-require */

  import 'flatpickr/dist/themes/airbnb.css';
  import moment from 'moment';

  let flatpikr;
  if (process.BROWSER_BUILD) {
    flatpikr = require('flatpickr');
    const locale = require('flatpickr/dist/l10n/ru');
    flatpikr.localize(locale.ru);
  }

  export default {
    props: {
      value: {
        required: true
      },
      placeholder: String,
      minDate: [String, Date],
      maxDate: [String, Date],
      clear: {
        default: false
      },
     isError: Boolean
    },
    data() {
      return {
        changedInside: false,
        showClearButton: true,
        menu: false,
        date: this.value,
        options: {
          onChange: this.onDateChange,
          dateFormat: "d-m-Y",
          defaultDate: this.value,
          minDate: this.minDate || moment().format('DD-MM-YYYY'),
          maxDate: this.maxDate || moment().add(360, 'days').format('DD-MM-YYYY'),
          inline: true
        },
        fp: null
      };
    },
    mounted() {
      if(!this.fp) {
        this.fp = new flatpikr(this.$refs.menu.$refs.content.firstChild, this.options);
      }
    },
    watch: {
      minDate (val){
        this.fp.config.minDate = this.options.minDate = val;
        this.changedInside = true;
        this.fp.redraw();
        if(moment(val).isAfter(this.value)){
          this.fp.setDate(val, true);
        }
        this.changedInside = true;
      },
      menu (val) {
        if(val){
          this.$emit('active');
        }
      }
    },
    methods: {
      onDateChange(selectedDate, dateStr, instance){
        this.date = dateStr;
        this.$emit('input',dateStr);
        this.$emit('done', dateStr);
        if(this.changedInside){
          this.changedInside = false;
          return;
        }
        this.menu = false;
      },
      clearDate () {
        this.fp.setDate(null, true);
      },
      onBlur(){

        this.menu = false;
      },
      onFocus() {
        if(!this.date){
          this.changedInside = true;
          if(this.minDate) {
            this.fp.setDate(this.minDate, true);
          } else {
            this.fp.setDate(moment(), true);
          }
        }
        this.menu = true;
//        this.$refs.control.$refs.input.focus();

      }
    },

    date: {
      value: null,
      startDate: null,
      endDate: null
    }
  };
</script>

<style lang="stylus">
  .flat-picker_error
    background: #ffcccc
    border 1px solid #FF4A4A

  .flat-picker
    margin: 18px 0
    padding-left: 8px
    position: relative

    &__input
      position relative

    &__clear
      right: 5px
      top: 8px
      z-index 1000

    &__date.input-group--disabled.input-group
      position relative

    &__date.input-group--disabled.input-group input
      color: rgba(0,0,0,.87)


  .flatpickr-calendar
    border-radius: 0

    &.arrowTop:before
    &.arrowTop:after
      display: none

    .flatpickr-month
      padding: 8px 0
      height: 50px

    .flatpickr-prev-month
    .flatpickr-next-month
      line-height: 35px
</style>
