<template v-once>
  <div class="ticket-route">
    <v-expansion-panel class="ticket-route__wrapper">
      <v-expansion-panel-content class="ticket-route__head-wrapper">
        <div class="ticket-route__head" slot="header">
          <div class="ticket-route__supplier-wrapper">
            <div class="ticket-route__icons">
              <img v-for="code in route.supplier_codes" :key="code" class="image"
                   :src="`//ai.travelstack.ru/logo/60/20/${code}.png`">
            </div>
          </div>
          <div class="ticket-route__airport-wrapper ticket-route__airport-wrapper_right">
            <div class="ticket-route__time">
              {{ route.departure_time.split(' ')[1] }}
              <span class="ticket-route__date"> {{ route.departure_time.split(' ')[0] }}</span>
            </div>
            <div class="ticket-route__from">
              {{ route.departure_city_name }}
            </div>
            <div class="ticket-route__from-label">
              {{ route.departure_airport_name || route.departure_city_name }} / {{route.departure_airport }}
            </div>
          </div>
          <div class="ticket-route__duration-wrapper">
            <div class="ticket-destination__duration">
              <div class="ticket-destination__nowrap">
                В пути: {{ route.route_duration | toHours}} ({{(route.segments.length === 1) ? 'Без пересадок' :
                (route.segments.length - 1 + $pluralize(route.segments.length - 1, ' пересадка', ' пересадки', ' пересадок'))}})
              </div>
            </div>
          </div>
          <div class="ticket-route__airport-wrapper">
            <div class="ticket-route__time">
              {{ route.arrival_time.split(' ')[1] }}
              <span class="ticket-route__date"> {{ route.arrival_time.split(' ')[0] }}</span>
            </div>
            <div class="ticket-route__from">
              {{ route.arrival_city_name }}
            </div>
            <div class="ticket-route__from">
              {{ route.arrival_airport_name || route.arrival_city_name }} / {{route.arrival_airport }}
            </div>
          </div>
        </div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <template v-for="(segment, index) in segments">
              <div class="ticket-route__layover-wrapper" v-if="index > 0">
                <div class="ticket-route__layover">
                  Длительность пересадки: {{ layover(index) | toHours }}
                </div>
              </div>

              <ticket-segment :segment="segment"></ticket-segment>
              <!--<div class="ticket-destination__layover-wrapper">-->
              <!--<div class="ticket-destination__layovers ticket__hide">-->
              <!--<template v-if="route.segments.length === 1">Без пересадок</template>-->
              <!--<template v-else>-->
              <!--{{ route.segments.length - 1-->
              <!--}} {{$pluralize(route.segments.length - 1, 'пересадка', 'пересадки', 'пересадок')}}-->
              <!--<span>{{ route.layover_duration | toHours }}</span>-->
              <!--</template>-->
              <!--</div>-->
              <!--</div>-->
            </template>

          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
  import moment from 'moment';
  import TicketSegment from './TicketSegment';

  export default {
    components: {TicketSegment},

    props: {
      route: {
        required: true
      }
    },
    data() {
      return {
        segments: this.route.segments
      }
    },
    methods: {
      layover(val) {
        const format = 'DD.MM.YYYY HH:mm';
        moment.lang('ru');
        moment.relativeTimeRounding(val => val);
        return moment(this.segments[val].departure_time, format).diff(moment(this.segments[val-1].arrival_time, format), 'minutes');
      }
    }
  };
</script>

<style lang="stylus">

  .ticket-route
    position: relative;

    .ticket-route

      &__head-wrapper .expansion-panel__header
        height 100%

      &__head
        display flex
        flex-wrap nowrap
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin: 10px 40px 10px 0;

      &__wrapper
        box-shadow none
        border none


      &__supplier-wrapper
      &__airport-wrapper
      &__duration-wrapper
      &__layover-wrapper
      &__price-wrapper
        padding: 5px
        box-sizing: border-box

      &__supplier-wrapper
        flex 0 0 100px

      &__layover
        padding: 16px;
        text-align: center;

      &__airport-wrapper
        flex 0 0 20%
        text-align left

        &_right
          text-align right

      &__duration-wrapper
        flex: 1 1 100%;
        text-align: center;

      &__icons
        width 100%

      &__time
        font-weight: 700
        font-size: 16px
        margin-right 5px
        white-space: nowrap
        position: relative
        /*padding-left: 25px*/

      &__from
        font-size: 16px;
        line-height: 1.2;

      &__from-label
        font-size: 13px;
        line-height: 1;


      &__date
        font-size: 70%
        font-weight: 100

</style>
