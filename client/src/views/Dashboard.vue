<template>
    <div class="dashboard container">
        <h2>Dashboard</h2>
        <p>{{user}}</p>
        <!-- <p>{{user.username}}</p> -->
    </div>
</template>

<script>

import AuthService from "@/services/AuthService";

export default {
    data () {
      return {
        user: {

        }
      }
    },
    mounted() {
      this.getAdminData();
    },
    methods: {
      async getAdminData() {
          const response = await AuthService.fetchUserData();
          this.user = response.data.users;
          console.log(this.user);
      }
    }
}
</script>