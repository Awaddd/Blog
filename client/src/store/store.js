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
    content,
  },
  state: {
    loadingPosts: true,
    reloadComments: false,
    fullscreenContent: null
  },
  getters: {
    getLoadingPostsStatus: state => state.loadingPosts,
    getReloadComments: state => state.reloadComments,
    getFullscreenContent: state => state.fullscreenContent
  },
  mutations: {
    SET_LOADING_POSTS_STATUS: (state, payload) => payload ? state.loadingPosts = payload : state.loadingPosts = false,
    RELOAD_COMMENTS: (state, payload) => payload ? state.reloadComments = payload : state.reloadComments = false,
    SET_FULLSCREEN_CONTENT: (state, payload) => payload ? state.fullscreenContent = payload : state.fullscreenContent = null
  },
  actions: {
    SET_LOADING_POSTS_STATUS({commit}, payload) {
      commit('SET_LOADING_POSTS_STATUS', payload);
    },
    RELOAD_COMMENTS({commit}, payload) {
      commit('RELOAD_COMMENTS', payload);
    },
    SET_FULLSCREEN_CONTENT({commit}, payload) {
      commit('SET_FULLSCREEN_CONTENT', payload);
    }
  }
});

export default store;