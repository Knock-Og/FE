import { instance } from "./instance";


export const LoginAPI = {
  login: (loginData) => instance.post("/login", loginData),
};
export const Admin ={
  signUp: (signupData) => instance.post("/signup", signupData),
  checkEmail: (email) => instance.get(`/check/email/${email}`),
  checkName: (member) => instance.get(`/check/name/${member}`),
}