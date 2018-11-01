import Api from "@/services/Api";

export default {
  fetchPosts() {
    return Api().get("posts");
  },

  fetchSinglePost(params) {
    return Api().get(`posts/${params.title}`);
  },

  addPosts(params) {
    return Api().post("posts", params);
  }
};
