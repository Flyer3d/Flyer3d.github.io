import Vue from 'vue';

Vue.filter('toHours', val => ((val >= 1440) ? Math.floor(val / 1440) + 'д ' + Math.floor((val % 1440) / 60) + 'ч ' +
  (val % 60) + 'м' : Math.floor(val / 60) + 'ч ' + (val % 60) + 'м'));
