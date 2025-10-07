import axios from "axios";

const api = axios.create({
  baseURL: "https://anjonix-company-site.onrender.com", // your backend
  withCredentials: true,            // allows cookies
});

export default api;
