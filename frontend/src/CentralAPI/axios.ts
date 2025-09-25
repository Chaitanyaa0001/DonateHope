import axios from "axios";
// import { error } from "console";
const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL ,
  withCredentials: true, 
});

export default api;
