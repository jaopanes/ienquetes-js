import { createRouter, createWebHistory } from "vue-router";

const Login = () => import(/* webpackChunkName:"authlogin" */ "../views/Auth/Login/index.vue");
const Register = () => import(/* webpackChunkName:"authregister" */ "../views/Auth/Register/index.vue");

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      layout: "AppAuth"
    }
  },
  {
    path: "/registro",
    name: "Register",
    component: Register,
    meta: {
      layout: "AppAuth"
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;