import store from "@/store";
import { RouteLocation } from "vue-router";

const authGuard = (to: RouteLocation, from: RouteLocation, next: any) => {
  if (store.state.token) {
    next();
  } else {
    next({ name: "login" });
  }
};

export default authGuard;
