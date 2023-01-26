import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    axiosApi: axios.create({ baseURL: "https://api.escuelajs.co/api/v1" }),
  },
  getters: {},
  mutations: {
    auth(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
      state.axiosApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
      delete state.axiosApi.defaults.headers.common["Authorization"];
    },
  },
  actions: {
    async login({ commit }, payload) {
      const response = (await this.state.axiosApi.post("/auth/login", payload))
        .data;

      commit("auth", response.access_token);
    },
    async fetchProducts() {
      const response = (await this.state.axiosApi.get("/products")).data;
      return response;
    },
  },
  modules: {},
});
