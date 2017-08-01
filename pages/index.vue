<template>
  <main>
    <v-container fluid>
      <avia-form></avia-form>
      <v-progress-linear v-bind:indeterminate="true" :height="5" warning class="mt-0" v-show="searchLoading"></v-progress-linear>
      <template v-if="searchStatus == 'OK'">
        <template v-for="item in showNResults(itemsOnPage)">
          <ticket  v-bind:key="item.id" :item="item"></ticket>
          <v-divider></v-divider>
        </template>
        <v-pagination v-bind:length.number="totalPages" v-model="page"></v-pagination>
      </template>
      <template v-else-if="searchStatus == 'ERROR'">
        <h5 class="mt-4 center">По вашему запросу билетов не найдено</h5>
      </template>
    </v-container>
  </main>
</template>
<script>

  import { mapActions, mapGetters } from 'vuex';
  import AviaForm from '~components/AviaForm';
  import Ticket from '~components/Ticket';

  export default {
    components: { AviaForm, Ticket },
    data() {
      return {
        page: 1,
        itemsOnPage: 10
      };
    },
    computed: {
      ...mapGetters({
        searchLoading: 'search/loading',
        searchResults: 'search/items',
        searchStatus: 'search/status'
      }),
      totalPages () {
        return this.searchResults && Math.ceil(this.searchResults.length / this.itemsOnPage);
      }
    },
    watch: {
      searchLoading (val) {
        if(val){
          this.page = 1;
        }
      }
    },
    methods: {
      showNResults(n) {
        return this.searchResults && this.searchResults.slice(n * (this.page-1), n * this.page);
      }
    }
  };
</script>
