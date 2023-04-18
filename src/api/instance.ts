import axios from "axios";
import { getCookie, removeCookie } from "./cookies";

export const baseAxios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

export const reqWithAccessToken = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

baseAxios.interceptors.response.use(
  (response) => {
    let success = response.data.statusCode;
    if (response.data.statusCode === "202") {
      if (success === "The sms has been sent successfully.") {
        alert("인증번호가 발송되었습니다.");
      }
    }
    return response;
  },
  (error) => {
    const errorMessage = error.response.data.message;
    const errorStatus = error.response.data.status;

    switch (errorStatus) {
      case 400:
        switch (errorMessage) {
          case "Invalid password":
            return new Error("잘못된 비밀번호 입니다.");
          case "Failed to send sms code.":
            return new Error("SMS 전송 에러발생입니다.");
          case "Invalid authentication code":
            return new Error("잘못된 인증번호입니다.");
          case "Failed to send email code":
            return new Error("이메일전송을 실패했습니다.");
          case "Invalid request":
            return new Error("잘못된 요청값입니다");
          default:
            return;
        }

      case 401:
        switch (errorMessage) {
          default:
            return;
        }

      case 403:
        switch (errorMessage) {
          default:
            return;
        }

      case 404:
        switch (errorMessage) {
          case "That account(member) does not exist.":
            return new Error("해당 계정이 존재하지 않습니다.");
          case "Authentication code does not exist.":
            return new Error("인증코드가 존재하지 않습니다.");
          default:
            return;
        }

      default:
        return;
    }
  }
);

reqWithAccessToken.interceptors.request.use(
  (config) => {
    const access_token = getCookie("reqWithToken");
    config.headers["Authorization"] = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

reqWithAccessToken.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const errorMessage = error.response.data.message;
    const errorStatus = error.response.data.status;

    switch (errorStatus) {
      case 400:
        switch (errorMessage) {
          case "Invalid password":
            return new Error("잘못된 비밀번호 입니다.");
          case "Failed to send sms code.":
            return new Error("SMS 전송 에러발생입니다.");
          case "Invalid authentication code":
            return new Error("잘못된 인증번호입니다.");
          case "Failed to send email code":
            return new Error("이메일전송을 실패했습니다.");
          case "Invalid request":
            return new Error("잘못된 요청값입니다");
          case "Duplicate password exists.":
            return new Error("중복된 비밀번호가 존재합니다.");
          case "Duplicate folder exists.":
            return new Error("중복된 폴더가 존재합니다.");
          case "Duplicate post exists.":
            return new Error("중복된 게시글이 존재합니다.");
          case "Duplicate email exists.":
            return new Error("중복된 이메일이 존재합니다.");
          case "Duplicate member exists.":
            return new Error("중복된 사용자가 존재합니다.");
          case "Duplicate phone number exists.":
            return new Error("중복된 전화번호가 존재합니다.");
          case "Duplicate category exists.":
            return new Error("중복된 카테고리가 존재합니다.");
          case "Duplicate company exists.":
            return new Error("중복된 회사가 존재합니다.");
          case "The maximum number of folders has been exceeded.":
            return new Error("최대 폴더 갯수를 초과하였습니다.");
          default:
            return;
        }

      case 401:
        removeCookie("access_token");
        window.location.pathname.includes("admin")
          ? window.location.replace("/admin/login")
          : window.location.replace("/");
        return new Error("토큰이 유효하지 않습니다. 다시 로그인 해주세요.");

      case 403:
        switch (errorMessage) {
          case "You are not authorized to read this post.":
            return new Error("읽을 수 있는 권한이 없습니다.");
          case "You are not authorized to edit this post.":
            return new Error("수정할 수 있는 권한이 없습니다.");
          case "You are not authorized to edit this comment.":
            return new Error("수정할 수 있는 권한이 없습니다.");
          case "You are not authorized to delete this comment.":
            return new Error("삭제할 수 있는 권한이 없습니다.");
          case "ADMIN permission is required.":
            return new Error("ADMIN 권한이 필요합니다.");
          case "ADMIN accounts cannot be deleted.":
            return new Error("ADMIN 계정은 삭제할 수 없습니다.");
          case "You cannot change your position to an ADMIN account.":
            return new Error("ADMIN 계정으로 직책을 변경할 수 없습니다.");
          case "ADMIN accounts cannot change its position.":
            return new Error("ADMIN 계정은 직책을 변경할 수 없습니다.");
          default:
            return;
        }
      case 404:
        switch (errorMessage) {
          case "That account(member) does not exist.":
            return new Error("해당 계정이 존재하지 않습니다.");
          case "The category does not exist.":
            return;
          //  new Error("카테고리가 존재하지 않습니다.");
          case "The post does not exist.":
            return new Error("게시글이 존재하지 않습니다.");
          case "The post does not exist in the company.":
            return new Error("해당 게시물이 회사에 존재하지 않습니다.");
          case "The comment does not exist.":
            return;
          //  new Error("댓글이 존재하지 않습니다.");
          case "The folder does not exist.":
            return;
          //  new Error("폴더가 존재하지 않습니다.");
          case "The user's folder does not exist.":
            return new Error("해당 폴더가 존재하지 않습니다.");
          case "The company does not exist.":
            return new Error("해당 회사가 존재하지 않습니다.");
          case "The position does not exist.":
            return new Error("해당 직책이 존재하지 않습니다.");
          default:
            return;
        }
      default:
        return;
    }
  }
);
