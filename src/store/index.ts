import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
  },
  getters: {},
  mutations: {
    auth(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
  actions: {
    async login({ commit }, payload) {
      const response = (
        await axios.post("https://api.escuelajs.co/api/v1/auth/login", payload)
      ).data;

      commit("auth", response.access_token);
    },
  },
  modules: {},
});
