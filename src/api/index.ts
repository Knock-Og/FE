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
  EditCommentReq,
  MypageGetPw,
  MypagePutPw,
  MemberItem,
  DelComment,
  PutComment,
} from "types";

export const LOGIN = {
  login: (loginReq: LoginReq) => baseAxios.post("/login", loginReq),
  adminLogin: (loginReq: LoginReq) => baseAxios.post("/admin/login", loginReq),
};

export const ADMIN = {
  signUp: (signUpReq: SignUpReq) =>
    reqWithAccessToken.post("/signup", signUpReq),
  checkEmail: (email: string) =>
    reqWithAccessToken.get(`/check/email/${email}`),
  checkName: (memberName: string) =>
    reqWithAccessToken.get(`/check/name/${memberName}`),
  checkPhone: (phoneNum: string) =>
    reqWithAccessToken.get(`/check/phone/${phoneNum}`),

  member: () => reqWithAccessToken.get(`/members`),
  memberDel: (MemberItem: MemberItem) =>
    reqWithAccessToken.delete(`/member/${MemberItem.id}`, { data: MemberItem }),
  position: (positionItem: PositionItem) =>
    reqWithAccessToken.put(`/member/${positionItem.id}/position`, positionItem),
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
  findId: (findId: FindIdItem) => baseAxios.post("/auth/sms", findId),
  findIdCode: (idcode: findIdCodeItem) =>
    baseAxios.post("/member/email", idcode),
  findPw: (findPw: FindPwItem) => baseAxios.post("/auth/email", findPw),
  findPwCode: (pwcode: findPwCodeItem) => baseAxios.post(`/member/pwd`, pwcode),
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
    reqWithAccessToken.get(`/mypage/posts?page=${page}`),
};

export const MYPAGEPW = {
  getPwData: (password: MypageGetPw) =>
    reqWithAccessToken.post("/check/password", password),
  getUserData: () => reqWithAccessToken.get("/mypage"),
  putPwData: (password: MypagePutPw) =>
    reqWithAccessToken.put("/password", password),
};

export const BOOKMARK = {
  getBookmarks: () => reqWithAccessToken.get("/bookmark/folders"),
  getBookmark: ({ folderId, page }: GetBookmarkArgs) =>
    reqWithAccessToken.get(
      `/bookmark/folder/${folderId}/bookmarks?page=${page}`
    ),
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
  getPost: (postId: number) => reqWithAccessToken.get(`/post/${postId}`),
  addPost: (post: AddPost) => reqWithAccessToken.post("/post", post),
  editPost: ({ post, postId }: EditPostReq) =>
    reqWithAccessToken.put(`/post/${postId}`, post),
  delPost: (postId: number) => reqWithAccessToken.delete(`/post/${postId}`),
  updateEditingStatus: (postId: number) =>
    reqWithAccessToken.put(`/post/${postId}/editingStatus`),
};

export const LOG = {
  getLog: (postId: number) =>
    reqWithAccessToken.get(`/post/${postId}/logs`).then((res) => res.data),
};

export const COMMENT = {
  getComments: (postId: number) =>
    reqWithAccessToken.get(`/post/${postId}/comments`).then((res) => res.data),
  addComment: ({ postId, comment }: EditCommentReq) =>
    reqWithAccessToken.post(`/post/${postId}/comment`, comment),

  delComment: ({ postId, commentId }: DelComment) =>
    reqWithAccessToken.delete(`/post/${postId}/comment/${commentId}`),

  putComment: ({ postId, commentId, comment }: PutComment) =>
    reqWithAccessToken.put(`/post/${postId}/comment/${commentId}`, { comment }),
};
