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
    let success = response.data.statusCode
    if (response.data.statusCode === "202") {
      if (success === "The sms has been sent successfully.") {
        alert("인증번호가 발송되었습니다.");
      }
    } 
    return response;
  },
  (error) => {
    let errorMessage = error.response.data.message;
    if (error.response.data.status === 400) {
      if (errorMessage === "That account(member) does not exist.") {
        alert("해당 계정이 존재하지 않습니다.");
      } else if (errorMessage === "Invalid password") {
        alert("잘못된 비밀번호 입니다.");
      } else if (errorMessage === "Invalid email") {
        alert("잘못된 이메일 입니다.");
      } else if (errorMessage === "Invalid email format") {
        alert("유효한 이메일 형식이 아닙니다.");
      } else if (
        errorMessage ===
        "Passwords must be 8-32 letters long, including upper and lower cases or special characters."
      ) {
        alert(
          "비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8-32자 이내여야 합니다."
        );
      } else if (errorMessage === "Invalid token") {
        alert("토큰이 유효하지 않습니다.");
      } else if (errorMessage === "Invalid request") {
        alert("잘못된 요청값입니다");
      } else if (errorMessage === "Failed to send sms code.") {
        alert("SMS 전송 에러발생입니다.");
      } else if (errorMessage === "Invalid authentication code") {
        alert("잘못된 인증번호입니다.");
      } else if (errorMessage === "Failed to send email code") {
        alert("이메일전송을 실패했습니다.");
      } else if (errorMessage === "Authentication code does not exist.") {
        alert("인증코드가 존재하지 않습니다.");
      } else if (errorMessage === "ADMIN permission is required.") {
        alert("ADMIN 권한이 필요합니다.");
      } else if (
        errorMessage === "You cannot change your position to an ADMIN account."
      ) {
        alert("ADMIN 계정으로 직책을 변경할 수 없습니다.");
      } else if (
        errorMessage === "ADMIN accounts cannot change its position."
      ) {
        alert("ADMIN 계정은 직책을 변경할 수 없습니다.");
      } else if (errorMessage === "Invalid authentication code") {
        alert("잘못된 인증번호입니다.");
      } else if (errorMessage === "ADMIN accounts cannot be deleted.") {
        alert("ADMIN 계정은 삭제할 수 없습니다.");
      } else if (errorMessage === "You are not authorized to edit this post.") {
        alert("수정할 수 있는 권한이 없습니다.");
      } else if (errorMessage === "You are not authorized to read this post.") {
        alert("읽을 수 있는 권한이 없습니다.");
      } else if (errorMessage === "The position does not exist.") {
        alert("해당 직책이 존재하지 않습니다.");
      } else if (errorMessage === "That account(member) does not exist.") {
        alert("해당 계정이 존재하지 않습니다.");
      } else if (errorMessage === "The company does not exist.") {
        alert("해당 회사가 존재하지 않습니다.");
      }
      // else if (errorMessage === "The folder does not exist.") {
      //   alert("해당 폴더가 존재하지 않습니다.");
      // }
      else if (errorMessage === "The post does not exist in the company.") {
        alert("해당 게시물이 회사에 존재하지 않습니다.");
      } else if (errorMessage === "The post does not exist.") {
        alert("해당 게시글이 존재하지 않습니다.");
      } else if (errorMessage === "You are not authorized to read this post.") {
        alert("읽을 수 있는 권한이 없습니다.");
      } else if (errorMessage === "The category does not exist.") {
        alert("해당 카테고리가 존재하지 않습니다.");
      }
      // else if (errorMessage === "The comment does not exist.") {
      //   alert("해당 댓글이 존재하지 않습니다.");
      // }
      else if (errorMessage === "Duplicate company exists.") {
        alert("중복된 회사가 존재합니다.");
      } else if (errorMessage === "Duplicate email exists.") {
        alert("중복된 이메일이 존재합니다.");
      } else if (errorMessage === "Duplicate member exists.") {
        alert("중복된 사용자가 존재합니다.");
      } else if (errorMessage === "Duplicate phone number exists.") {
        alert("중복된 전화번호가 존재합니다.");
      } else if (errorMessage === "Duplicate post exists.") {
        alert("중복된 게시글이 존재합니다.");
      } else if (errorMessage === "Duplicate folder exists.") {
        alert("중복된 폴더가 존재합니다.");
      } else if (errorMessage === "Duplicate category exists.") {
        alert("중복된 카테고리가 존재합니다.");
      } else if (errorMessage === "Duplicate password exists.") {
        alert("중복된 비밀번호가 존재합니다.");
      } else if (
        errorMessage === "The maximum number of folders has been exceeded."
      ) {
        alert("최대 폴더 갯수를 초과하였습니다.");
      }
    }
  }
);

reqWithAccessToken.interceptors.request.use(
  (config) => {
    const access_token = getCookie("access_token");
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
    if (error.response.data.status === 401) {
      console.error(error.response.data.message);
      alert("접속 유효 시간이 지났습니다. 다시 로그인 해주세요.");
      removeCookie("access_token");
      window.location.pathname.includes("admin")
        ? window.location.replace("/admin/login")
        : window.location.replace("/");
    }
    let errorMessage = error.response.data.message;
    if (error.response.data.status === 400) {
      if (errorMessage === "That account(member) does not exist.") {
        alert("해당 계정이 존재하지 않습니다.");
      } else if (errorMessage === "Invalid password") {
        alert("잘못된 비밀번호 입니다.");
      } else if (errorMessage === "Invalid email") {
        alert("잘못된 이메일 입니다.");
      } else if (errorMessage === "Invalid email format") {
        alert("유효한 이메일 형식이 아닙니다.");
      } else if (
        errorMessage ===
        "Passwords must be 8-32 letters long, including upper and lower cases or special characters."
      ) {
        alert(
          "비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8-32자 이내여야 합니다."
        );
      } else if (errorMessage === "Invalid token") {
        alert("토큰이 유효하지 않습니다.");
      } else if (errorMessage === "Invalid request") {
        alert("잘못된 요청값입니다");
      } else if (errorMessage === "Failed to send sms code.") {
        alert("SMS 전송 에러발생입니다.");
      } else if (errorMessage === "Invalid authentication code") {
        alert("잘못된 인증번호입니다.");
      } else if (errorMessage === "Failed to send email code") {
        alert("이메일전송을 실패했습니다.");
      } else if (errorMessage === "Authentication code does not exist.") {
        alert("인증코드가 존재하지 않습니다.");
      } else if (errorMessage === "ADMIN permission is required.") {
        alert("ADMIN 권한이 필요합니다.");
      } else if (
        errorMessage === "You cannot change your position to an ADMIN account."
      ) {
        alert("ADMIN 계정으로 직책을 변경할 수 없습니다.");
      } else if (
        errorMessage === "ADMIN accounts cannot change its position."
      ) {
        alert("ADMIN 계정은 직책을 변경할 수 없습니다.");
      } else if (errorMessage === "Invalid authentication code") {
        alert("잘못된 인증번호입니다.");
      } else if (errorMessage === "ADMIN accounts cannot be deleted.") {
        alert("ADMIN 계정은 삭제할 수 없습니다.");
      } else if (errorMessage === "You are not authorized to edit this post.") {
        alert("수정할 수 있는 권한이 없습니다.");
      } else if (errorMessage === "You are not authorized to read this post.") {
        alert("읽을 수 있는 권한이 없습니다.");
      } else if (errorMessage === "The position does not exist.") {
        alert("해당 직책이 존재하지 않습니다.");
      } else if (errorMessage === "That account(member) does not exist.") {
        alert("해당 계정이 존재하지 않습니다.");
      } else if (errorMessage === "The company does not exist.") {
        alert("해당 회사가 존재하지 않습니다.");
      }
      // else if (errorMessage === "The folder does not exist.") {
      //   alert("해당 폴더가 존재하지 않습니다.");
      // }
      else if (errorMessage === "The post does not exist in the company.") {
        alert("해당 게시물이 회사에 존재하지 않습니다.");
      } else if (errorMessage === "The post does not exist.") {
        alert("해당 게시글이 존재하지 않습니다.");
      } else if (errorMessage === "You are not authorized to read this post.") {
        alert("읽을 수 있는 권한이 없습니다.");
      } else if (errorMessage === "The category does not exist.") {
        alert("해당 카테고리가 존재하지 않습니다.");
      }
      // else if (errorMessage === "The comment does not exist.") {
      //   alert("해당 댓글이 존재하지 않습니다.");
      // }
      else if (errorMessage === "Duplicate company exists.") {
        alert("중복된 회사가 존재합니다.");
      } else if (errorMessage === "Duplicate email exists.") {
        alert("중복된 이메일이 존재합니다.");
      } else if (errorMessage === "Duplicate member exists.") {
        alert("중복된 사용자가 존재합니다.");
      } else if (errorMessage === "Duplicate phone number exists.") {
        alert("중복된 전화번호가 존재합니다.");
      } else if (errorMessage === "Duplicate post exists.") {
        alert("중복된 게시글이 존재합니다.");
      } else if (errorMessage === "Duplicate folder exists.") {
        alert("중복된 폴더가 존재합니다.");
      } else if (errorMessage === "Duplicate category exists.") {
        alert("중복된 카테고리가 존재합니다.");
      } else if (errorMessage === "Duplicate password exists.") {
        alert("중복된 비밀번호가 존재합니다.");
      } else if (
        errorMessage === "The maximum number of folders has been exceeded."
      ) {
        alert("최대 폴더 갯수를 초과하였습니다.");
      }
    }

    return Promise.reject(error);
  }
);
