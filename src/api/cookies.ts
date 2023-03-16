import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (access_token: string, value: string, option?: { expires?: Date }) => {
  //쿠키 만료시간 1일 지정
  return cookie.set(access_token, value, {
    expires: option?.expires ?? new Date(Date.now() + 8640000),
  });
};
export const getCookie = (access_token: string) => {
  return cookie.get(access_token);
};
export const removeCookie = (access_token: string) => {
  return cookie.remove(access_token);
};
