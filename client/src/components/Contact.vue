<template>
  <div class="container">
    <div class="content has-text-centered newsletter-wrapper">
      <div>
        <h1 class="title is-4 has-text-white is-size-5-mobile">Contact</h1>
        <p class="subtitle is-5 has-text-white is-size-6-mobile">Want to be the first to know when a new article comes out?</p>
      </div>
      <div class="newsletter-group">
        <input type="email" placeholder="Your Email" class="input is-medium newsletter-input" v-model="email">
        <input type="text" placeholder="Subject" class="input is-medium newsletter-input" v-model="subject">
        <b-field class="field">
          <b-input maxlength="200" type="textarea" placeholder="What do you want to say?" v-model="text"></b-input>
        </b-field>
        <button class="newsletter-button" @click.prevent="contactAuthor">Get In Touch</button>
      </div>
    </div>

  </div>
</template>

<script>
import ContactService from "@/services/ContactService";

export default {
  data () {
    return {
      email: null,
      subject: null,
      text: null
    }
  }, 
  methods: {
    async contactAuthor () {
      const response = await ContactService.contactAuthor({email: this.email, subject: this.subject, text: this.text});
      console.log(response);
    }
  }
}
</script>