import axios from "axios";
import { store } from "@/redux/store";
import { logout } from "@/redux/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies
});


// Response interceptor
let isRedirecting = false;
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if ((status === 401 || status === 403) && !isRedirecting && !window.location.pathname.includes("/login")) {
        isRedirecting = true;
        store.dispatch(logout());
        setTimeout(() => window.location.replace("/login"), 300);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
