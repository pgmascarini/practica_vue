import store from "@/store";
import { RouteLocation, NavigationGuardNext } from "vue-router";

const loggedGuard = (
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext
): void => {
  if (store.state.token && to.name === "login") {
    next("products");
  } else {
    next();
  }
};

export default loggedGuard;
