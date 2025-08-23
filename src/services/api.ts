import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = "https://siadat-task.vercel.app/";
const API_INTERNAL_URL = "http://localhost:3000/api/";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiInternal = axios.create({
  baseURL: API_INTERNAL_URL,
  headers: { "Content-Type": "application/json" },
});

const errorInterceptor = async (axiosError: AxiosError) => {
  if (axiosError.response) {
    toast.error("Server error");
  } else if (axiosError.request) {
    toast.error("Problem connecting to the server" );
  } else {
    toast.error("Unknown error");
  }
  return Promise.reject(axiosError);
};

api.interceptors.response.use((res) => res, errorInterceptor);
apiInternal.interceptors.response.use((res) => res, errorInterceptor);
