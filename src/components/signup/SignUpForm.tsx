import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { LoginAPI } from "api";

const SignUpForm = () => {
  //회사, 직급, 이름, 이메일, 비밀번호
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [memberName, setMemberName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordCm, setPasswordCm] = useState("");
  //오류메시지 상태저장
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordCmMsg, setPasswordCmMsg] = useState("");
  //유효성 검사
  const [isPasswordMsg, setIsPasswordMsg] = useState(false);
  const [isPasswordCmMsg, setIsPasswordCmMsg] = useState(false);

  //이메일 정규표현식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //이메일 확인
  const checkEmailMutation = useMutation("checkEmail", LoginAPI.checkEmail, {
    onSuccess: (response) => {
      if (response) {
        alert("인증이 성공하였습니다.");
      } else {
        alert("인증이 실패하였습니다.");
      }
    },
  });
  const checkEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    checkEmailMutation.mutate(email);
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    emailRegex.test(e.target.value)
      ? setIsValidEmail(true)
      : setIsValidEmail(false);
  };

  //비밀번호 정규표현식 8자~15자 영어 특문 숫자 포함
  const passwordRegex =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  //비밀번호 유효성검사
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue.length === 0) {
      setIsPasswordMsg(false);
      setPasswordMsg(" ");
    } else if (!passwordRegex.test(passwordValue)) {
      setIsPasswordMsg(true);
      setPasswordMsg(
        "영어,숫자,특수문자를 포함한 8자~15자 이내로 입력해주세요"
      );
    } else {
      setIsPasswordMsg(false);
      setPasswordMsg("사용 가능한 비밀번호입니다");
    }
  };
  //비밀번호 확인 유효성검사
  const passwordCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCmValue = e.target.value;
    setPasswordCm(passwordCmValue);
    if (passwordCmValue.length === 0) {
      setIsPasswordCmMsg(true);
      setPasswordCmMsg(" ");
    } else if (password !== passwordCmValue) {
      setIsPasswordCmMsg(true);
      setPasswordCmMsg("비밀번호가 일치하지 않습니다.");
    } else if (password === passwordCmValue) {
      setIsPasswordCmMsg(false);
      setPasswordCmMsg("비밀번호가 일치합니다.");
    }
  };

  const signupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <StSignWrap>
      <StSignForm onSubmit={signupSubmit}>
        <StSignTitle>회원가입</StSignTitle>
        <StSignUl>
          <StSignLi>
            <StSignLeft>회사명</StSignLeft>
            <StSignRight>
              <StSignInput
                type="text"
                name="company"
                value={company}
                placeholder="회사명을 적어주세요"
                onChange={(e) => setCompany(e.target.value)}
              />
            </StSignRight>
          </StSignLi>
          {/* //확인요망 직급*/}
          <StSignLi>
            <StSignLeft>직급</StSignLeft>
            <StSignRight>
              <StSignSelect
                name="position"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              >
                <option value="member">member </option>
                <option value="manager">manager</option>
                <option value="owner ">owner</option>
              </StSignSelect>
            </StSignRight>
          </StSignLi>
          <StSignLi>
            <StSignLeft>회원명</StSignLeft>
            <StSignRight>
              <StSignInput
                type="text"
                name="company"
                value={memberName}
                placeholder="회원명을 적어주세요"
                onChange={(e) => setMemberName(e.target.value)}
              />
            </StSignRight>
          </StSignLi>
          {/* //확인요망 이메일*/}
          <StSignLi>
            <StSignLeft>이메일 인증</StSignLeft>
            <StSignRight>
              <StSignInput
                type="text"
                name="email"
                value={email}
                placeholder="이메일 주소를 적어주세요"
                onChange={emailChange}
              />
              <StCheckBtn
                type="button"
                disabled={!isValidEmail}
                value={email}
                onClick={checkEmail}
              >
                중복확인
              </StCheckBtn>
            </StSignRight>
          </StSignLi>
          {/* 비밀번호 */}
          <StSignLi>
            <StSignLeft>비밀번호</StSignLeft>
            <StSignRight>
              <StSignInput
                type="password"
                name="password"
                value={password}
                placeholder="비밀번호를 적어주세요"
                onChange={passwordChange}
              />
              {isPasswordMsg && <StErrorMsg>{passwordMsg}</StErrorMsg>}
              {!isPasswordMsg && password && (
                <StSuccessMsg>사용 가능한 비밀번호입니다</StSuccessMsg>
              )}
            </StSignRight>
          </StSignLi>
          {/* 비밀번호 확인*/}
          <StSignLi>
            <StSignLeft>비밀번호 확인</StSignLeft>
            <StSignRight>
              <StSignInput
                type="password"
                name="passwordCm"
                value={passwordCm}
                placeholder="비밀번호확인"
                onChange={passwordCmChange}
              />
              {isPasswordCmMsg && <StErrorMsg>{passwordCmMsg}</StErrorMsg>}
              {!isPasswordCmMsg && passwordCm && (
                <StSuccessMsg>비밀번호가 일치합니다.</StSuccessMsg>
              )}
            </StSignRight>
          </StSignLi>
        </StSignUl>
      </StSignForm>
    </StSignWrap>
  );
};

export default SignUpForm;

const StSignWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StSignForm = styled.form`
  width: 500px;
`;
const StSignTitle = styled.h3`
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 70px;
  padding-bottom: 50px;
  text-align: center;
  border-bottom: 1px solid #ececec;
`;
const StSignUl = styled.div``;
const StSignLi = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  &:nth-child(1) {
    margin-top: 0;
  }
`;
const StSignLeft = styled.div`
  width: 100px;
`;
const StSignRight = styled.div`
  width: calc(100% - 130px);
`;
const StSignInput = styled.input`
  width: 100%;
  height: 50px;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ececec;
  &::placeholder {
    color: #bdbdbd;
  }
  &:focus {
    border-bottom: 1px solid #22cb88;
    color: #22cb88;
  }
`;
const StSignSelect = styled.select`
  width: 100%;
  height: 50px;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ececec;
  &:focus {
    border-bottom: 1px solid #22cb88;
    color: #22cb88;
  }
`;
const StCheckBtn = styled.button``;
const StErrorMsg = styled.p`
  color: #ff0000;
`;
const StSuccessMsg = styled.p`
  color: #22cb88;
`;
