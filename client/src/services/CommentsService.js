import Api from "@/services/Api";

export default {

  fetchComments(postID) {
    return Api().get(`comments/${postID}`);
  },

  fetchReplies(discussionIDs) {
    console.log(discussionIDs);
    return Api().get(`comments/discussion/${discussionIDs}`);
  },

  addComment(comment) {
    return Api().post("comments", comment);
  }

}