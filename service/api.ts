import axios from "axios";

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_SSL,
  withCredentials: true,
});