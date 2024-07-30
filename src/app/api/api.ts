import axios, { AxiosInstance } from "axios";

// Create custom Axios instance with base URL
const baseURL = "http://localhost:8080";
const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
