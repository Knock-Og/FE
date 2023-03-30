import axios from "axios";
import { getCookie } from "./cookies";

export const baseURL = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const baseAxios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

export const reqWithAccessToken = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

reqWithAccessToken.interceptors.request.use(
  (config) => {
    const access_token = getCookie("access_token");
    config.headers["Authorization"] = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
