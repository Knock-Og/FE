import { instance } from "./instance";
export const LoginAPI = {
  Login: (loginRespose) => instance.post("/api/members/login", loginRespose),
  Signup: (payload) => instance.post("/api/members/signup", payload),
  CheckEmail: (payload) =>
    instance.get("/api/members", { params: { email: payload } }),
};
