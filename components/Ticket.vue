<template>
  <v-card class="ticket">
    <v-layout class="ticket__wrapper">
      <v-flex md10>
        <template v-for="route in routes">
          <v-divider v-if="route.route_index > 0" dark></v-divider>
          <ticket-route :route="route" :key="route.route_index" class="ticket__route"></ticket-route>
        </template>

        <v-dialog v-model="dialog" lazy absolute width="400" class="ticket__dialog" contentClass="ticket__dialog-wrapper">
          <div class="ticket__tariff" slot="activator">
            <span class="ticket__tariff-link" @click="showTariff">Подробная информация по тарифу</span>
          </div>
          <v-card>
            <v-card-title>
              <div class="ticket__dialog-title">Правила тарифа:</div>
            </v-card-title>
            <v-card-text v-if="!tariffLoad" class="ticket__dialog-loading">
              Загружаем тарифы
              <div>
                <span slot="loader" class="tariff-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </div>
            </v-card-text>
            <v-card-text v-else >
              <v-tabs dark fixed centered>
                <v-tabs-bar slot="activators">
                  <v-tabs-slider></v-tabs-slider>
                  <v-tabs-item
                    v-for="(tarif, i) in tarifs"
                    :key="i"
                    :href="'#tab-' + i"
                  >
                    {{ tarif.departure }} – {{ tarif.arrival }}
                  </v-tabs-item>
                </v-tabs-bar>
                <v-tabs-content
                  v-for="(tarif, i) in tarifs"
                  :key="i"
                  :id="'tab-' + i"
                >
                  <v-card flat>
                    <v-card-text>Возможность возврата до: {{ tarif.cancellation.before ? 'ДА': 'НЕТ' }}, после: {{ tarif.cancellation.after ? 'ДА': 'НЕТ' }}</v-card-text>
                    <v-card-text>Возможность обмена до: {{ tarif.change.before ? 'ДА': 'НЕТ' }}, после: {{ tarif.change.after ? 'ДА': 'НЕТ' }}</v-card-text>
                    <v-card-text v-html="tarif.text"></v-card-text>
                  </v-card>
                </v-tabs-content>
              </v-tabs>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Закрыть</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex md2 class="ticket__info">
        <div class="ticket__price">
          {{ item.amount.RUB }} руб.
        </div>
        <v-btn block @click.native="buy">Купить!</v-btn>
        <div class="ticket__label">
        </div>
      </v-flex>
    </v-layout>

  </v-card>
</template>


<script>
  import axios from 'axios'
  import _ from 'lodash'

  import TicketRoute from './TicketRoute';

  export default {

    components: { TicketRoute},
    props: ['item', 'count', 'session'],
    data () {
      return {
        routes: this.item.routes,
        dialog: false,
        tariffLoad: false,
        tariff: []
      }
    },
    computed: {
      tarifs () {
        return this.tariff;
      }
    },
    mounted(){

//      if(this.count === 1){
//        console.log('\nItem!')
//        console.dir(this.item)
////        console.log('Всего перелетов: %s', this.item.routes.length )
////        console.log('Валюта: %s', this.item.currency )
////        console.log('Цена: %s', this.item.amount[this.item.currency])
////        console.log('\nSimple form:')
////        this.item.routes.forEach(function(route, index){
////          console.log('Маршрут перевозки %s', index)
////          console.log('Маршрут перевозки %s (%s / %s) - %s (%s / %s)', route.departure_city_name, route.departure_airport_name, route.departure_airport, route.arrival_city_name, route.arrival_airport_name, route.arrival_airport)
////          console.log('Вылет %s', route.departure_time)
////          console.log('Прилет %s', route.arrival_time)
////          console.log('В пути всего: %s', route.route_duration)
////          console.log('Ожидание всего: %s', route.layover_duration)
////          console.log('Багаж:');
////          console.dir(route.baggage)
////          console.log('Всего сегментов в пути: %s', route.segments.length)
////          route.segments.forEach(function(segment, index){
////            console.log('Сегмент %s', index);
////            console.log('Самолет: %s', segment.aircraft)
////            console.log('Перевозчик: %s', segment.supplier_name)
////            console.log('Рейс: %s-%s', segment.supplier_code, segment.flight_number)
////            console.log('Маршрут сегмента %s (%s / %s терминал %s) - %s (%s / %s терминал %s)', segment.departure_city_name, segment.departure_airport_name, segment.departure_airport, segment.departure_airport_terminal, segment.arrival_city_name, segment.arrival_airport_name, segment.arrival_airport, segment.arrival_airport_terminal)
////            console.log('В пути сегмент: %s', segment.flight_duration)
////            console.log('Вылет %s', segment.departure_time)
////            console.log('Прилет %s', segment.arrival_time)
////            console.log('Багаж: %s', segment.baggage);
////          })
////        })
//      }
    },
    methods: {
      buy () {

      },
      showTariff() {
        var that = this;
        if(!this.tariffLoad){
          console.log(`Loading: http://api.delfinchik.net/fare_conditions/${this.session.id}/${this.item.id}`)
          axios({
            url: `http://api.delfinchik.net/fare_conditions/${this.session.id}/${this.item.id}`,
          }).then((res) => {
              console.log('Axios res!')
              console.dir(res.data)
              that.tariffLoad = true;
              that.tariff = res.data.fare_conditions
            });
        }

      }
    }
  }
</script>

<style lang="stylus">
  .ticket__dialog-wrapper
    min-width 60%

  .ticket__dialog-title
    text-align center
    width:100%
    border-bottom 1px solid #ccc
    font-size: 24px
    font-weight: 700

  .ticket__dialog-loading
    text-align: center
    vertical-align middle
    height: auto

  .ticket
    font-size: 14px
    position: relative
    padding: 10px 0
    background: #ffffff
    margin: 0
    color: #000000
    .ticket
      &__route:nth-child( n + 2 )
        margin-top 20px

      &__wrapper
        padding 10px

      &__info
        align-self: center

      &__tariff
        padding: 16px 16px 0 16px;
        text-align: center;

      &__tariff-link
        width auto
        cursor pointer
        color #66aaff
        border-bottom 1px dashed #66aaff

      &__dialog
        width 100%



  .tariff-loader {
    animation: loader 1s infinite;
    display: inline-block
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
