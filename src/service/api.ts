import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // timeout for requests (in milliseconds)
});

export default api;