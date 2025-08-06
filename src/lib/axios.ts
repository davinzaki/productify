import axios from "axios";

export const http = axios.create({
  baseURL: process.env.APP_URL || "http://localhost:3000",
});
