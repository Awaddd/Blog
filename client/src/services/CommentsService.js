import Api from "@/services/Api";

export default {

  fetchComments(postID) {
    return Api().get(`comments/${postID}`);
  },

  addComment(comment) {
    return Api().post("comments", comment);
  }

}