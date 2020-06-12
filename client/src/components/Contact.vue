<template>
  <div class="container">
    <div class="content has-text-centered contact-wrapper">
      <div class="contact-header">
        <h1 class="title is-4 has-text-white is-size-5-mobile">Contact</h1>
        <p class="subtitle is-5 has-text-white is-size-6-mobile">What do you have to say?</p>
      </div>
      <form class="contact-form">
        <b-field label="Email">
          <b-input type="email" placeholder="john.smith@mail.com" v-model="email" />
        </b-field>
        <b-field label="Subject">
          <b-input type="text" placeholder="When is the next post?" v-model="subject" />
        </b-field>
        <b-field class="field" label="Content">
          <b-input maxlength="5000" type="textarea" placeholder="Speak your mind" v-model="text"></b-input>
        </b-field>
        <button class="contact-button" @click.prevent="contactAuthor">Get In Touch</button>
      </form>
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
      this.email = null;
      this.subject = null;
      this.text = null;
      console.log(response);

      if (response.status !== 200) {
        this.$buefy.toast.open({
            duration: 5000,
            message: response.data.message,
            type: 'is-danger'
        });
      } 
      else if ((response.status === 200)) {
        this.$buefy.toast.open({
          duration: 5000,
          message: response.data.message,
          type: 'is-success'
        });
      }
    }
  }
}
</script>


<style lang="scss">
@import "../styles/app.scss";

.contact-header {
  text-align: center;
}

.contact-form {
  text-align: start;

  .field:not(:last-child) {
    margin-bottom: 0;
  }

  .field {
    .label {
      margin-top: 0;
      color: #fff;
      font-weight: 600;
    }
    .control {
      color: #fff;
    }
  }
  
  .input, .textarea {
    border: 0;
  }
  .input::placeholder, .textarea::placeholder {
    color: rgb(61, 61, 61);
  }
}



// l

.contact-wrapper {
  display: grid;
  grid-gap: 30px;
}


.contact-form {
  display: grid;
  grid-gap: 15px;
}

.contact-button {
  @extend .my-btn;
  // background: #f2ff00;
  // background: #ffe600;
  background: #006fee;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  // text-transform: none;
  letter-spacing: 2px;
}

.contact-button:hover {
  background: #004bd6;
  transition: all 0.2s ease-in-out;
}



@media only screen and (min-width: 700px) {

  .contact-wrapper {
    grid-gap: 40px;
    padding: 2rem 0;
  }

  .contact-form {
    button {
      padding: 0.8rem 36px;
    }
    input {
      min-width: 500px;
    }
    margin: 0 auto;
  }
}


@media only screen and (min-width: 1200px) {

  .contact-wrapper {
    padding: 3rem 0;
    grid-gap: 50px;
  }

}

</style>