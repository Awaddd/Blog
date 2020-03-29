import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    loginStatus: null,
    userPostsTable: null,
    activeDashboardTab: 'allPosts'
  },
  getters: {
    getLoginStatus: state => state.loginStatus,
    getUserPosts: state => state.userPostsTable,
    getActiveDashboardTab: state => state.activeDashboardTab
  },
  mutations: {
    SET_LOGIN_STATUS: (state, payload) => payload ? state.loginStatus = payload : state.loginStatus = null,
    SET_ACTIVE_DASHBOARD_TAB: (state, payload) => payload ? state.activeDashboardTab = payload : state.activeDashboardTab = state.activeDashboardTab,
    SET_USER_POSTS: (state, payload) => payload ? state.userPostsTable = payload : state.userPostsTable = null,
    DELETE_USER_POST: (state, payload) => {
      const item = state.userPostsTable.findIndex(item => payload === item._id);
      state.userPostsTable.splice(item, 1);
    }
  },
  actions: {
    SET_LOGIN_STATUS ({commit}, payload) {
      commit('SET_LOGIN_STATUS', payload);
    },
    SET_ACTIVE_DASHBOARD_TAB ({commit}, payload) {
      commit('SET_ACTIVE_DASHBOARD_TAB', payload);
    },
    SET_USER_POSTS ({commit}, payload) {
      commit('SET_USER_POSTS', payload);
    },
    DELETE_USER_POST ({commit}, payload) {
      commit('DELETE_USER_POST', payload);
    }
  }
});