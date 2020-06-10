import Api from "@/services/Api";

export default {
  contactAuthor (emailContent) {
    console.log(emailContent);
    return Api().post("contact", emailContent);
  }
}