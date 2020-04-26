import Api from "@/services/Api";

export default {

  fetchAllComments() {
    return Api().get("comments");
  },

  addComment(comment) {
    return Api().post("comments", comment);
  }

}