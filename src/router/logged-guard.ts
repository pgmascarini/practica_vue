import store from "@/store";
import { RouteLocation } from "vue-router";

const loggedGuard = (to: RouteLocation, from: RouteLocation, next: any) => {
  if (store.state.token && to.name === "login") {
    next("products");
  } else {
    next();
  }
};

export default loggedGuard;
