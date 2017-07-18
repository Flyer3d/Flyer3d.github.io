<template>
  <main>
    <v-container fluid>

      <h2>Поиск авиабилетов по всем направлениям</h2>
      <v-card class="delfin elevation-0">

        <v-card-text>

          <v-layout row wrap>
            <v-flex xs12 sm6 md3>
              <suggest v-model="form.route.departure" placeholder="Откуда" @done="focus('arrival')" ref="departure"></suggest>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <suggest v-model="form.route.arrival" placeholder="Куда" @done="focus('date')" ref="arrival"></suggest>
            </v-flex>

            <v-flex xs12 sm6 md3>
              <flat-picker v-model="form.route.date" placeholder="Когда" @done="focus('date_return')" ref="date"></flat-picker>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <flat-picker v-model="form.route.date_return" placeholder="Обратно" ref="date_return"></flat-picker>
            </v-flex>
          </v-layout>

          <div class="text-xs-center">
            <v-btn large dark class="delfin">
              <v-icon dark left>flight</v-icon>
              Найти авиабилеты
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </main>
</template>

<script>

  import { mapActions } from 'vuex'
  import moment from 'moment'
  import FlatPicker from '~components/FlatPicker'
  import Suggest from '~components/Suggest'

  export default {
    components: {FlatPicker, Suggest},
    asyncData () {
      return {
        search: null,
        sidebar: false
      }
    },
    data () {
      return {
        form: {
          route: {
            departure: null,
            arrival: null,
            date: moment().format('YYYY-MM-DD'),
            date_return: null
          },
          adults: 2,
          kids: 0,
          infants: 0
        },
        e3: null,
        item: '',
        suggestions: []
      }
    },
    methods: {
      datesFrom (date) {
        console.log(date)
        return moment(date).isSameOrAfter(moment(), 'day')
      },
      changed () {
        this.suggest = this.suggest(this.value)
      },
      getLabel (item) {
        return item.name
      },
      ...mapActions({
        suggest: 'airports/suggest'
      }),
      focus (control) {
        try {
          this.$refs[control] && this.$refs[control].$refs.control.focus()
          this.$refs[control] && this.$refs[control].$refs.control.$refs.input.focus()
          this.$refs[control] && this.$refs[control].$refs.control.$refs.input.click()
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    padding-left: 20px;
  }

  .ololo {
    border: 1px solid red;
  }


</style>
