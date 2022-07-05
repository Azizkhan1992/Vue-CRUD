import router from "@/router";
const TOKEN_KEY = "Authorization";
const REFRESH_TOKEN_KEY = "Refresh";
const EXPIRE_TIME = "Expire";

const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  saveRefreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  saveExpireTime(time) {
    localStorage.setItem(EXPIRE_TIME, time);
  },
  getExpireTime() {
    return parseInt(localStorage.getItem(EXPIRE_TIME));
  },
  removeExpireTime() {
    localStorage.removeItem(EXPIRE_TIME);
  },

  removeAll() {
    this.removeToken();
    this.removeRefreshToken();
    this.removeExpireTime();
    router.push("/login");
  },
};

export default TokenService;
