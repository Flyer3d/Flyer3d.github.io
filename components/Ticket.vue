<template>
  <div class="ticket" v-once>
    <div class="ticket__wrapper">
      <div class="ticket__content">

        <div class="ticket-destination" v-for="route in item.routes" v-bind:key="route.route_index">
          <div class="ticket-destination__head-wrapper">
            <div class="ticket-destination__head">
              <div class="ticket-destination__from-wrapper">
                <div class="ticket-destination__dir ticket__hidden">
                  Туда
                </div>
                <div class="ticket-destination__icons ticket__hide">
                  <img v-for="code in route.supplier_codes" :key="code" class="image" :src="`//ai.travelstack.ru/logo/60/20/${code}.png`" >
                </div>
              </div>
              <div class="ticket-destination__airport-wrapper">
                <div class="ticket-destination__begin-time">
                  {{ route.departure_time.split(' ')[1] }}
                </div>
                <div class="ticket-destination__from">
                  {{ route.departure_city }} ({{route.departure_airport }})
                </div>
              </div>
              <div class="ticket-destination__duration-wrapper">
                <div class="ticket-destination__duration ticket__hide">
                  <div class="ticket-destination__nowrap">
                    {{ route.route_duration }}
                  </div>
                </div>
              </div>
              <div class="ticket-destination__airport-wrapper">
                <div class="ticket-destination__end-time">
                  {{ route.arrival_time.split(' ')[1] }}
                </div>
                <div class="ticket-destination__to">
                  {{ route.arrival_city }} ({{route.arrival_airport }})
                </div>
              </div>
              <div class="ticket-destination__layover-wrapper">
                <div class="ticket-destination__layovers ticket__hide">
                  <template v-if="route.segments.length === 1">Без пересадок</template>
                  <template v-if="route.segments.length === 2">
                    {{ route.segments.length - 1 }} пересадка
                    <span>{{ route.layover_duration }}</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ticket__info">
        <div class="ticket__price">
          {{ item.amount.RUB }} руб.
        </div>
        <!--<div class="ticket__persons-big">-->
        <!--за двоих-->
        <!--</div>-->
      </div>
      <div class="ticket__toggle"></div>
    </div>
  </div>
</template>


<script>
  export default {
    props: ['item']
  };
</script>
