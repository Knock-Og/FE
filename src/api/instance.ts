import axios from "axios";
import { getCookie } from "./cookies";

export const baseURL = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});


export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(
  (config) => {
    //요청해더 반환안함.
    if (config.headers === undefined) return config;
    const access_token = getCookie("access_token");
    config.headers["Authorization"] = `${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
