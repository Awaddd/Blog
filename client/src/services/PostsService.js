import Api from "@/services/Api";
import axios from "axios";
import { authHeader } from '@/helpers/helpers';

export default {
  fetchPosts() {
    return Api().get("posts");
  },

  fetchSinglePost(params) {
    return Api().get(`posts/${params.title}`);
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
  }
}
