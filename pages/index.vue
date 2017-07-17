<template>
    <main>
        <v-container fluid>
          <div class="title">
            <h2>Поиск авиабилетов по всем направлениям</h2>


            <v-layout>
              <v-flex sm4 xs12>
                <v-autocomplete :items="items" v-model="item" :get-label="getLabel"></v-autocomplete>
              </v-flex>
              <v-flex sm4 xs12>
                <v-autocomplete :items="items" v-model="item" :get-label="getLabel"></v-autocomplete>
              </v-flex>

              <v-flex sm4 xs12>
                <v-menu
                  lazy
                  full-width
                  :nudge-left="40"
                  max-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="e3"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="e3" no-title></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex sm4 xs12>
                <v-menu
                  lazy
                  full-width
                  :nudge-left="40"
                  max-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="e3"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="e3" no-title></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>

            <div class="text-xs-center">
              <v-btn success large dark>
                <v-icon dark left>flight</v-icon>
                Искать
              </v-btn>
            </div>
          </div>
        </v-container>
    </main>
</template>

<script>

  import { mapGetters } from 'vuex';

  export default {
    asyncData () {
      return {
        search: null,
        sidebar: false,

      }
    },
    data () {
      return {
        e3: null,
        item: '',
        items: ['sika', 'ololo  ']
      }
    },
    computed: {
      ...mapGetters({
        ololo: ''
      })
    },
    methods: {
      getLabel (item) {
        return item.name
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
