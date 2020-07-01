import Vue from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "v2-datepicker/lib/index.css"; // v2 need to improt css
import V2Datepicker from "v2-datepicker";

Vue.config.productionTip = false;
Vue.use(V2Datepicker);
new Vue({
  render: h => h(App),
}).$mount('#app');
