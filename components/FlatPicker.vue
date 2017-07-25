<template>
  <v-menu
    :close-on-content-click="false"
    ref="menu"
    v-model="menu"
    offset-y
    full-width
    bottom
    content-class="menu"
    :max-height="400"
    :max-width="308"
    :nudge-top="-1"
    :nudge-left="-0"
    transition="none"
  >
  <v-text-field
    ref="control"
    slot="activator"
    v-model="date"
    readonly
    class="date white pa-1 pt-2 pl-3 pb-0 elevation-4"
    :placeholder="placeholder"
    single-line
    hide-details
    full-width
  ></v-text-field>
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
      maxDate: [String, Date]
    },
    data() {
      return {
        menu: false,
        date: this.value,
        options: {
          onChange: this.onDateChange,
          defaultDate: this.value,
          minDate: this.minDate || moment().format('YYYY-MM-DD'),
          maxDate: this.maxDate || moment().add(360, 'days').format('YYYY-MM-DD'),
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
      date(val) {
        this.$emit('input', val);
        this.$emit('done', val);
      },
      minDate (val){
        this.fp.config.minDate = this.options.minDate = val;
        this.fp.redraw();
        if(moment(val).isAfter(this.value)){
          this.fp.setDate(val, true);
        } else {
          this.fp.setDate(this.value, true);
        }
      }
    },
    methods: {
      onDateChange(selectedDate, dateStr, instance){
        this.date = dateStr;
        this.menu = false;
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
