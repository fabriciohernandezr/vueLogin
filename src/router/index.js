import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    name: Login,
    component: () =>
    import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
 { path: "/home", 
  name:Home,
  component: () =>
  import(/* webpackChunkName: "login" */ "../views/Home.vue")
 },
 { path: "/auth", 
  name:"Auth",
   component: () =>
  import(/* webpackChunkName: "login" */ "../views/Auth.vue")
 },
 { path: "/code", 
  name:"Code",
   component: () =>
  import(/* webpackChunkName: "login" */ "../views/Code.vue")
 },
  { path: "/register", 
  name: Register,
   component: () =>
  import(/* webpackChunkName: "register" */ "../views/Register.vue"), },
  { path: "/forgotPass", 
  name: "ForgotPass",
   component: () =>
  import(/* webpackChunkName: "register" */ "../views/ForgotPass.vue"), },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
