import Api from "@/services/Api";

export default {
  contactAuthor (emailContent) {
    return Api().post("contact", emailContent)
    .then( response => response )
    .catch( error => error.response );
  }
}