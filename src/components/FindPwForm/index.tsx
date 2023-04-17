import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "api/cookies";
import { FIND } from "api";
const FindPwForm = () => {
  const navigate = useNavigate();
  const idPage = () => {
    navigate("/login/findid");
  };
  const loginPage = () => {
    navigate("/");
  };
 useEffect(() => {
   // 로그인 페이지를 보여주고 있으므로, 로그인되어 있으면 메인 페이지로 이동
   if (getCookie("access_token")) {
     navigate("/main", { replace: true });
   }
 }, [navigate]);
  //이메일 보내기
  const [email, setEmail] = useState("");
  const [emailBoolean, setEmailBoolean] = useState(false);
  const [emailMsg, setEmailMsg] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCheck = e.target.value;
    setEmail(emailCheck);
    const emailBoolean = emailRegex.test(e.target.value);
    setEmailBoolean(!emailBoolean);
    setEmailMsg(emailBoolean ? "" : "이메일형식이 올바르지 않습니다!");
  };
  const queryClient = useQueryClient();
  const emailMutation = useMutation( FIND.findPw, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("findpw");
      return response.data;
    },
  });
  const pwSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || email.trim() === "") return alert("이메일을 적어주세요!");
    if (email.indexOf("@") === -1)
      return alert("'@'를 포함해서 이메일을 작성해주세요!");
    if (emailBoolean) return alert("이메일형식이 올바르지 않습니다!");
    emailMutation.mutate({ email });
  };

  //인증코드
  const [authenticationCode, setAuthenticationCode] = useState("");
  const codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthenticationCode(e.target.value);
  };
  const { mutate: pwFindCodeMutate, data } = useMutation(
    FIND.findPwCode,
    {
      onSuccess: (Response) => {
        queryClient.invalidateQueries("findpw");
        return Response.data;
      },
    }
  );
  const codeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authenticationCode.trim() === "")
      return alert("인증코드를 작성해주세요!");
    pwFindCodeMutate({ authenticationCode, email });
  };
  const copyPw = data?.data.password;
  const copyCode = () => {
    window.navigator.clipboard
      .writeText(copyPw)
      .then(() => alert("임시비밀번호가 복사되었습니다."));
  };

  return (
    <StFindPWBg>
      <StFindPwWrap>
        {data?.data.password ? (
          <StCodeBox>
            <StTitle>임시 비밀번호</StTitle>
            <StCode>
              <StCodePw>{data?.data.password}</StCodePw>
              <StCopy onClick={() => copyCode()}>
                <StCopySvg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                    stroke-width="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                    stroke-width="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  />
                </StCopySvg>
              </StCopy>
            </StCode>
            <StLoginbutton onClick={() => loginPage()}>로그인</StLoginbutton>
          </StCodeBox>
        ) : (
          <StFindBox>
            <StTitle>비밀번호 찾기</StTitle>
            <Stcontent>회원님의 이메일을 입력해주세요.</Stcontent>
            <StPwSubmitForm onSubmit={pwSubmit}>
              <StInputEmail
                type="text"
                placeholder="이메일을 적어주세요"
                value={email}
                onChange={emailChange}
              />
              {emailBoolean && <StErrorMsg>{emailMsg}</StErrorMsg>}
              <Stbutton>인증번호 받기</Stbutton>
            </StPwSubmitForm>
            <StAuthSubmitForm onSubmit={codeSubmit}>
              <StInput
                type="text"
                placeholder="인증코드를 적어주세요"
                value={authenticationCode}
                onChange={codeChange}
              />
              <StNextButton>다음</StNextButton>
            </StAuthSubmitForm>
            <StfondId>
              이메일이 기억나지 않는다면?
              <StfondIdspan onClick={() => idPage()}>이메일 찾기</StfondIdspan>
            </StfondId>
          </StFindBox>
        )}
      </StFindPwWrap>
    </StFindPWBg>
  );
};

export default FindPwForm;

const StFindPWBg = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StFindPwWrap = styled.div`
  width: 700px;
  padding: 0 115px;
  border-radius: 24px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background: ${(props) => props.theme.bgwhite};
  height: 630px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const StFindBox = styled.div`
  width: 100%;
  text-align: center;
`;

const StTitle = styled.h4`
  font-weight: 800;
  font-size: 20px;
`;
const Stcontent = styled.p`
  margin: 15px auto 25px;
`;
const StPwSubmitForm = styled.form`
  position: relative;
`;

const StAuthSubmitForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const StInput = styled.input`
  width: 100%;
  height: 70px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  padding: 0 25px;
  font-weight: 500;
  outline: 0;
  margin-top: 15px;
  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.bgBlue};
  }
`;

const StInputEmail = styled(StInput)`
  padding: 0 175px 0 25px;
  margin-top: 0;
`;

const Stbutton = styled.button`
  width: 150px;
  height: 70px;
  outline: 0;
  border: 0;
  border-radius: 0px 10px 10px 0px;
  position: absolute;
  top: 0;
  right: 0;
  background: ${(props) => props.theme.bgBlue};
  color: ${(props) => props.theme.textwhite};
  font-weight: 500;
  cursor: pointer;
`;
const StNextButton = styled.button`
  border-radius: 10px;
  outline: 0;
  font-weight: 500;
  width: 90px;
  height: 65px;
  border: 0;
  margin-top: 10px;
  background: ${(props) => props.theme.bgBlue};
  color: ${(props) => props.theme.textwhite};
  cursor: pointer;
`;
const StErrorMsg = styled.p`
  color: ${(props) => props.theme.textRed};
  font-size: 0.75rem;
  text-align: left;
  margin-top: 10px;
`;

const StfondId = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 35px;
  justify-content: center;
`;
const StfondIdspan = styled.span`
  display: block;
  margin-left: 30px;
  color: ${(props) => props.theme.textBlue};
  font-weight: 700;
  cursor: pointer;
`;

const StCodeBox = styled.div`
  text-align: center;
  width: 100%;
`;
const StCode = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StCodePw = styled.p`
  font-weight: 500;
  font-size: 20px;
`;
const StCopy = styled.button`
  background: transparent;
  border: 0;
  margin-left: 8px;
  cursor: pointer;

`;
const StCopySvg = styled.svg`
  stroke: ${(props) => props.theme.bgBlue};
  fill: ${(props) => props.theme.bgwhite};
`;

const StLoginbutton = styled.button`
  border: 0;
  width: 100%;
  border-radius: 60px;
  height: 64px;
  background: ${(props) => props.theme.textBlue};
  color: ${(props) => props.theme.textwhite};
  font-weight: 500;
  cursor: pointer;
  outline: 0;
`;
