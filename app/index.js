import Vue from 'vue';
import Vuelidate from 'vuelidate';
import app from './app.vue';

Vue.use(Vuelidate);

new Vue({
  el: '.app',
  render: (h) => h(app),
});
