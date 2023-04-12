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

export const searchedCategoryState = atom<string>({
  key: "searchedCategory",
  default: "",
});

export const searchedKeywordState = atom<string>({
  key: "searchedKeyword",
  default: "",
});

export const endPageState = atom<number>({
  key: "endPageState",
  default: 1,
});

export const errorState = atom<string | null>({
  key: "errorState",
  default: null,
});
