<template>
  <v-layout class="persons white elevation-4 pt-1">

    <v-menu
      :close-on-content-click="false"
      v-model="menu"
      ref="menu"
      offset-y
      full-width
      bottom
      left
      content-class="persons__menu"
      :max-height="400"
      :max-width="400"
      :min-width="400"
      :nudge-top="-5"
      :nudge-left="-4"
      transition="none"
      persistent
    >
      <v-text-field
        ref="control"
        v-model="summary"
        readonly
        disabled
        autocomplete="off"
        full-width
        single-line
        hide-details
        slot="activator"
        class="persons__date white ma-1 pa-0"
      ></v-text-field>
      <v-card class="elevation-0">
        <v-card-text>
          <v-layout row nowrap mb-3>
            <v-flex md4>
              <div class="persons__text">Взрослые</div>
            </v-flex>
            <v-flex md8>
              <v-layout row nowrap>
                <span v-tooltip:top=" { html: 'Не более одного младенца\nна одного взрослого', visible: adults <= infants} ">
                  <v-btn
                    outline
                    v-bind:disabled="(adults <= 1) || (adults <= infants)"
                    @click.native="adults--"
                    class="plusminus-btn"
                  >-</v-btn>
                </span>
                <div class="persons__number">{{ adults }}</div>
                <v-btn
                  outline
                  class="plusminus-btn"
                  v-bind:disabled="sum() >= 9"
                  @click.native="adults++"
                >+</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row nowrap mb-3>
            <v-flex md4>
              <div class="persons__text">Дети до 12 лет</div>
            </v-flex>
            <v-flex md8>
              <v-layout row nowrap>
                <v-btn
                  outline
                  @click.native="kids--"
                  class="plusminus-btn"
                  v-bind:disabled="kids <= 0"
                >-</v-btn>
                <div class="persons__number">{{ kids }}</div>
                <v-btn
                  outline
                  class="plusminus-btn"
                  v-bind:disabled="sum() >= 9"
                  @click.native="kids++"
                >+</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row nowrap mb-3>
            <v-flex md4>
              <div class="persons__text">Дети до 2 лет<br>(без места)</div>
            </v-flex>
            <v-flex md8>
              <v-layout row nowrap>
                <v-btn
                  outline
                  @click.native="infants--"
                  v-bind:disabled="infants <= 0"
                  class="plusminus-btn"
                >-</v-btn>
                <div class="persons__number">{{ infants }}</div>
                <span
                  v-tooltip:topleft=" { html: 'Не более одного младенца\nна одного взрослого', visible: adults <= infants } ">
                <v-btn
                  outline
                  class="plusminus-btn"
                  v-bind:disabled="adults <= infants || sum() >= 9"
                  @click.native="infants++"
                >+</v-btn>
                </span>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row nowrap mb-3>
            <v-flex md4>
              <div class="text">Класс билета</div>
            </v-flex>
            <v-flex md8>

              <v-layout>
              <v-btn-toggle
                v-bind:items="list"
                class="persons__select-button elevation-0"
                v-model="aviaClass"
                mandatory
                block
              ></v-btn-toggle>
              </v-layout>

            </v-flex>
          </v-layout>
          <v-layout>
          <v-btn block @click.native="menu=false">Закрыть</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-layout>
</template>


<script>
  const CLASS_LIST = [
    { text: 'Любой', toptext: 'Любой класс', value: 'A' },
    { text: 'Эконом', toptext: 'Эконом', value: 'E' },
    { text: 'Бизнес', toptext: 'Бизнес', value: 'B' }
  ];

  import { mapGetters, mapMutations } from 'vuex';
  import _ from 'lodash';

  export default {
    data() {
      return {
        menu: false,
        list: CLASS_LIST
      }
    },
    computed: {
      ...mapGetters({
        storeAdults: 'Persons/adults',
        storeKids: 'Persons/kids',
        storeInfants: 'Persons/infants',
        storeAviaClass: 'Persons/aviaClass'

      }),
      summary() {
        let sum = this.adults + this.kids + this.infants;
        let aC = _.find(this.list, {value: this.aviaClass}).toptext;
        return `${ sum } ${this.pluralize(sum, 'пассажир', 'пассажира', 'пассажиров')}, ${aC}`;
      },
      adults: {
        get: function() {
          return this.storeAdults;
        },
        set: function(val) {
          this.updateForm({adults: val})
        }
      },
      kids: {
        get: function() {
          return this.storeKids;
        },
        set: function(val) {
          this.updateForm({kids: val});
        }
      },
      infants: {
        get: function() {
          return this.storeInfants;
        },
        set: function(val) {
          this.updateForm({infants: val})
        }
      },
      aviaClass: {
        get: function () {
          return this.storeAviaClass;
        },
        set: function (val) {
          this.updateForm({aviaClass: val})
        }
      }
    },
    methods: {
      ...mapMutations({
        updateForm: 'Persons/update'
      }),
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
      }
    }
  }

</script>

<style lang="stylus">
  .persons
    margin: 18px 0
    padding-left: 8px
    position: relative
    overflow: hidden
    line-height 1.2

    &__date.input-group--disabled.input-group input
      color: rgba(0,0,0,.87)

    &__text
      line-height 1.2

  .persons__select-button
    padding 0
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .btn
      width 100%
    .btn__content:before
      background #000


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
    border: 1px solid #bbb;

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
    line-height: 2;

  .label
    font-size: 80%
    line-height: 1

  [data-tooltip][data-tooltip-location=topleft]:before {
    bottom: 100%;
    left: 50%;
    -webkit-transform: translate3d(-50%,14px,0) scale(0);
    transform: translate3d(-50%,14px,0) scale(0);
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
  }

  [data-tooltip][data-tooltip-location=topleft]:hover:before {
    -webkit-transform: translate3d(-50%,-14px,0) scale(1);
    transform: translate3d(-84%,-14px,0) scale(1);
  }
</style>
