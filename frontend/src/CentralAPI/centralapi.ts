
import api from "./axios";

export interface APIOptions<TData = undefined> {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: TData;
}

export const callAPI = async <TResponse, TData = undefined>({
  method,
  url,
  data,
}: APIOptions<TData>): Promise<TResponse> => {
  const response = await api({ method, url, data });
  return response.data as TResponse;
};









// // CentralAPI/callAPI.ts
// import { store } from "@/redux/store";
// import api from "./axios";
// import { clearAuth, setAuth } from "@/redux/authSlice";
// import { AxiosError } from "axios";


// export interface APIOptions<TData = undefined> {
//   method: "get" | "post" | "put" | "delete";
//   url: string;
//   data?: TData;
// }

// export const callAPI = async <TResponse, TData = undefined>({
//   method,
//   url,
//   data,
// }: APIOptions<TData>): Promise<TResponse> => {
//   try {
//     const response = await api({ method, url, data });
//     return response.data as TResponse;
//   } catch (err) {
//     const error = err as AxiosError<{ message: string; accessToken?: string; userId?: string; role?: string }>;
//     if (error.response?.status === 401) {
//       try {
//         const refresh = await api.get("/auth/refresh-token");
//         if (refresh.data.accessToken) {
//           store.dispatch(setAuth({
//             accessToken: refresh.data.accessToken,   
//             userId: refresh.data.userId,
//             role: refresh.data.role
//           }));
//           const retry = await api({ method, url, data });
//           return retry.data as TResponse;
//         }
//       } catch {
//         store.dispatch(clearAuth());
//         throw err;
//       }
//     }
//     throw err;
//   }
// };

