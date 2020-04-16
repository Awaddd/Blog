import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/posts",
      name: "Posts",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Posts.vue")
    },
    {
      path: "/posts/:title",
      name: "BlogPost",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/BlogPost.vue")
    },
    {
      path: "/admin/login",
      name: "Login",
      beforeEnter: (to, from, next) => {
        const user = localStorage.getItem('user');
        user ? next('/') : next();
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    },
    {
      path: "/admin/register",
      name: "Register",
      beforeEnter: (to, from, next) => {
        const user = localStorage.getItem('user');
        user ? next('/') : next();
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Register.vue")
  },
  {
    path: "/dashboard",
    beforeEnter: (to, from, next) => {
      console.log("Message from the router.");
      const user = localStorage.getItem('user');
      console.log(user);

      if (!user) next("/admin/login");
      else next();
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/Dashboard.vue"),
    children: [
      {
        path: '',
        name: "Dashboard",
        component: () =>
          import("./components/dashboard/Overview.vue")
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () =>
          import("./components/dashboard/Profile.vue")
      },
      {
        path: 'posts/all',
        name: 'PostsTable',
        component: () =>
          import("./components/dashboard/PostsTable.vue")
      },
      {
        path: 'posts/new',
        name: 'PostsNew',
        component: () =>
          import("./components/dashboard/PostsNew.vue")
      },
      {
        path: 'posts/edit',
        name: 'PostsEdit',
        component: () =>
          import("./components/dashboard/PostsEdit.vue")
      }
    ]
  },
  { 
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "about" */ "./components/NotFound.vue")    
  },
  {
    path: '*', 
    redirect: '/404'
  }

]});

export default router;