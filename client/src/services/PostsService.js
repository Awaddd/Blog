import Api from "@/services/Api";
import axios from "axios";
import { authHeader } from '@/helpers/helpers';
import jwt from "jsonwebtoken";

export default {
  
  fetchPosts() {
    return Api().get("posts");
  },


  fetchSinglePost(params) {
    return Api().get(`posts/${params.title}`)
      .then(
        response => { return response }
      )
      .catch(
        error => { return error.response }
      );
  },


  fetchSinglePostByID(id) {
    console.log('made it this faaar');
    return Api().get(`posts/id/${id}`);
  },


  fetchFeaturedPost() {
    return Api().get('/posts/featured');
  },


  fetchUserPosts() {
    const user = localStorage.getItem('user');
    let decoded = jwt.decode(user);
    console.log(`decoded: ${decoded.userID}`);
    return Api().get(`userPosts/${decoded.userID}/posts`)
      .then(response => { return response })
      .catch(error => { return error.response });
  },


  addPosts(params) {
    console.log(params);
    console.log(params.image);
    console.log(`Image NAME${params.image.name}`);

    const url = localStorage.getItem('url');

    const formData = new FormData();

    formData.append("title", params.title);
    formData.append("summary", params.summary);
    formData.append("content", params.content);
    formData.append("image", params.image, params.image.name);
    formData.append("tags", JSON.stringify(params.tags));

    return axios.post(
      `${url}posts`,
      formData,
      {
        headers: authHeader(true)
      }
    ).then(
      response => {
        return response;
      }
    )
    .catch(
      error => {
        return error.response;
      }
    )
  },

  
  editPost(params) {
    console.log('inside edit posts service ', params);

    const url = localStorage.getItem('url');

    const formData = new FormData();

    formData.append("title", params.title);
    formData.append("summary", params.summary);
    formData.append("content", params.content);
    formData.append("tags", JSON.stringify(params.tags));

    if (params.image) formData.append("image", params.image, params.image.name);

    return axios.patch(
      `${url}posts/${params.id}`,
      formData,
      {
        headers: authHeader(true)
      }
    )
    .then(
      response => {
        return response;
      }
    )
    .catch(
      error => {
        return error.response;
      }
    ) 
  },


  deletePost(id) {
    console.log('inside delete posts service');
    return Api().delete(`posts/${id}`);
  },


  updateFeaturedPost(postID) {
    const user = localStorage.getItem('user');
    let decoded = jwt.decode(user);
    return Api().patch(`userPosts/${decoded.userID}/${postID}`, {userID: decoded.userID, postID: postID}).then(response => response).catch(error => error.response);
  }
}
