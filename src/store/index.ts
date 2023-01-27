import { createStore } from "vuex";
import fakeShopApi from "../api/fakeShopApi";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
  },
  getters: {},
  mutations: {
    auth(state, token): void {
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state): void {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, payload): Promise<void> {
      const response = (await fakeShopApi.post("/auth/login", payload)).data;
      commit("auth", response.access_token);
    },
    async fetchLoggedUser(): Promise<void> {
      return (await fakeShopApi.get("/auth/profile")).data;
    },
    async fetchProducts(): Promise<void> {
      return (await fakeShopApi.get("/products")).data;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async fetchProductById({ commit }, id): Promise<void> {
      return (await fakeShopApi.get(`/products/${id}`)).data;
    },
  },
  modules: {},
});
