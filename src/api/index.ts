import { baseAxios, reqWithAccessToken } from "./instance";
import { LoginReq, SignUpReq } from "types";

export const LOGIN = {
  login: (loginReq: LoginReq) => baseAxios.post("/login", loginReq),
};

export const ADMIN = {
  signUp: (signUpReq: SignUpReq) =>
    reqWithAccessToken.post("/signup", signUpReq),
  checkEmail: (email: string) =>
    reqWithAccessToken.get(`/check?email=${email}`),
  checkName: (name: string) => reqWithAccessToken.get(`/check?name=${name}`),
};

export const CATEGORY = {
  getCategories: () =>
    reqWithAccessToken.get("/categories").then((res) => res.data),
  addCategory: (categoryName: string) =>
    reqWithAccessToken.post("/categories", categoryName),
  editCategory: (categoryName: string, categoryId: number) =>
    reqWithAccessToken.put(`/categories/${categoryId}`, categoryName),
  removeCategory: (categoryId: number) =>
    reqWithAccessToken.delete(`/categories/${categoryId}`),
};

export const SEARCH = {
  getSearchedData: (keyword: string) =>
    reqWithAccessToken.get(`/search?k=${keyword}`),
};
