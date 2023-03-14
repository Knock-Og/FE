import { instance } from "./instance";
export const LoginAPI = {
  login: (loginRespose) => instance.post("/api/members/login", loginRespose),
  signUp: (payload) => instance.post("/api/members/signup", payload),
  checkEmail: (email) => instance.get(`/check?email=${email}`),
};
