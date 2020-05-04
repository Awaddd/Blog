const state = {
  userPostsTable: null,
  currentPost: null,
  comments: null,
  replies: null
};

const getters = {
  getUserPosts: state => state.userPostsTable,
  getCurrentPost: state => state.currentPost,
  getComments: state => state.comments,
  getReplies: state => state.replies
};

const mutations = {
  SET_USER_POSTS: (state, payload) => payload ? state.userPostsTable = payload : state.userPostsTable = null,
  DELETE_USER_POST: (state, payload) => {
    const item = state.userPostsTable.findIndex(item => payload === item._id);
    state.userPostsTable.splice(item, 1);
  },
  SET_CURRENT_POST: (state, payload) => payload ? state.currentPost = payload : state.currentPost = null,
  SET_COMMENTS: (state, payload) => payload ? state.comments = payload : state.comments = null,
  SET_REPLIES: (state, payload) => payload ? state.replies = payload : state.replies = null
};

const actions = {
  SET_USER_POSTS ({commit}, payload) {
    commit('SET_USER_POSTS', payload);
  },
  DELETE_USER_POST ({commit}, payload) {
    commit('DELETE_USER_POST', payload);
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
};

export default {
  state,
  getters,
  mutations,
  actions
}