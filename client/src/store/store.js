import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    loginStatus: null
  },
  getters: {
    getLoginStatus: state => state.loginStatus
  },
  mutations: {
    SET_LOGIN_STATUS: (state, payload) => payload ? state.loginStatus = payload : state.loginStatus = null
  },
  actions: {
    SET_LOGIN_STATUS ({commit}, payload) {
      commit('SET_LOGIN_STATUS', payload);
    }
  }
});