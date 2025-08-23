import {  apiInternal } from "../api";
const loginServices = <T>(data: T) => apiInternal.post("auth/login", data);
const verifyServices = <T>(data: T) => apiInternal.post("auth/verify", data);
const logoutServices = () => apiInternal.get("auth/logout");
export { loginServices, logoutServices ,verifyServices };
