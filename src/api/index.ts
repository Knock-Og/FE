import { baseAxios, reqWithAccessToken } from "./instance";
import {
  LoginReq,
  SignUpReq,
  PositionItem,
  AdminCategory,
  Categoriesput,
  CategoryDel,
  PostToBookmark,
  FindIdItem,
  findIdCodeItem,
  FindPwItem,
  findPwCodeItem,
  AddPost,
  EditPostReq,
  GetCategoryArgs,
  GetBookmarkArgs,
  EditBookmarkArgs,
  GetSearchedArgs,
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
  position: (positionItem: PositionItem) =>
    reqWithAccessToken.put(
      `/member/${positionItem.positionID}/position`,
      positionItem
    ),
};

export const CATEGORY = {
  getCategories: () =>
    reqWithAccessToken.get("/categories").then((res) => res.data),
  categoryAdd: (category: AdminCategory) =>
    reqWithAccessToken.post(`/category`, category),
  categoryPut: (categoriesput: Categoriesput) =>
    reqWithAccessToken.put(`/category/${categoriesput.id}`, categoriesput),
  categoryDel: (categoryDel: CategoryDel) =>
    reqWithAccessToken.delete(`/category/${categoryDel.id}`),
};

export const FIND = {
  findId: (findId: FindIdItem) => baseAxios.post("/sms", findId),
  findIdCode: (idcode: findIdCodeItem) =>
    baseAxios.post("/member/email", idcode),
  findPw: (findPw: FindPwItem) => baseAxios.post("/mail/auth", findPw),
  findPwCode: (pwcode: findPwCodeItem) =>
    baseAxios.post(`/member/pwd/${pwcode.authenticationCode}`, pwcode),
};

export const SEARCH = {
  getSearchedData: ({ keyword, page, sort }: GetSearchedArgs) =>
    reqWithAccessToken.get(
      `/search?page=${page}&keyword=${keyword}&sort=${sort}`
    ),
  getCategoryData: ({ category, page, sort }: GetCategoryArgs) =>
    reqWithAccessToken.get(
      `/category?page=${page}&category=${category}&sort=${sort}`
    ),
};

export const MYPAGE = {
  getMyPosts: (page: number) =>
    reqWithAccessToken.get(`/mypage/posts?p=${page}`),
};

export const BOOKMARK = {
  getBookmarks: () => reqWithAccessToken.get("/bookmark/folders"),
  getBookmark: ({ folderId, page }: GetBookmarkArgs) =>
    reqWithAccessToken.get(`/bookmark/folder/${folderId}/bookmarks?p=${page}`),
  addBookmark: (bookMarkFolderName: string) =>
    reqWithAccessToken.post("/bookmark/folder", { bookMarkFolderName }),
  editBookmark: ({ folderId, bookMarkFolderName }: EditBookmarkArgs) =>
    reqWithAccessToken.put(`/bookmark/folder/${folderId}`, {
      bookMarkFolderName,
    }),
  deleteBookmark: (folderId: number) =>
    reqWithAccessToken.delete(`/bookmark/folder/${folderId}`),
  addPostToBookmark: ({ folderId, postId }: PostToBookmark) =>
    reqWithAccessToken.post(`/bookmark/folder/${folderId}/post/${postId}`),
  deletePostToBookmark: ({ folderId, postId }: PostToBookmark) =>
    reqWithAccessToken.delete(`/bookmark/folder/${folderId}/post/${postId}`),
};

export const POST = {
  getPost: (postId: number) =>
    reqWithAccessToken.get(`/post/${postId}`).then((res) => res.data),
  addPost: (post: AddPost) => reqWithAccessToken.post("/post", post),
  editPost: ({ post, postId }: EditPostReq) =>
    reqWithAccessToken.put(`/post/${postId}`, post),
  delPost: (postId: number) => reqWithAccessToken.delete(`/post/${postId}`),
};
