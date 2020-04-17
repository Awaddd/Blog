import Api from "@/services/Api";
import jwt from "jsonwebtoken";
import axios from "axios";
import { authHeader } from '@/helpers/helpers';


export default {

  fetchUserDetails () {
    const user = localStorage.getItem('user');
    let decoded = jwt.decode(user);
    return Api().get(`users/profile/${decoded.userID}`).then(response => response).catch(error => error.response);
  },

  updateUserDetails (params) {
    console.log('inside update user service');
    const user = localStorage.getItem('user');
    let decoded = jwt.decode(user);
    const url = localStorage.getItem('url');

    console.log(params);
    let formData = new FormData();

    formData.append("email", params.email);
    formData.append("firstName", params.firstName);
    formData.append("lastName", params.lastName);

    if (params.bio) formData.append("bio", params.bio);
    if (params.image) formData.append("image", params.image, params.image.name);

    // for (var val of formData.values()){
    //   console.log(val);
    // }

    return axios.patch(`${url}users/${decoded.userID}`, formData, { headers: authHeader(true) }).then(response => response).catch(error => error.response);
  }

}
