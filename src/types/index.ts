export interface LoginReq {
  email: string;
  password: string;
}

export interface SignUpReq extends LoginReq {
  position: string;
  memberName: string;
  phoneNum: string;
}

export interface NavItem {
  itemValue: string;
  handler: () => void;
}

export interface Post {
  id: number;
  memberName: string;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  keywords: string[];
  commentCount: number;
  postViews: number;
  editingStatus: string;
}

export interface PostDetail {
  id: number;
  memberName: string;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  category: string;
  keywords: string[];
  postViews: number;
  editingStatus: string;
}

export interface EditPostReq {
  postId: number;
  post: EditPost;
}

export interface EditPost {
  title: string;
  content: string;
  keywords: string[];
  category: string;
  modifyPermission: "Owner" | "Manager" | "Member";
  readablePosition: "Owner" | "Manager" | "Member";
}

export interface AddPost extends EditPost {
  editingStatus: "true" | "false";
}

export interface Category {
  id: number;
  categoryName: string;
}

export interface Bookmark {
  id: number;
  bookMarkFolderName: string;
}

export interface EditBookmark {
  folderId: number;
  bookMarkFolderName: string;
}

export interface PostToBookmark {
  folderId: number;
  postId: number;
}

export interface SignItem {
  id: number;
  memberName: string;
  email: string;
  position: string;
  phoneNum: string;
}
export interface PositionItem {
  id: number;
  item: string;
}

export interface CategoryItem {
  categoryName: string;
  id: number;
}

export interface AdminCategory {
  categoryName: string;
}

export interface Categoriesput {
  categoryName: string;
  id: number;
}
export interface CategoryDel {
  id: number;
}

export interface SignUpFormProps {
  modalOpen: boolean;
  onClose: () => void;
}

export interface FindIdItem {
  memberName: string;
  phoneNum: string;
}
export interface findIdCodeItem {
  authenticationCode: string;
  phoneNum: string;
}

export interface FindPwItem {
  email: string;
}

export interface findPwCodeItem {
  authenticationCode: string;
  email: string;
}

export interface Logs {
  memberName: string;
  content: string;
  createDate: string;
}

export interface Comments {
  id: number;
  memberName: string;
  comment: string;
  createdAt: string;
  modifiedAt: string;
}

export interface AddComment {
  comment: string;
}

export interface PostId {
  postId: number;
}

export interface EditCommentReq {
  postId: number;
  comment: AddComment;
}


export interface SettingProps {
  settingOpen: boolean;
  onClose: () => void;
}