import Api from "@/services/Api";
import axios from "axios";


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

    const formData = new FormData();

    formData.append("title", params.title);
    formData.append("summary", params.summary);
    formData.append("content", params.content);
    formData.append("image", params.image, params.image.name);

    axios.post(
      'http://localhost:3000/api/posts',
      formData,
      {
        header: {
          'Content-Type': 'image/*'
        }
      }
    ).then(
      response => {
        console.log('image upload response > ', response)
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
