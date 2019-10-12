import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { Vuelidate } from 'vuelidate';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faBars, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faFacebookSquare,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.use(BootstrapVue, Vuelidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors'
});
dom.watch();
library.add(
  faGlobe,
  faBars,
  faBullhorn,
  faInstagram,
  faFacebookSquare,
  faTwitter
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
