import { atom } from "recoil";

export const isDarkState = atom<boolean>({
  key: "isDarkState",
  default: false,
});
