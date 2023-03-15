import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useMutation } from "react-query";
import { setCookie } from "api/cookies";
import { LoginAPI } from "api";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const navigate = useNavigate();
  //비밀번호 숨김
  const [showPw, setShowPw] = useState(false);
  const onChangePw = () => {
    setShowPw(!showPw);
  };
  //이메일 비밀번호 input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const loginMutation = useMutation("login",LoginAPI.login, {
    onSuccess: (response) => {
      setCookie("access_token", response.headers.authorization);
      navigate('/main')
    },
  });
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "") return alert("이메일을 확인해주세요!");
    if (password.trim() === "") return alert("비밀번호를 확인해주세요!");
    const loginData = {
      email: email,
      password: password,
    };
    loginMutation.mutate(loginData);
    setEmail('')
    setPassword('')
  };

  return (
    <StLoginBg>
      <StLoginWrap>
        <StTop>
          <StTitle>로그인</StTitle>
          <StExplanation>e-mail을 사용하여 로그인 하세요</StExplanation>
        </StTop>
        <StLoginForm onSubmit={loginHandler}>
          <StLoginUl>
            <StLoginLi>
              <StInput
                type="text"
                placeholder="email@email.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </StLoginLi>
            <StLoginLi>
              <StInput
                type={showPw ? "text" : "password"}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <StLoginLabel htmlFor="password">
                {showPw ? (
                  <AiOutlineEye onClick={onChangePw} />
                ) : (
                  <AiOutlineEyeInvisible onClick={onChangePw} />
                )}
              </StLoginLabel>
            </StLoginLi>
          </StLoginUl>
          <StLoginBtn>로그인</StLoginBtn>
        </StLoginForm>
      </StLoginWrap>
    </StLoginBg>
  );
}
const StLoginBg = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StLoginWrap =styled.div`
  width:467px;
`
const StTop = styled.div`
  text-align:center;
  margin-bottom:45px;
`;
const StTitle = styled.em`
  display:block;
  line-height: 1;
  margin-bottom:15px;
  font-size:40px;
  font-weight:800;
  color:#000
`;
const StExplanation = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 1;
  color: #828282;
`;
const StLoginForm = styled.form``;
const StLoginUl = styled.ul``;
const StLoginLi = styled.li`
  margin-top: 20px;
  position: relative;
`;
const StInput = styled.input`
  width: 100%;
  height: 70px;
  border-radius:24px;
  border: 3px solid #cdcdcd;
  padding:0 24px;
  font-weight:300;
  &::placeholder {
    color: #c9c9c9;
  }
`;
const StLoginLabel = styled.label`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
`;
const StLoginBtn = styled.button`
  width: 100%;
  font-weight: 900;
  margin-top: 25px;
  background: #efd34b;
  height: 63px;
  border: 0;
  color: #fff;
  cursor: pointer;
`;


export default LoginForm;
