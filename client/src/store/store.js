import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import content from './modules/content';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['auth', 'content']
  })],
  modules: {
    auth,
    content
  },
  state: {
    loadingPosts: true,
    reloadComments: false
  },
  getters: {
    getLoadingPostsStatus: state => state.loadingPosts,
    getReloadComments: state => state.reloadComments
  },
  mutations: {
    SET_LOADING_POSTS_STATUS: (state, payload) => payload ? state.loadingPosts = payload : state.loadingPosts = false,
    RELOAD_COMMENTS: (state, payload) => payload ? state.reloadComments = payload : state.reloadComments = false
  },
  actions: {
    SET_LOADING_POSTS_STATUS({commit}, payload) {
      commit('SET_LOADING_POSTS_STATUS', payload);
    },
    RELOAD_COMMENTS({commit}, payload) {
      commit('RELOAD_COMMENTS', payload);
    }
  }
});

export default store;