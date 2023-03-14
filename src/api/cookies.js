import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (access_token, value, Option) => {
  return cookie.set(access_token, value, { Option });
};
export const getCookie = (access_token) => {
  return cookie.get(access_token);
};
export const removeCookie = (access_token) => {
  return cookie.remove(access_token);
};
