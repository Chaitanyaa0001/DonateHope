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
       if (!window.location.pathname.includes('/login')) {
  store.dispatch(logout());
  // clear any auth data
  localStorage.removeItem('role');
  setTimeout(() => {
    window.location.replace("/login");
  }, 300); // small delay prevents reload loop
}

      }
    }
    return Promise.reject(error);
  }
);