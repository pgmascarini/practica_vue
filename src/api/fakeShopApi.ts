import store from "@/store";
import axios, { AxiosHeaders } from "axios";

const fakeShopApi = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

fakeShopApi.interceptors.request.use((config) => {
  if (store.state.token) {
    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${store.state.token}`
    );
  }
  return config;
});

export default fakeShopApi;
