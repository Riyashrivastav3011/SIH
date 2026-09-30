import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 8000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("API fallback to mock", error.message);
    return Promise.reject(error);
  }
);