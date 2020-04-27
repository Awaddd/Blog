import Api from "@/services/Api";

export default {

  fetchComments(postID) {
    return Api().get(`comments/${postID}`);
  },

  fetchReplies(discussionID) {
    return Api().get(`comments/discussion/${discussionID}`);
  },

  addComment(comment) {
    return Api().post("comments", comment);
  }

}