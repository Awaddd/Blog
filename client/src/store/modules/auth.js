const state = {
  user: null,
  loginStatus: null,
  isAdmin: null,
  isSocial: false
};

const getters = {
  getUser: state => state.user,
  getLoginStatus: state => state.loginStatus,
  getAdminStatus: state => state.isAdmin,
  getSocialStatus: state => state.isSocial
};

const mutations = {
  SET_USER: (state, payload) => payload ? state.user = payload : state.user = null,
  SET_LOGIN_STATUS: (state, payload) => payload ? state.loginStatus = payload : state.loginStatus = null,
  SET_ADMIN_STATUS: (state, payload) => payload ? state.isAdmin = payload : state.isAdmin = null,
  SET_SOCIAL_STATUS: (state, payload) => payload ? state.isSocial = payload : state.isSocial = false
};

const actions = {
  SET_USER ({commit}, payload) {
    commit('SET_USER', payload);
  },
  SET_LOGIN_STATUS ({commit}, payload) {
    commit('SET_LOGIN_STATUS', payload);
  },
  SET_ADMIN_STATUS ({commit}, payload) {
    commit('SET_ADMIN_STATUS', payload);
  },
  SET_SOCIAL_STATUS({commit}, payload) {
    commit('SET_SOCIAL_STATUS', payload);
  }
};

export default{
  state,
  getters,
  mutations, 
  actions
}