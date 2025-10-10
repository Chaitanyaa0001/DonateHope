import { logout } from "@/redux/authSlice";
import { store } from "@/redux/store";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


const api = axios.create({
  baseURL: BASE_URL ,
  withCredentials: true, 
});

export default api;


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        store.dispatch(logout());
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);