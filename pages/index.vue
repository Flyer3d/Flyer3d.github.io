<template>
    <main>
        <v-container fluid>
          <div class="title">
            <h2>Поиск авиабилетов по всем направлениям</h2>


            <v-layout>
              <v-flex sm4 xs12>
                <vue-instant
                  suggestion-attribute="title"
                  v-model="value"
                  :show-autocomplete="true"
                  :autofocus="true"
                  :suggestions="suggestions"
                  type="google"
                  @input="changed"
                ></vue-instant>

              </v-flex>
              <v-flex sm4 xs12>

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
                Найти авиабилеты
              </v-btn>
            </div>
          </div>
        </v-container>
    </main>
</template>

<script>

  import { mapActions } from 'vuex';

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
        suggestions: []
      }
    },
    mounted() {
      window.ss = this;
    },
    methods: {
      changed() {
        this.suggest = this.suggest(this.value);
      },
      getLabel (item) {
        return item.name
      },
      ...mapActions({
        suggest: 'airports/suggest'
      })
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
