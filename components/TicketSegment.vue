<template>
  <v-card class="ticket-segment">
    <div class="ticket-segment__header">
      <div class="ticket-segment__header-route">
        {{ segment.departure_city_name }} ({{ segment.departure_country }}) - {{ segment.arrival_city_name }} ({{ segment.departure_country }})
        <span class="ticket-segment__header-date"> {{ segment.departure_time.split(' ')[0] }}</span>
      </div>
      <div class="ticket-segment__flight">
        Рейс {{ segment.supplier_code }}–{{ segment.flight_number }}, {{ segment.supplier_name || segment.supplier }}  <br>
        Самолет: {{ segment.aircraft }}
      </div>
      <div class="ticket-segment__flight-time">
        В пути: {{ segment.flight_duration | toHours }}
      </div>
    </div>
    <div class="ticket-segment__route">
      <div class="ticket-segment__icon">
        <img class="image"
             :src="`//ai.travelstack.ru/logo/60/20/${segment.supplier_code}.png`">
      </div>
      <div class="ticket-segment__departure">
        <div class="ticket-segment__title">Вылет</div>
        <div class="ticket-segment__time">{{segment.departure_time}} <span class="ticket-segment_small">{{segment.departure_airport}}</span></div>
        <div class="ticket-segment__departure-airport">Аэропорт отправления: {{ segment.departure_airport_name }}
          <span v-if="segment.departure_terminal">, терминал {{segment.departure_terminal}}</span>
        </div>
        <div class="ticket-segment__departure-city">
          {{segment.departure_city_name}}, {{segment.departure_country_name}}
        </div>
      </div>
      <div class="ticket-segment__arrival">
        <div class="ticket-segment__title">Прилет</div>
        <div class="ticket-segment__time">{{segment.arrival_time}} <span class="ticket-segment_small">{{segment.arrival_airport}}</span></div>
        <div class="ticket-segment__arrival-airport">Аэропорт прибытия: {{ segment.arrival_airport_name }}
          <span v-if="segment.arrival_terminal">, терминал {{segment.arrival_terminal}}</span>
        </div>
        <div class="ticket-segment__arrival-city">
          {{segment.arrival_city_name}}, {{segment.arrival_country_name}}
        </div>

      </div>
    </div>
    <div class="ticket-segment__tariff">
      <div class="ticket-segment__tariff-title">
        Тариф: {{segment.service_class_type}}
      </div>
      <div class="ticket-segment__tarif-baggage">Багаж: {{segment.baggage}}</div>
    </div>
  </v-card>
</template>

<script>

  export default {

    props: {
      segment: {
        required: true
      }
    },
    methods: {
      showTariff() {
        console.log('SHOW TARIFF!!!!')
      }
    }
  };
</script>

<style lang="stylus">
  .ticket-segment
    margin -16px
    padding 16px
    border-top 2px solid #ccc

    .ticket-segment
      &__icon
        padding 10px
        flex 0 0 150px

      &__departure
      &__arrival
        flex 0 0 50%

      &_small
        font-weight: 200
        font-size: 80%

      &__header-route
        font-size 24px
        font-weight: 700

      &__header-date
        font-weight:200

      &__flight:before
        display: block
        margin-top 16px
        margin-bottom 8px
        content: 'Информация по рейсу'
        font-style italic
        font-size 80%
        border-bottom 1px solid #ccc

      &__route
        margin-top: 36px
        display flex
        position: relative
        flex-flow: row nowrap
        justify-content space-between
        align-items center

        &:before
          display: block
          position: absolute;
          top: -20px;
          width: 100%;
          margin-bottom 8px
          content: 'Информация по маршруту'
          font-style italic
          font-size 80%
          border-bottom 1px solid #ccc

      &__tariff
        margin-top: 16px
        &:before
          display: block
          margin-bottom 8px
          content: 'Информация по тарифу'
          font-style italic
          font-size 80%
          border-bottom 1px solid #ccc

</style>
