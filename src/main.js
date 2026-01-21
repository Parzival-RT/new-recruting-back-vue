import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/style.css'
import '@/assets/css/tio-icon.css'
import  'bootstrap/dist/css/bootstrap.min.css'
import  'bootstrap/dist/js/bootstrap.bundle.min'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'

import { ValidationProvider, extend } from 'vee-validate/dist/vee-validate.full';
import {ValidationObserver} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules';
import Vue2Editor from "vue2-editor";
import CKEditor from 'ckeditor4-vue'
Vue.use(CKEditor);


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Date picker
Vue.use(DatePicker)
Vue.use(Vue2Editor);





Vue.config.productionTip = false
/* Fonts */
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('v-select', vSelect);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'გთხოვთ გაიმეოროთ იგივე პაროლი'
});

extend('checked', {
  validate(value) {
    return value;
  },
  message: 'აუცილებლად მოსანიშნი'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
