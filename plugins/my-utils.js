import Vue from 'vue';

let MyUtils = {};

MyUtils.install = function (Vue) {
  Vue.prototype.$pluralize = function (n, v1, v2, v3) {
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
  };
};

Vue.use(MyUtils);
