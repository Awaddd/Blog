import Api from "@/services/Api";
import axios from "axios";
import { authHeader } from '@/helpers/helpers';
import jwt from "jsonwebtoken";

export default {
  fetchPosts() {
    return Api().get("posts");
  },

  fetchSinglePost(params) {
    return Api().get(`posts/${params.title}`);
  },

  fetchUserPosts() {
    const user = localStorage.getItem('user');
    let decoded = jwt.decode(user);
    console.log(`decoded: ${decoded.userID}`);
    return Api().get(`users/${decoded.userID}/posts`);
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
    formData.append("tags", params.tags);

    axios.post(
      `${url}posts`,
      formData,
      {
        headers: authHeader(true)
      }
    ).then(
      response => {
        console.log('image upload response: ', response)
      }
    )

    
    // const formHeaders = params.getHeaders();

    console.log("LOOOOOOOOOOOOLLLLLLL");

  //   try {
  //     return Api().post("posts", params, {
  //       ...formHeaders
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  },

  deletePost(id) {
    console.log('inside delete posts service');
    return Api().delete(`posts/${id}`);
  }
}
