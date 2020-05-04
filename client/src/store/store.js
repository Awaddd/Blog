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
    loadingPosts: true
  },
  getters: {
    getLoadingPostsStatus: state => state.loadingPosts
  },
  mutations: {
    SET_LOADING_POSTS_STATUS: (state, payload) => payload ? state.loadingPosts = payload : state.loadingPosts = false
  },
  actions: {
    SET_LOADING_POSTS_STATUS({commit}, payload) {
      commit('SET_LOADING_POSTS_STATUS', payload);
    }
  }
});

export default store;