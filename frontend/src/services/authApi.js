import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

const save = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  if (data.name) localStorage.setItem("name", data.name);
};

export const loginUser = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  save(data);
  return data; // { token, role, name }
};

export const signupUser = async (form) => {
  const { data } = await api.post("/auth/signup", form);
  return data;
};

export const logoutUser = () => {
  ["token", "role", "name"].forEach((k) => localStorage.removeItem(k));
};
