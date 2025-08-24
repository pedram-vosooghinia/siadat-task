import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const errorInterceptor = async (axiosError: AxiosError) => {
  if (axiosError.response) {
    toast.error("Server error");
  } else if (axiosError.request) {
    toast.error("Problem connecting to the server");
  } else {
    toast.error("Unknown error");
  }
  return Promise.reject(axiosError);
};

api.interceptors.response.use((res) => res, errorInterceptor);
