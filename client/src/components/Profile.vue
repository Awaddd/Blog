<template>
  <div>
    <h1 class="title profile is-size-5 has-text-primary">Profile</h1>
    <section>
      <div class="container" v-if="user">


        <b-field horizontal label="bio">
          <b-input maxlength="200" type="textarea"></b-input>
        </b-field>
        <b-field horizontal label="Email Name">
          <b-input :value="user.email"></b-input>
        </b-field>
        <b-field horizontal label="First Name">
          <b-input :value="user.firstName"></b-input>
        </b-field>
        <b-field horizontal label="Last Name">
          <b-input :value="user.lastName"></b-input>
        </b-field>
        <!-- <b-field horizontal label="Password">
          <b-input :value="user.password"></b-input>
        </b-field> -->

      </div>
    </section>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  data () {
    return {
      user: null
    }
  },
  mounted () {
    this.getUserDetails()
  },
  methods: {
    async getUserDetails () {
      console.log('Hey!');
      const response = await UserService.fetchUserDetails();
      if (response.status !== 200) console.log(response.error);
      else this.user = response.data;
      console.log(response);
    }
  }
}
</script>

<style lang="scss">
  
</style>