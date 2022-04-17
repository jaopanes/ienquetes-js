import { createRouter, createWebHistory } from "vue-router";

import { guest, auth } from "./middlewares";

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
      layout: AuthLayout,
      middleware: guest,
    }
  },
  {
    path: "/registro",
    name: "Register",
    component: Register,
    meta: {
      layout: AuthLayout,
      middleware: guest
    }
  },
  {
    path: "/enquetes",
    name: "Surveys",
    component: ListAllSurveys,
    meta: {
      layout: MainLayout,
      middleware: auth,
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];

  if (!subsequentMiddleware) return context.next;

  return (...params) => {
    context.next(...params);

    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (
    to.meta.middleware ||
    to.matched.some((record) => record.meta.middleware)
  ) {
    const fieldMiddleware =
      to.meta.middleware ||
      to.matched.filter((record) => record.meta.middleware)[0].meta.middleware;
    const middleware = Array.isArray(fieldMiddleware)
      ? fieldMiddleware
      : [fieldMiddleware];

    const context = {
      from,
      next,
      router,
      to,
    };

    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  } else next();
});

export default router;