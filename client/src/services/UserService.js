import Api from "@/services/Api";
import jwt from "jsonwebtoken";

export default {

  fetchUserDetails () {
    const user = localStorage.getItem('user');
    let decoded = jwt.decode(user);
    return Api().get(`users/profile/${decoded.userID}`).then(response => response).catch(error => error.response);
  }

}