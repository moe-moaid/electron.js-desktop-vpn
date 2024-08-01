import axios from "axios";

const api = axios.create({
  baseURL: "https://vpnapi.9dtechnologies.dev/api/desktop",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("p-vpnToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
