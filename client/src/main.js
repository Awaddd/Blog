import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from 'buefy'

// import { Button, Select, Container, Aside, Menu, Submenu, MenuItem, MenuItemGroup, } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';



// Vue.use(Container);
// Vue.use(Aside);
// Vue.use(Select);
// Vue.use(Button);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
Vue.use(Buefy);


Vue.config.productionTip = false;

export const serverBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
