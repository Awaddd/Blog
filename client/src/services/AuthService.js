import Api from "@/services/Api";
// import axios from "axios";
// import bcrypt from "bcryptjs";

export default {

  async login (params) {
    console.log(`Auth service: ${params.email} ${params.password}`);
    return await Api().post("auth", params).then(response => response).catch(error => error.response);  
  },
  
  socialLogin(params) {
    console.log(`Login Social: ${params.displayName} ${params.email} ${params.photoURL}`);
    return Api().post("auth/social", params).then(response => response).catch(error => error.response);
  },

  async register(params) {
    console.log(`Register: ${params.firstName} ${params.lastName} ${params.email} ${params.password}`)
    return Api().post("users", params).then(response => response).catch(error => error.response);
  },

  // socialRegister(params) {
  //   console.log(`Register Social: ${params.displayName}, ${params.photoURL}, ${params.email}`);
  //   return Api().post("users/social", params).then(response => response).catch(error => error.response);
  // },

  fetchUserData(id) {
    console.log('we here');
    console.log(id);
    return Api().get(`users/${id}`);
  },

  fetchUser(params) {
    return Api().get(`users/${params.email}`);
  }

}

