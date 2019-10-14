import Vue from 'vue';
import App from './App.vue';
import router from './router';

/* FORMS */
import { Vuelidate } from 'vuelidate';

/* BOOTSTRAP */
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* ICONS */
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faGlobe,
  faBars,
  faBullhorn,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faBus,
  faMapMarkerAlt,
  faLocationArrow,
  faAngleDoubleDown
} from '@fortawesome/free-solid-svg-icons';
import { faClock, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import {
  faInstagram,
  faFacebookSquare,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* FIREBASE */
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';
// Add the Firebase services that you want to use
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

/* ICONS */
Vue.use(BootstrapVue, Vuelidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors'
});
library.add(
  faGlobe,
  faBars,
  faBullhorn,
  faInstagram,
  faFacebookSquare,
  faTwitter,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faBus,
  faClock,
  faMapMarkerAlt,
  faCalendarAlt,
  faLocationArrow,
  faAngleDoubleDown
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/* FILTERS */
Vue.filter('formatDate', function(timestamp) {
  if (!timestamp) {
    return '?-?-?';
  } else {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(timestamp * 1);
    // Will display time in 10:30:23 format
    // const hours = date.getHours();
    // const minutes = '0' + date.getMinutes();
    // const seconds = '0' + date.getSeconds();
    // const formattedTime =
    //  hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // return formattedTime;
    // Will display date in dd-MM-YYYY format
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + '-' + month + '-' + year;
  }
});

/* FIREBASE */
const firebaseConfig = {
  apiKey: 'AIzaSyAw7bgvk3QmVo4PlRqA9qUAdwbex-QFDLk',
  authDomain: 'acollida-bcn.firebaseapp.com',
  databaseURL: 'https://acollida-bcn.firebaseio.com',
  projectId: 'acollida-bcn',
  storageBucket: 'acollida-bcn.appspot.com',
  messagingSenderId: '431739286993',
  appId: '1:431739286993:web:7d2820d78f001fb3dbdcf0',
  measurementId: 'G-WE8BLZWE0N'
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();

/* OTHERS */
dom.watch();
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
