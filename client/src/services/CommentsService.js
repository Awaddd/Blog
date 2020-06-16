import Api from "@/services/Api";

export default {

  fetchComments(postID) {
    return Api().get(`comments/${postID}`)
    .then( response => response)
    .catch( error => error.response);
  },

  fetchReplies(discussionIDs) {
    discussionIDs = JSON.stringify(discussionIDs);
    return Api().get(`comments/discussion/${discussionIDs}`)
    .then( response => response)
    .catch( error => error.response);
  },

  addComment(comment) {
    return Api().post("comments", comment);
  },

  deleteComment(comment) {
    return Api().delete(`comments/${comment._id}`, {
      data: {
        comment
      }
    });
  }

}