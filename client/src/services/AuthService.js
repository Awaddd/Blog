import Api from "@/services/Api";
// import axios from "axios";
// import bcrypt from "bcryptjs";

export default {

  async login (params) {
    console.log(`Auth service: ${params.email} ${params.password}`);
    const res = await Api().post("auth", params);  
    console.log(res);
    if (res.status === 200 && res.data.user){
      console.log(`THIS IS THE RES ${res.data.user}`);
      // store jwt in memory
      // pass it as a header on every api call
      // check user logged in
      // decode jwt to access payload on client
      const user = res.data.user;
      localStorage.setItem('user', user);
    } 
  },

  // logout () {
  //   console.log("logging out");
  //   localStorage.removeItem('user');
  //   this.$router.push({ name: "Home" });
  //   const user = localStorage.getItem('user');
  //   console.log(user);
  // },

  async register(params) {
    console.log(`Register: ${params.firstName} ${params.lastName} ${params.email} ${params.password}`)
    console.log(params);
    return Api().post("users", params);
  },

  fetchUserData(id) {
    console.log('we here');
    console.log(id);
    return Api().get(`users/${id}`);
  },

  fetchUser(params) {
    return Api().get(`users/${params.email}`);
  }

}

// notes 2:18am 21 march
// sending authorized tokens from postman works fine. Can send it on every api call. Middleware seems to be working fine. Just need to be able
// to send authorized tokens from the client, which actually works fine except when creating a new post. Other requests like finduserbyid seem to
// work fine. They send the tokens and the tokens are received anad verified. I think the issue is to do with formdata stopping or the way
// i structured the header for create new post. FIXED.

// notes 22:31 22 march
// dashboard designed. Currently lets you create posts and view a table of all posts. Only shows title, summary, image at the moment. 
// Before proceeding any further, we need to redesign how users interact with the posts table as we should only be able to pull up a
// posts table of THE LOGGED IN USER'S Posts.
// Also need to correct the problem from the other day about the postservice and tokens. FIXED.

// notes 2:31am 24 march
// Worked buefy into my design, removing old code and classes. Pages look better. Work on my notes list.