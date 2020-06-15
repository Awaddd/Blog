import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store/store.js";
import { getToken } from '@/helpers/helpers';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },    
    routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/categories",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Posts.vue"),
      children: [
        {
          path: '',
          redirect: 'articles'
        },
        {
          path: ':plural',
          name: "AllPosts",
          component: () =>
            import("./components/posts/AllPosts.vue")
        }
      ]
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
      const user = getToken();
      if (user) store.dispatch("SET_ADMIN_STATUS", user.isAdmin);

      if (!user) next("/admin/login");
      else if (user.isAdmin === false) next("/");
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
        name: 'NewPost',
        component: () =>
          import("./components/dashboard/NewPost.vue")
      },
      {
        path: 'posts/edit',
        name: 'EditPost',
        component: () =>
          import("./components/dashboard/EditPost.vue")
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