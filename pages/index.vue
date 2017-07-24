<template>
  <main>
    <v-container fluid>
      <avia-form></avia-form>
      <v-progress-linear v-bind:indeterminate="true" :height="5" warning class="mt-0" v-show="searchLoading"></v-progress-linear>


      <ticket v-for="item in searchResults" v-bind:key="item.id" :item="item"></ticket>

    </v-container>



  </main>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';
  import AviaForm from '~components/AviaForm';

  export default {
    components: { AviaForm },
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        searchLoading: 'search/loading',
        searchResults: 'search/items'
      })
    }
  };
</script>
