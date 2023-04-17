import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (
  cookieName: string,
  value: string,
  option?: { expires?: Date }
) => {
  const date = new Date();
  const tomorrow = new Date(date.setDate(date.getDate() + 1));
  const defaultOption = { expires: new Date(tomorrow) };
  return cookie.set(cookieName, value, option ? option : defaultOption);
};

export const getCookie = (cookieName: string) => {
  return cookie.get(cookieName);
};
export const removeCookie = (cookieName: string) => {
  return cookie.remove(cookieName);
};
