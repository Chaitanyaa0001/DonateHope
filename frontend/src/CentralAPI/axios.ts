
import { logout as logoutAction } from "@/redux/authSlice";
import { store } from "@/redux/store";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


const api = axios.create({
  baseURL: BASE_URL ,
  withCredentials: true, 
});

export default api;

let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if ((status === 401 || status === 403) && !isRedirecting && !window.location.pathname.includes('/login')) {
        isRedirecting = true;
        store.dispatch(logoutAction());
        localStorage.removeItem('role');
        setTimeout(() => window.location.replace("/login"), 300);
      }
    }
    return Promise.reject(error);
  }
);
