import { atom } from "recoil";
import { Post } from "types";

export const isDarkState = atom<boolean>({
  key: "isDarkState",
  default: false,
});

export const searchedPostsState = atom<Post[] | null>({
  key: "searchedPosts",
  default: null,
});
