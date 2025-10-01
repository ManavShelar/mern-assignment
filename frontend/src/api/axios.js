import axios from "axios";

// Read from Vite env
const API_URL = import.meta.env.VITE_API_URL || "/api/v1";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // include cookies (important for auth)
});

export default api;
