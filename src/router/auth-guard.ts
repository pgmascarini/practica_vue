import store from "@/store";
import { RouteLocation, NavigationGuardNext } from "vue-router";

const authGuard = (
  to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext
): void => {
  if (store.state.token) {
    next();
  } else {
    next({ name: "login" });
  }
};

export default authGuard;
