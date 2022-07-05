import Vue from "vue";
import axios from "axios";
import TokenService from "../services/TokenService";

const BASE_URL = "http://localhost:8085/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      "X-Requested-With": "XMLHttpRequest",
    },
  },
});

const _token = localStorage.getItem("token");
if (_token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + _token;
}

instance.interceptors.request.use(
  (config) => {
    if (TokenService.getToken()) {
      config.headers.Authorization = "Bearer " + TokenService.getToken();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Vue.prototype.$api = instance;

export default instance;
