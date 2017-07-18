<template>
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
</template>

<script>
  import 'flatpickr/dist/themes/airbnb.css'
  import moment from 'moment'

  let flatpikr;
  if (process.BROWSER_BUILD) {
    flatpikr = require('flatpickr')
    const locale = require('flatpickr/dist/l10n/ru')
    flatpikr.localize(locale.ru)
  }

  export default {
    props: {
      value: {
        required: true
      },
      placeholder: String,
      minDate: [String, Date],
      maxDate: [String, Date],
    },
    data () {
      return {
        date: this.value,
        options: {
          minDate: this.minDate || moment().format('YYYY-MM-DD'),
          maxDate: this.maxDate || moment().add(360, 'days').format('YYYY-MM-DD')
        }
      }
    },
    mounted () {
      flatpikr(this.$refs.control.$refs.input, this.options)
    },
    watch: {
      date(val) {
        this.$emit('input', val)
        this.$emit('done', val)
      }
    },
    date: {
      value: null,
      startDate: null,
      endDate: null
    }
  }
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
