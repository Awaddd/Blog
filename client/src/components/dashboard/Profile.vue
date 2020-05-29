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
          <h1 class="title is-size-4-mobile is-size-5-tablet is-size-4-desktop is-capitalized">
            Hi 
            <span v-if="user" >{{user.firstName}}</span>
          </h1>
          <h2 class="subtitle is-size-6-mobile is-size-7-tablet is-size-6-desktop">This is your dashboard. Manage all your content here as well
            as your account. 
          </h2>
        </div>
      </div>
    </section>


    <div class="profile-content-wrapper" v-if="user">

      <div class="profile-image-group">

        <figure class="image is-128x128" v-if="!edit[4].field">
          <img v-if="!user.image" class="circle-picture" src="https://bulma.io/images/placeholders/128x128.png">
          <img v-else class="circle-picture" :src="user.image">
        </figure>

        <figure class="image is-128x128 " v-else>
            <b-field>
              <b-upload v-model="image">
                <div class="author-picture-wrapper">
                  <img v-if="!user.image" class="circle-picture author-picture-edit" src="https://bulma.io/images/placeholders/128x128.png">
                  <img v-else class="circle-picture author-picture-edit" :src="user.image">
                  <div class="author-picture-overlay ">
                    <b-icon icon="upload" size="is-medium"></b-icon>
                  </div>
                </div>
              </b-upload>
            </b-field>  
        </figure>

        <b-button class="is-primary" v-if="editBtn" @click="editAll">Edit All</b-button>
        <div v-else class="profile-btn-actions">
          <b-button type="is-primary" outlined @click="updateProfile" >Update</b-button>
          <b-button type="is-danger" outlined @click="cancelEdit" >Cancel</b-button>
        </div>
        <!-- <b-button class="is-primary">Edit</b-button> -->
      </div>

            
      <div class="profile-content">
        <div @click="editable(0)" v-if="user.bio">
          <b-field horizontal label="bio" custom-class="is-small" class="field">
            <b-input maxlength="200" custom-class="my-disabled-input" type="textarea" v-if="!edit[0].field" v-model="user.bio" disabled ></b-input>
            <b-input maxlength="200" type="textarea" v-model="user.bio" v-else></b-input>
          </b-field>
        </div>

        <div @click="editable(0)" v-else>
          <b-field horizontal label="bio" class="field">
            <b-input maxlength="200" custom-class="my-disabled-input" type="textarea" placeholder="" v-if="!edit[0].field" v-model="bio" disabled ></b-input>
            <b-input maxlength="200" type="textarea" v-model="bio" v-else></b-input>
          </b-field>
        </div>

        <div @click="editable(1)" class="field">
          <b-field horizontal label="Email" custom-class="is-small">
            <b-input v-if="!edit[1].field" type="text" :value="user.email" custom-class="my-disabled-input" disabled></b-input>
            <b-input v-else type="text" v-model="user.email"></b-input>
          </b-field>
        </div>

        <div @click="editable(2)" class="field">
          <b-field horizontal label="First Name" custom-class="is-small">
            <b-input v-if="!edit[2].field" type="text" :value="user.firstName" custom-class="my-disabled-input" disabled></b-input>
            <b-input v-else type="text" v-model="user.firstName"></b-input>
          </b-field>
        </div>

        <div @click="editable(3)" class="field">
          <b-field horizontal label="Last Name" custom-class="is-small">
            <b-input v-if="!edit[3].field"  :value="user.lastName" custom-class="my-disabled-input" disabled></b-input>
            <b-input v-else v-model="user.lastName"></b-input>
          </b-field>  
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  data () {
    return {
      user: null,
      image: null,
      bio: null,
      editBtn: true,
      edit: [
        {field: false},
        {field: false},
        {field: false},
        {field: false}, 
        {field: false}
      ]
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
    },
    
    editAll () {
      this.edit.forEach( obj => {
        obj.field = true;
      });
      this.editBtn = false;
    },

    editable (i) {
      this.edit[i].field = true;
      this.editBtn = false;
    },

    async updateProfile () {

      let updateUserParams = {
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      }

      if (this.user.bio) updateUserParams.bio = this.user.bio; 
      else updateUserParams.bio = this.bio;
      if (!this.user.image) updateUserParams.image = this.image; 
      else if (this.image) updateUserParams.image = this.image;

      const response = await UserService.updateUserDetails(updateUserParams);

      if (response.status !== 200) console.log(response.data.message);
      else console.log(response);

      this.edit.forEach( obj => {
        obj.field = false;
      });
      this.editBtn = true;
    },
    cancelEdit () {
      this.edit.forEach( obj => {
        obj.field = false;
      });
      this.editBtn = true;
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

  .author-picture-wrapper {
    // position: relative;
  }

  .author-picture-edit {
    // filter: brightness(70%);
    opacity: 0.8;
    cursor: pointer;
  }

  .author-picture-overlay {
    position: absolute;
    bottom: 50px;
    left: 50px;
    right: 50px;
    top: 50px;
    // color: #f333ff;
    mix-blend-mode: darken;
    cursor: pointer;
  }

  .profile-btn-actions {
    display: grid;
    grid-gap: 10px;
  }

  .my-disabled-input {
    cursor: pointer !important;
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