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
                    {{ route.route_duration | hoursFilter}}
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
                  <template v-else>
                    {{ route.segments.length - 1 }} пересадка
                    <span>{{ route.layover_duration | hoursFilter }}</span>
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
    props: ['item', 'count'],
    filters: {
      hoursFilter (val) {
        return (val >= 1440) ? Math.floor(val / 1440) + 'д ' + Math.floor((val % 1440) / 60) + 'ч ' + (val % 60) + 'м' : Math.floor(val / 60) + 'ч ' + (val % 60) + 'м';
      }
    },
    mounted(){
      console.log('\nItem!')
      console.dir(this.item)
      if(this.count === 1){
        console.log('Всего перелетов: %s', this.item.routes.length )
        console.log('Валюта: %s', this.item.currency )
        console.log('Цена: %s', this.item.amount[this.item.currency])
        console.log('\nSimple form:')
        this.item.routes.forEach(function(route, index){
          console.log('Маршрут перевозки %s', index)
          console.log('Маршрут перевозки %s (%s / %s) - %s (%s / %s)', route.departure_city_name, route.departure_airport_name, route.departure_airport, route.arrival_city_name, route.arrival_airport_name, route.arrival_airport)
          console.log('Вылет %s', route.departure_time)
          console.log('Прилет %s', route.arrival_time)
          console.log('В пути всего: %s', route.route_duration)
          console.log('Ожидание всего: %s', route.layover_duration)
          console.log('Багаж:');
          console.dir(route.baggage)
          console.log('Всего сегментов в пути: %s', route.segments.length)
          route.segments.forEach(function(segment, index){
            console.log('Сегмент %s', index);
            console.log('Самолет: %s', segment.aircraft)
            console.log('Перевозчик: %s', segment.supplier_name)
            console.log('Рейс: %s-%s', segment.supplier_code, segment.flight_number)
            console.log('Маршрут сегмента %s (%s / %s терминал %s) - %s (%s / %s терминал %s)', segment.departure_city_name, segment.departure_airport_name, segment.departure_airport, segment.departure_airport_terminal, segment.arrival_city_name, segment.arrival_airport_name, segment.arrival_airport, segment.arrival_airport_terminal)
            console.log('В пути сегмент: %s', segment.flight_duration)
            console.log('Вылет %s', segment.departure_time)
            console.log('Прилет %s', segment.arrival_time)
            console.log('Багаж: %s', segment.baggage);
          })
        })


      }
    },
    methods: {
      toHours (val) {
        return (val >= 1440) ? Math.floor(val / 1440) + 'д ' + Math.floor((val % 1440) / 60) + 'ч ' + (val % 60) + 'м' : Math.floor(val / 60) + 'ч ' + (val % 60) + 'м'
      }
    }
  };
</script>
