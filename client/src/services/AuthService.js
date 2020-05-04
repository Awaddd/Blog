import Api from "@/services/Api";

export default {

  async login (params) {
    return await Api().post("auth", params).then(response => response).catch(error => error.response);  
  },
  
  socialLogin(params) {
    return Api().post("auth/social", params).then(response => response).catch(error => error.response);
  },

  async register(params) {
    return Api().post("users", params).then(response => response).catch(error => error.response);
  },

  fetchUserData(id) {
    return Api().get(`users/${id}`);
  },

  fetchUser(params) {
    return Api().get(`users/${params.email}`);
  }

}

