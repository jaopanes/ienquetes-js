import { createRouter, createWebHistory } from "vue-router";

import AuthLayout from '../layouts/AuthLayout/index.vue'
import MainLayout from '../layouts/MainLayout/index.vue'

const Login = () => import(/* webpackChunkName:"authlogin" */ "../views/Auth/Login/index.vue");
const Register = () => import(/* webpackChunkName:"authregister" */ "../views/Auth/Register/index.vue");

const ListAllSurveys = () => import(/* webpackChunkName:"listallsurveys" */ "../views/Survey/ListAll/index.vue");

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: "/registro",
    name: "Register",
    component: Register,
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: "/enquetes",
    name: "Surveys",
    component: ListAllSurveys,
    meta: {
      layout: MainLayout
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;