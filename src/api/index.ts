import { instance } from "./instance";
import { LoginReq, SignUpReq } from "types";

export const LoginAPI = {
  login: (loginReq: LoginReq) => instance.post("/login", loginReq),
};

export const Admin = {
  signUp: (signUpReq: SignUpReq) => instance.post("/signup", signUpReq),
  checkEmail: (email: string) => instance.get(`/check?email=${email}`),
  checkName: (name: string) => instance.get(`/check?name=${name}`),
};
