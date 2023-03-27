import { baseAxios, reqWithAccessToken } from "./instance";
import {
  LoginReq,
  SignUpReq,
  positionItem,
  category,
  categoriesput,
  categoryDel,
} from "types";

export const LOGIN = {
  login: (loginReq: LoginReq) => baseAxios.post("/login", loginReq),
};


export const ADMIN = {
  signUp: (signUpReq: SignUpReq) =>
    reqWithAccessToken.post("/signup", signUpReq),
  checkEmail: (email: string) =>
    reqWithAccessToken.get(`/check/email/${email}`),
  checkName: (memberName: string) =>
    reqWithAccessToken.get(`/check/name/${memberName}`),
  member: () => reqWithAccessToken.get(`/members`),
  position: (positionItem: positionItem) =>
    reqWithAccessToken.put(
      `/position/members/${positionItem.positionID}`,
      positionItem
    ),
};

export const ADMINCATEGORI = {
  categoryAdd: (category: category) =>
    reqWithAccessToken.post(`/categories`, category), //메소드확인
  categories: () => reqWithAccessToken.get(`/categories`),
  categoryPut: (categoriesput: categoriesput) =>
    reqWithAccessToken.put(`/categories/${categoriesput.id}`, categoriesput),
  categoryDel: (categoryDel: categoryDel) =>
    reqWithAccessToken.delete(`/categories/${categoryDel.id}`),
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
  getCategoryData: (category: string) =>
    reqWithAccessToken.get(`/category?c=${category}`),
};


export const MYPAGE = {
  getMyPosts: () =>
    reqWithAccessToken.get("/mypage/posts").then((res) => res.data),
};

// admin@apple.com
// admin@samsung.com
// 1234
