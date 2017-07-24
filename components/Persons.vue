<template>
  <v-layout class="persons white elevation-4 pt-1">

    <v-menu
      :close-on-content-click="false"
      v-model="menu"
      ref="menu"
      offset-y
      full-width
      bottom
      right
      content-class="persons__menu"
      :max-height="400"
      :max-width="400"
      :nudge-top="2"
      :nudge-left="-160"
      transition="none"
      persistent
    >
      <v-text-field
        ref="control"
        v-model="summary"
        readonly
        autocomplete="off"
        full-width
        single-line
        hide-details
        slot="activator"
        class="date white ma-1 pa-0"
      ></v-text-field>
      <v-card class="elevation-0">
        <v-card-title>
          <div class="headline">Выберите число пассажиров</div>
        </v-card-title>

        <v-card-text>
          <v-layout row nowrap mb-2>
            <v-flex md6>
              <div class="text">Взрослые</div>
              <div class="label">От 12 лет</div>
            </v-flex>
            <v-flex md6>
              <v-layout row nowrap>
                <span v-tooltip:top=" { html: 'Не более одного младенца\nна одного взрослого', visible: adults <= infants} ">
                  <v-btn
                    v-bind:disabled="(adults <= 1) || (adults <= infants)"
                    @click.native="adults_decrement"
                    class="plusminus-btn"
                  >-</v-btn>
                </span>
                <div class="persons__number">{{ adults }}</div>
                <v-btn class="plusminus-btn" v-bind:disabled="sum() >= 9" @click.native="adults_increment">+</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row nowrap mb-2>
            <v-flex md6>
              <div class="text">Дети</div>
              <div class="label">От 2 до 12 лет</div>
            </v-flex>
            <v-flex md6>
              <v-layout row nowrap>
                <v-btn
                  @click.native="kids_decrement"
                  class="plusminus-btn"
                  v-bind:disabled="kids <= 0"
                >-</v-btn>
                <div class="persons__number">{{ kids }}</div>
                <v-btn class="plusminus-btn" v-bind:disabled="sum() >= 9" @click.native="kids_increment">+</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row nowrap mb-2>
            <v-flex md6>
              <div class="text">Младенцы</div>
              <div class="label">До 2 лет</div>
            </v-flex>
            <v-flex md6>
              <v-layout row nowrap>
                <v-btn
                  @click.native="infants_decrement"
                  v-bind:disabled="infants <= 0"
                  class="plusminus-btn"
                >-</v-btn>
                <div class="persons__number">{{ infants }}</div>
                <span
                  v-tooltip:top=" { html: 'Не более одного младенца\nна одного взрослого', visible: adults <= infants } ">
                <v-btn
                  class="plusminus-btn"
                  v-bind:disabled="adults <= infants || sum() >= 9"
                  @click.native="infants_increment"
                >+</v-btn>
                </span>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row nowrap>
            <v-flex md6>
              <div class="text">Класс билета</div>
            </v-flex>
            <v-flex md6>
              <v-select
                class="persons__select"
                v-bind:items="items"
                v-model="aviaClass"
                ma-0
                hide-details
                bottom
              ></v-select>
            </v-flex>
          </v-layout>
          <v-btn block @click.native="menu=false">Закрыть</v-btn>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-layout>
</template>


<script>

  export default {
    data() {
      return {
        items: ['Эконом', 'Комфорт', 'Бизнес'],
        menu: false
      }
    },
    mounted() {
    },
    computed: {
      summary() {
        let sum = this.adults + this.kids + this.infants;
//        return `${ sum } ${this.pluralize(sum, 'человек', 'человека', 'человек')}, ${ this.aviaClass }`
        return `${ sum } ${this.pluralize(sum, 'человек', 'человека', 'человек')}`;
      },
      adults() {
        return this.$store.state.adults;
      },
      kids() {
        return this.$store.state.kids;
      },
      infants() {
        return this.$store.state.infants;
      },
      aviaClass: {
        get: function () {
          return this.$store.state.aviaClass;
        },
        set: function (item) {
          this.$store.commit('setAviaClass', item);
        }
      }
    },
    methods: {
      pluralize(n, v1, v2, v3) {
        let plural;
        plural = n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
        switch (plural) {
          case 0:
            return v1;
          case 1:
            return v2;
          case 2:
            return v3;
        }
      },
      sum() {
        return this.adults + this.kids + this.infants;
      },
      adults_increment() {
        this.$store.commit('adultsIncrement');
      },
      adults_decrement() {
        this.$store.commit('adultsDecrement');
      },
      kids_increment() {
        this.$store.commit('kidsIncrement');
      },
      kids_decrement() {
        this.$store.commit('kidsDecrement');
      },
      infants_increment() {
        this.$store.commit('infantsIncrement');
      },
      infants_decrement() {
        this.$store.commit('infantsDecrement');
      }
    }
  }

</script>

<style lang="stylus">
  .persons
    margin: 18px 0
    padding-left: 8px
    position: relative

  .persons__menu
    overflow: visible;

  .persons__select
    margin 0

  .persons__ac
    margin: 18px 0
    padding-left: 8px
    position: relative
    border 1px solid #444

  .plusminus-btn
    margin 0
    min-width 36px
    width 36px

  .plusminus-input
    width: 20px;
    margin: 0;
    padding: 0;
    input
      text-align center

  .persons__number
    flex-grow: 1;
    text-align: center;
    background: rgba(100, 100, 100, 0.1);
    line-height: 2.5;

  .label
    font-size: 80%
    line-height: 1
</style>
