import Api from "@/services/Api";

export default {

  async getAuthorPost() {
    return await Api().get(`author/`).then(response => response).catch(error => error.response);  
  },

  async updateAuthorPost(params) {
    return await Api().patch(`author/${params.id}`, params).then(response => response).catch(error => error.response);
  }

}

