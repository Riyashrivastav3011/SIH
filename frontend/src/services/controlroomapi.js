import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// login ke baad jo token save hua hai wo har request me lagega
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Cards: liveTrains, avgDelayMin, delayed15, historyRecords
export const getSummary = async () => {
  const { data } = await api.get("/dashboard/summary");
  return data;
};

// Zone-wise: [{ _id: "NCR", trains, avgDelay, maxDelay }]
export const getZones = async () => {
  const { data } = await api.get("/dashboard/zones");
  return data;
};

// Delayed trains list (default 15 min se zyada)
export const getDelayed = async (min = 15) => {
  const { data } = await api.get("/dashboard/delayed", { params: { min } });
  return data;
};

// TSR / block add karne ke liye (control room form)
export const addEvent = async (body) => {
  const { data } = await api.post("/events", body);
  return data;
};

export const getEvents = async () => {
  const { data } = await api.get("/events");
  return data;
};

export const removeEvent = async (id) => {
  const { data } = await api.delete(`/events/${id}`);
  return data;
};