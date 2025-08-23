import { api } from "../api";
const loginServices = <T>(data: T) => api.post("auth/login", data);
const verifyServices = <T>(data: T) => api.post("auth/verify", data);
const logoutServices = () => api.get("auth/logout");
export { loginServices, logoutServices ,verifyServices };
