import React, { useState } from "react";
import styled from 'styled-components';
import { LoginAPI } from "api/index";
const SignUpForm=()=>{
  //회사, 직급, 이름, 이메일, 비밀번호
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [member_name, setMember_name] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordCm, setPasswordCm] = useState("");
  //오류메시지 상태저장
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordCmMsg, setPasswordCmMsg] = useState(false);
  //유효성 검사
  const [isPasswordMsg, setIsPasswordMsg] = useState(false);
  const [isPasswordCmMsg, setIsPasswordCmMsg] = useState(false);

  //이메일 정규표현식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //이메일 확인
  const checkEmailMutation =
    (LoginAPI.CheckEmail,
    {
      onSuccess: (response) => {
        response ? setEmail(true) : setEmail(false);
        if (response) {
          setEmail(true);
          alert("사용가능한 이메일입니다.");
        } else {
          setEmail(false);
          alert("이미 사용중인 이메일입니다.");
        }
      },
    });
  const checkEmail = (e) => {
    e.stopPropagation();
    checkEmailMutation.mutate(e.target.value)
  };
  const EmailChange = (e) => {
    const emailvalue = e.target.value;
    setEmail(emailvalue);
    emailRegex.test(e.target.value)
      ? setIsValidEmail(true)
      : setIsValidEmail(false);
  };

  //비밀번호 정규표현식
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  //비밀번호 유효성검사
  const passwordchange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (passwordValue.length === 0) {
      setIsPasswordMsg(false);
      setPasswordMsg(" ");
    } else if (passwordValue.length < 8 || !passwordRegex.test(passwordValue)) {
      setIsPasswordMsg(true);
      setPasswordMsg("영어,숫자,특수문자를 포함한 8자이상입력해주세요");
    } else {
      setIsPasswordMsg(false);
      setPasswordMsg("사용 가능한 비밀번호입니다");
    }
  };
  //비밀번호 확인 유효성검사
  const passwordCmChange = (e) => {
    const passwordCmValue = e.target.value;
    setPasswordCm(passwordCmValue);
    if (passwordCmValue.length === 0) {
      setIsPasswordCmMsg(false);
      setPasswordCmMsg(" ");
    } else if (password !== passwordCmValue) {
      setIsPasswordCmMsg(true);
      setPasswordCmMsg("비밀번호가 일치하지 않습니다.");
    } else if (password === passwordCmValue) {
      setIsPasswordCmMsg(false);
      setPasswordCmMsg("비밀번호가 일치합니다.");
    }
  };

  const signupSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <SignWrap>
      <Signform onSubmit={signupSubmit}>
        <SignTitle>회원가입</SignTitle>
        <Signul>
          <Signli>
            <SignLeft>회사명</SignLeft>
            <SignRight>
              <SignInput
                type="text"
                name="company"
                value={company}
                placeholder="회사명을 적어주세요"
                onChange={(e) => setCompany(e.target.value)}
              />
            </SignRight>
          </Signli>
          {/* //확인요망 직급*/}
          <Signli>
            <SignLeft>직급</SignLeft>
            <SignRight>
              <SignSelect
                name="position"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              >
                <option value="member">member </option>
                <option value="manager">manager</option>
                <option value="owner ">owner</option>
              </SignSelect>
            </SignRight>
          </Signli>
          <Signli>
            <SignLeft>회원명</SignLeft>
            <SignRight>
              <SignInput
                type="text"
                name="company"
                value={member_name}
                placeholder="회원명을 적어주세요"
                onChange={(e) => setMember_name(e.target.value)}
              />
            </SignRight>
          </Signli>
          {/* //확인요망 이메일*/}
          <Signli>
            <SignLeft>이메일 인증</SignLeft>
            <SignRight>
              <SignInput
                type="text"
                name="email"
                value={email}
                placeholder="이메일 주소를 적어주세요"
                onChange={EmailChange}
              />
              <CheckBtn
                type="button"
                disabled={!isValidEmail}
                value={email}
                onclick={checkEmail}
              >
                중복확인
              </CheckBtn>
            </SignRight>
          </Signli>
          {/* 비밀번호 */}
          <Signli>
            <SignLeft>비밀번호</SignLeft>
            <SignRight>
              <SignInput
                type="password"
                name="password"
                value={password}
                placeholder="비밀번호를 적어주세요"
                onChange={passwordchange}
              />
              {isPasswordMsg && (
                <Errormsg>
                  "영어,숫자,특수문자를 포함한 8자이상입력해주세요"
                </Errormsg>
              )}
              {!isPasswordMsg && password && (
                <Successmsg>사용 가능한 비밀번호입니다</Successmsg>
              )}
            </SignRight>
          </Signli>
          {/* 비밀번호 확인*/}
          <Signli>
            <SignLeft>비밀번호 확인</SignLeft>
            <SignRight>
              <SignInput
                type="password"
                name="passwordCm"
                value={passwordCm}
                placeholder="비밀번호확인"
                onChange={passwordCmChange}
              />
              {isPasswordCmMsg && (
                <Errormsg>비밀번호가 일치하지 않습니다.</Errormsg>
              )}
              {!isPasswordCmMsg && passwordCm && (
                <Successmsg>비밀번호가 일치합니다.</Successmsg>
              )}
            </SignRight>
          </Signli>
        </Signul>
      </Signform>
    </SignWrap>
  );
}

export default SignUpForm



const SignWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Signform = styled.form`
  width: 500px;
`;
const SignTitle = styled.h3`
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 70px;
  padding-bottom: 50px;
  text-align: center;
  border-bottom: 1px solid #ececec;
`;
const Signul = styled.div``;
const Signli = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  &:nth-child(1) {
    margin-top: 0;
  }
`;
const SignLeft = styled.div`
  width: 100px;
`;
const SignRight = styled.div`
  width: calc(100% - 130px);
`;
const SignInput = styled.input`
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
const SignSelect = styled.select`
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
const CheckBtn = styled.button``;
const Errormsg = styled.p`
  color: #ff0000;
`;
const Successmsg = styled.p`
  color: #22cb88;
`;


