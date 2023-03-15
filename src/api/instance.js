import axios from "axios";
import { getCookie } from "./cookies";
export const instance = axios.create({
  baseURL: `${process.env.React_APP_CL_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(
  (config) => {
    //요청해더 반환안함.
    if (config.headers === undefined) return config
    
    const access_token = getCookie("access_token");
    config.headers["Authorization"] = `Bearer ${access_token}`
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
