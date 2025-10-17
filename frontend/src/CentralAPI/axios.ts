
import axios, { AxiosError } from "axios";
import { store } from "@/redux/store";
import { setAuth, clearAuth } from "@/redux/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🧠 Intercept 401 responses globally
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) prom.resolve(token);
    else prom.reject(error);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // Skip refresh if already trying to refresh
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh-token")) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.get("/auth/refresh-token");
        store.dispatch(setAuth({
          accessToken: data.accessToken,
          userId: data.userId,
          role: data.role,
        }));
        processQueue(null, data.accessToken);
        isRefreshing = false;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        store.dispatch(clearAuth());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;





// // CentralAPI/axios.ts
// import axios from "axios";
// import { store } from "@/redux/store";

// const BASE_URL = import.meta.env.VITE_API_URL;

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // ✅ send cookies
// });

// // ✅ Attach access token automatically
// api.interceptors.request.use((config) => {
//   const token = store.getState().auth.accessToken;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;