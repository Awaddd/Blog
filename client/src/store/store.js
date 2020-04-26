import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null,
    loginStatus: null,
    userPostsTable: null,
    activeDashboardTab: 'allPosts', // get rid of this but check it first
    isAdmin: null,
    currentPostTitle: null
  },
  getters: {
    getUser: state => state.user,
    getLoginStatus: state => state.loginStatus,
    getUserPosts: state => state.userPostsTable,
    getActiveDashboardTab: state => state.activeDashboardTab,
    getAdminStatus: state => state.isAdmin,
    getCurrentPostTitle: state => state.currentPostTitle
  },
  mutations: {
    SET_USER: (state, payload) => payload ? state.user = payload : state.user = null,
    SET_LOGIN_STATUS: (state, payload) => payload ? state.loginStatus = payload : state.loginStatus = null,
    SET_ACTIVE_DASHBOARD_TAB: (state, payload) => payload ? state.activeDashboardTab = payload : state.activeDashboardTab = state.activeDashboardTab,
    SET_USER_POSTS: (state, payload) => payload ? state.userPostsTable = payload : state.userPostsTable = null,
    DELETE_USER_POST: (state, payload) => {
      const item = state.userPostsTable.findIndex(item => payload === item._id);
      state.userPostsTable.splice(item, 1);
    },
    SET_ADMIN_STATUS: (state, payload) => payload ? state.isAdmin = payload : state.isAdmin = null,
    SET_CURRENT_POST_TITLE: (state, payload) => payload ? state.currentPostTitle = payload : state.currentPostTitle = null
  },
  actions: {
    SET_USER ({commit}, payload) {
      commit('SET_USER', payload);
    },
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
    },
    SET_ADMIN_STATUS ({commit}, payload) {
      commit('SET_ADMIN_STATUS', payload);
    },
    SET_CURRENT_POST_TITLE ({commit}, payload) {
      commit('SET_CURRENT_POST_TITLE', payload);
    }
  }
});

export default store;