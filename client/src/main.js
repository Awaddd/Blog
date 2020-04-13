import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/store'
import Buefy from 'buefy'

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
});

router.beforeEach((to, from, next) => {
  console.log('waffle');
  store.dispatch("SET_ACTIVE_DASHBOARD_TAB", 'allPosts');
  next();
});

Vue.config.productionTip = false;

export const serverBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
