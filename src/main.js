// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vodal from 'vodal';
import { sync } from 'vuex-router-sync';
import localforage from 'localforage';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import vintage from 'vintagejs';
import axios from 'axios';
import { Cloudinary } from 'cloudinary-core/cloudinary-core-shrinkwrap';

require('milligram');

localforage.config({
  name: 'igpwa',
});

Vue.component(Vodal.name, Vodal);
Vue.config.productionTip = false;
Vue.prototype.$localforage = localforage;
Vue.prototype.$vintage = vintage;
Vue.prototype.$axios = axios;
Vue.prototype.$cl = Cloudinary.new({ cloud_name: 'christekh' });
Vue.prototype.$cl.responsive();
Vue.prototype.$log = (...args) => console.log(...args); // eslint-disable-line no-console

sync(store, router);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
