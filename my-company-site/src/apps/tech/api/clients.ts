import axios from "axios";
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials:true });
api.interceptors.request.use(cfg=>{
  // optionally attach bearer from store
  return cfg;
});
export default api;
