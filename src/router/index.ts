import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Month from "../components/Month.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:year/:month",
    name: "MonthView",
    component: Month
  },
  { path: '*', redirect: to => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;  // getMonth returns 0 - 11
      return `/${year}/${month}`;
  }}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
