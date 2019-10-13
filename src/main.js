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
import { faGlobe, faBars, faBullhorn } from '@fortawesome/free-solid-svg-icons';
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
import 'firebase/auth';
import 'firebase/firestore';

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
  faTwitter
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
dom.watch();

Vue.config.productionTip = false;

// const firebaseConfig = {};
const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appID: 'app-id'
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

/* const db = firebase.database();
const storage = firebase.storage();

export { firebase, storage, db }; */

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
