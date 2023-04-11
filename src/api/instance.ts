import axios from "axios";
import { getCookie, removeCookie } from "./cookies";

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

baseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.status === 400) {
      alert(error.response.data.message);
    }
  }
);

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

reqWithAccessToken.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response.data.status === 401) {
      console.error(error.response.data.message);
      alert("다시 로그인 해주세요.");
      removeCookie("access_token");
      window.location.pathname.includes("admin")
        ? window.location.replace("/admin/login")
        : window.location.replace("/login");
    }

    if (error.response.data.status === 400) {
      console.error(error.response.data.message);
    }

    return Promise.reject(error);
  }
);
