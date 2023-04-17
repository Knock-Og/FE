import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import styled from "styled-components";
import { getCookie } from "api/cookies";
import { FIND } from "api";
const FindIdForm = () => {
  const navigate = useNavigate();
  const pwPage = () => {
    navigate("/login/findPw");
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
  //인증번호 받기
  const [memberName, setMemberName] = useState("");
  const [memberNameBoolean, setMemberNameBoolean] = useState(false);
  const [memberNameMsg, setMemberNameMsg] = useState("");
  const phoneNumberRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  const nameRegex = /^[가-힣a-zA-Z]+$/;
  const [phoneNum, setPhoneNum] = useState("");
  const [phoneNumBoolean, setPhoneNumBoolean] = useState(false);
  const [phoneNumMsg, setPhoneNumMsg] = useState("");
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameCheck = e.target.value;
    setMemberName(nameCheck);
    const memberNameBoolean =
      nameRegex.test(nameCheck) && nameCheck.length >= 2;
    setMemberNameBoolean(!memberNameBoolean);
    setMemberNameMsg(
      memberNameBoolean ? "" : "영문 또는 한글 2자 이상 적어주세요!"
    );
  };
  const phoneNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumCheck = e.target.value;
    setPhoneNum(phoneNumCheck);
    const phoneNumBoolean = phoneNumberRegex.test(phoneNumCheck);
    setPhoneNumBoolean(!phoneNumBoolean);
    setPhoneNumMsg(
      phoneNumBoolean ? "" : "'-'를 포함한 휴대폰 번호를 정확히 입력하세요!"
    );
  };
  const queryClient = useQueryClient();
  const idMutation = useMutation(FIND.findId, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("find");
      return response.data;
    }
  });
  const idSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (memberName.trim() === "") return alert("회원명을 작성해주세요!");
    if (phoneNum.indexOf("-") === -1)
      return alert("'-'를 포함해서 휴대폰번호를 작성해주세요!");
    if (!phoneNum || phoneNum.trim() === "")
      return alert("휴대폰번호를 작성해주세요!");
    if (memberNameBoolean) return alert("이름을 확인해주세요!");
    const isphoneNumber = phoneNumberRegex.test(phoneNum);
    if (!isphoneNumber)
      return alert("'-'를 포함한 휴대폰 번호를 정확히 입력하세요!");
    idMutation.mutateAsync({ memberName, phoneNum });
  };

  const [authenticationCode, setAuthenticationCode] = useState("");
  const codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthenticationCode(e.target.value);
  };
  //인증번호 보내기
  const { mutate: idFindCodeMutate, data } = useMutation(
    FIND.findIdCode,
    {
      onSuccess: (Response) => {
        queryClient.invalidateQueries("find");
        return Response.data;
      }
    }
  );

  const codeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authenticationCode.trim() === "")  return alert("인증코드를 작성해주세요!");
    idFindCodeMutate({ authenticationCode, phoneNum });
    setAuthenticationCode("");
  };

  return (
    <StFindIwBg>
      <StFindIdWrap>
        {data?.data.email ? (
          <StCodeBox>
            <StTitle>이메일 찾기</StTitle>
            <StContent>고객님의 정보와 일치하는 아이디 입니다.</StContent>
            <StCode>
              <StCodePw>{data?.data.email}</StCodePw>
            </StCode>
            <StLoginbutton onClick={() => loginPage()}>로그인</StLoginbutton>
          </StCodeBox>
        ) : (
          <StFindBox>
            <StTitle>이메일 찾기</StTitle>
            <StContent>회원명과 휴대폰번호를 입력해주세요.</StContent>
            <StIdSubmitForm onSubmit={idSubmit}>
              <StInputbox>
                <StInput
                  type="text"
                  placeholder="회원명을 적어주세요"
                  value={memberName}
                  onChange={nameChange}
                />
                {memberNameBoolean && <StErrorMsg>{memberNameMsg}</StErrorMsg>}
              </StInputbox>
              <StInputbox>
                <StInputNum
                  type="text"
                  placeholder="'-'포함한 휴대폰번호를 적어주세요"
                  value={phoneNum}
                  onChange={phoneNumChange}
                />
                {phoneNumBoolean && <StErrorMsg>{phoneNumMsg}</StErrorMsg>}
                <Stbutton>인증번호 받기</Stbutton>
              </StInputbox>
            </StIdSubmitForm>
            <StInputbox>
              <StAuthSubmitForm onSubmit={codeSubmit}>
                <StInput
                  type="text"
                  placeholder="인증코드를 적어주세요"
                  value={authenticationCode}
                  onChange={codeChange}
                />
                <StNextButton>다음</StNextButton>
              </StAuthSubmitForm>
            </StInputbox>

            <StfondPw>
              비밀번호가 기억나지 않는다면?
              <StfondPwspan onClick={() => pwPage()}>
                비밀번호 찾기
              </StfondPwspan>
            </StfondPw>
          </StFindBox>
        )}
      </StFindIdWrap>
    </StFindIwBg>
  );
};

export default FindIdForm;
const StFindIwBg = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StFindIdWrap = styled.div`
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
const StContent = styled.p`
  margin: 15px auto 35px;
`;
const StIdSubmitForm = styled.form``;
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
const StInputbox = styled.div`
  position: relative;
`;
const StInputNum = styled(StInput)`
  padding: 0 175px 0 25px;
  margin-top: 15px;
`;

const Stbutton = styled.button`
  width: 150px;
  height: 70px;
  border-radius: 0px 10px 10px 0px;
  position: absolute;
  top: 15px;
  right: 0;
  background: ${(props) => props.theme.bgBlue};
  color: ${(props) => props.theme.textwhite};
  font-weight: 500;
  cursor: pointer;
  outline: 0;
  border: 0;
`;
const StNextButton = styled.button`
  border-radius: 10px;
  font-weight: 500;
  width: 90px;
  height: 65px;
  border: 0;
  margin-top: 10px;
  outline: 0;
  background: ${(props) => props.theme.bgBlue};
  color: ${(props) => props.theme.textwhite};
  font-weight: 500;
  cursor: pointer;
`;

const StErrorMsg = styled.p`
  color: ${(props) => props.theme.textRed};
  font-size: 0.75rem;
  text-align: left;
  margin-top: 10px;
`;

const StfondPw = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 35px;
  justify-content: center;
`;
const StfondPwspan = styled.span`
  display: block;
  margin-left: 30px;
  color: ${(props) => props.theme.textBlue};
  font-weight: 600;
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
  padding-bottom: 10px;
  border-bottom: 3px solid ${(props) => props.theme.textBlue};
`;
const StCodePw = styled.p`
  font-weight: 500;
  font-size: 20px;
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
