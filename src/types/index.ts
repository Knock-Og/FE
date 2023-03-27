export interface LoginReq {
  email: string;
  password: string;
}

export interface SignUpReq extends LoginReq {
  position: string;
  memberName: string;
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
}

export interface signItem {
  id: number;
  memberName: string;
  email: string;
  position: string;
}
export interface positionItem {
  positionID: number;
  position: string;
}

export interface categoryItem {
  categoryName: string;
  id: number;
}

export interface category {
  categoryName: string;
}
export interface categoriesput {
  categoryName: string;
  id: number;
}
export interface categoryDel {
  id: number;
}