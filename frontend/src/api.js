import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// login ke baad token yahi se har request me jaayega
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.role);
  return data;
};

export const getTrains = () => api.get('/trains').then(r => r.data);
export const getTrainEta = (no, station) =>
  api.get(`/trains/${no}/eta`, { params: { station } }).then(r => r.data);
export const getTrainStatus = (no) => api.get(`/trains/${no}/status`).then(r => r.data);
export const getArrivals = (code) => api.get(`/stations/${code}/arrivals`).then(r => r.data);

// staff/admin
export const getDelayed = (min = 15) => api.get('/dashboard/delayed', { params: { min } }).then(r => r.data);
export const getZones = () => api.get('/dashboard/zones').then(r => r.data);
export const getSummary = () => api.get('/dashboard/summary').then(r => r.data);
export const addEvent = (body) => api.post('/events', body).then(r => r.data);