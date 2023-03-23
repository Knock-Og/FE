import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (
  cookieName: string,
  value: string,
  option?: { expires: Date }
) => {
  //쿠키 만료시간 사용자 지정 or default 1일 지정
  return cookie.set(cookieName, value, {
    expires: option?.expires ?? new Date(Date.now() + 8640000),
  });
};
export const getCookie = (cookieName: string) => {
  return cookie.get(cookieName);
};
export const removeCookie = (cookieName: string) => {
  return cookie.remove(cookieName);
};
