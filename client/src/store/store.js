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
    commentAdded: false
  },
  getters: {
    getLoadingPostsStatus: state => state.loadingPosts,
    getCommentAdded: state => state.commentAdded
  },
  mutations: {
    SET_LOADING_POSTS_STATUS: (state, payload) => payload ? state.loadingPosts = payload : state.loadingPosts = false,
    SET_COMMENT_ADDED: (state, payload) => payload ? state.commentAdded = payload : state.commentAdded = false
  },
  actions: {
    SET_LOADING_POSTS_STATUS({commit}, payload) {
      commit('SET_LOADING_POSTS_STATUS', payload);
    },
    SET_COMMENT_ADDED({commit}, payload) {
      commit('SET_COMMENT_ADDED', payload);
    }
  }
});

export default store;