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
    currentPost: null,
    comments: null,
    replies: null
  },
  getters: {
    getUser: state => state.user,
    getLoginStatus: state => state.loginStatus,
    getUserPosts: state => state.userPostsTable,
    getActiveDashboardTab: state => state.activeDashboardTab,
    getAdminStatus: state => state.isAdmin,
    getCurrentPost: state => state.currentPost,
    getComments: state => state.comments,
    getReplies: state => state.replies
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
    SET_CURRENT_POST: (state, payload) => payload ? state.currentPost = payload : state.currentPost = null,
    SET_COMMENTS: (state, payload) => payload ? state.comments = payload : state.comments = null,
    SET_REPLIES: (state, payload) => payload ? state.replies = payload : state.replies = null
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
    SET_CURRENT_POST ({commit}, payload) {
      commit('SET_CURRENT_POST', payload);
    },
    SET_COMMENTS ({commit}, payload) {
      commit('SET_COMMENTS', payload);
    },
    SET_REPLIES({commit}, payload) {
      commit('SET_REPLIES', payload);
    }
  }
});

export default store;