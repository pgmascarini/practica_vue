import { createStore } from "vuex";
import fakeShopApi from "../api/fakeShopApi";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
  },
  getters: {},
  mutations: {
    auth(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, payload) {
      const response = (await fakeShopApi.post("/auth/login", payload)).data;
      commit("auth", response.access_token);
    },
    async fetchLoggedUser() {
      return (await fakeShopApi.get("/auth/profile")).data;
    },
    async fetchProducts() {
      return (await fakeShopApi.get("/products")).data;
    },
  },
  modules: {},
});
