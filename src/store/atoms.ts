import { atom } from "recoil";
import { Post } from "types";

export const isDarkState = atom<boolean>({
  key: "isDarkState",
  default: false,
});

export const searchedPostsState = atom<Post[] | null>({
  key: "searchedPosts",
  default: [
    {
      id: 0,
      memberName: "test",
      title: "test",
      content: "test",
      createdAt: "test",
      modifiedAt: "test",
      keywords: ["test1", "test2", "test3"],
      commentCount: 3,
    },
  ],
});
