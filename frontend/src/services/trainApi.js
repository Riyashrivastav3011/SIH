import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

// login token har request ke saath bhejo
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// token expire / invalid ho to session saaf karke login par bhejo
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      ["token", "role", "name"].forEach((k) => localStorage.removeItem(k));
      if (window.location.pathname !== "/login") window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const getTrainOverview = () => api.get("/trains/overview").then((r) => r.data);
export const getTrainDetails = (no) => api.get(`/trains/${no}/details`).then((r) => r.data);
export const getStations = () => api.get("/stations").then((r) => r.data);
export const getArrivals = (code) => api.get(`/stations/${code}/arrivals`).then((r) => r.data);
export const getAlerts = () => api.get("/alerts").then((r) => r.data);