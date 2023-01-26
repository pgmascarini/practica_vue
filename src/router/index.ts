import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import authGuard from "./auth-guard";
import loggedGuard from "./logged-guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    beforeEnter: [loggedGuard],
  },
  {
    path: "/products",
    name: "products",
    beforeEnter: [authGuard],
    // route level code-splitting
    // this generates a separate chunk (products.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/ProductsView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    beforeEnter: [authGuard],
    // route level code-splitting
    // this generates a separate chunk (profile.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    component: import(
      /*webpackChunkName: notFound*/ "../views/NotFoundView.vue"
    ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});
export default router;
