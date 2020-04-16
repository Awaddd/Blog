<template>
  <div class="dashboard-view">

    <nav class="dashboard-breadcrumbs" aria-label="breadcrumbs">
      <p class="is-size-5-mobile">
        <span>Dashboard / </span> 
        <span class="dashboard-breadcrumbs-current">Profile</span>
      </p>
    </nav>   

    <section class="hero is-primary is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-size-4-mobile is-size-5-tablet is-size-4-desktop">Hi Awad</h1>
          <h2 class="subtitle is-size-6-mobile is-size-7-tablet is-size-6-desktop">This is your dashboard. Manage all your content here as well
            as account optiins.
          </h2>
        </div>
      </div>
    </section>

    <div class="" v-if="user && edit">


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
    <div class="profile-content-wrapper" v-else-if="user">

      <div class="profile-image-group">
        <figure class="image is-128x128">
          <img class="author-picture" src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <b-button class="is-primary">Edit</b-button>
        <!-- <b-button class="is-primary">Edit</b-button> -->
      </div>

      <div class="profile-content">
        <b-field horizontal label="bio" custom-class="is-small">
          <b-input maxlength="200" type="textarea" disabled value="asodhoahdsaudsa hiuadhiauhsaiudh usihai dhahidahi dhasidha asdosadhaudhaso ahodah ohdohasodh saodha haodha odhuoadhoshdaou dhsd saohdaodh saohad" ></b-input>
        </b-field>
        <b-field horizontal label="Email Name" custom-class="is-small">
          <b-input :value="user.email" disabled></b-input>
        </b-field>
        <b-field horizontal label="First Name" custom-class="is-small">
          <b-input :value="user.firstName" disabled></b-input>
        </b-field>
        <b-field horizontal label="Last Name" custom-class="is-small">
          <b-input :value="user.lastName" disabled></b-input>
        </b-field>  
        <b-field horizontal label="Password" custom-class="is-small">
          <b-input type="password" :value="user.password" disabled></b-input>
        </b-field>
      </div>

    </div>

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

  .profile-content-wrapper {
    display: grid;
    grid-gap: 30px;
  }

  .profile-image-group {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-gap: 30px;
    align-items: center;
    justify-items: center;
    justify-content: center;
    // grid-row: 1/2;
  }

  .profile-content {
    // grid-row: 2/3;

  }

  .author-picture {
    border-radius: 100px;
  }

@media only screen and (min-width: 770px) {

}

@media only screen and (min-width: 1000px) { 

  .profile-content-wrapper {
    display: grid;
    grid-template-columns: 3fr max-content;
    grid-gap: 30px;
  }

  .profile-content {
    grid-column: 1/2;
    grid-row: 1;
  }

  .profile-image-group {
    grid-template-columns: max-content;
    align-self: start;
    grid-row: 1;
    grid-column: 2/3;
  }

}

</style>