import Api from "@/services/Api";
// import axios from "axios";
// import bcrypt from "bcryptjs";

export default {

  async login (params) {
    console.log(`Auth service: ${params.email} ${params.password}`);

    
    // const user = await this.fetchUser({email: params.email});

    // const user = this.fetchUser({email: params.email});

    // bcrypt.compare("password", params.password, function(err, res) {
    //   console.log(res);
    // });

    return Api().post("auth", params);  
  },

  async register(params) {
    console.log(`Register: ${params.firstName} ${params.lastName} ${params.email} ${params.password}`)
    console.log(params);
    return Api().post("users", params);
  },

  // fetchAdminData () {
  //   return Api().get("admin");
  // }



  fetchUser(params) {
    return Api().get(`users/${params.email}`);
  }

}
