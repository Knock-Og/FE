import { instance, baseURL } from "./instance";
import {
  LoginReq,
  SignUpReq,
  positionItem,
  category,
  categoriesput,
  categoryDel,
} from "types";

export const loginApi = {
  login: (loginres: LoginReq) => baseURL.post("/login", loginres),
};

export const adminApi = {
  signUp: (signUpReq: SignUpReq) => instance.post("/signup", signUpReq),
  checkEmail: (email: string) => instance.get(`/check/email/${email}`),
  checkName: (memberName: string) => instance.get(`/check/name/${memberName}`),
  member: () => instance.get(`/members`),
  position: (positionItem: positionItem) =>
    instance.put(`/position/members/${positionItem.positionID}`, positionItem),
}

export const categoryApi = {
  categoryAdd: (category: category) => instance.post(`/categories`, category), //메소드확인
  categories: () => instance.get(`/categories`),
  categoryPut: (categoriesput: categoriesput) =>
    instance.put(`/categories/${categoriesput.id}`, categoriesput),
  categoryDel: (categoryDel: categoryDel) =>
    instance.delete(`/categories/${categoryDel.id}`),
};


// admin@apple.com
// admin@samsung.com
// 1234