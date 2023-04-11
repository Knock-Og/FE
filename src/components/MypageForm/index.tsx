import styled from "styled-components";
import { useState } from "react";
import { MyPostContent, MyPickContent } from "components";
import { Close } from "assets";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MYPAGEPW } from "api";
const MypageForm = () => {
  const tabs = [
    { name: "내 게시물", render: () => <MyPostContent /> },
    { name: "내 카테고리", render: () => <MyPickContent /> },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [changPw, setChangPw] = useState(false);
  const [currntPw, setCurrntPw] = useState(false);
  const changPwBtn = () => {
    setChangPw(!changPw);
    setCurrntPw(false);
  };
  const nextPwBtn = () => {
    if (password.trim() === "") return alert("현재비밀번호를 적어주세요") 
    if (!checkPassword) return alert("현재비밀번호를 적어주세요");
    setCurrntPw(true);
  };
   const queryClient = useQueryClient();
   const pwMutation = useMutation("getPw", MYPAGEPW.getPwData, {
     onSuccess: (response) => {
       queryClient.invalidateQueries("getPw");
       alert("비밀번호가 일치합니다.");
       
     },
     onError: (response) => {
       queryClient.invalidateQueries("getPw");
       alert("비밀번호가 일치하지 않습니다.");
       
     },
   });
  const [password, setPassword] = useState("");
  const [passwordBoolean, setPasswordBoolean] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const passwordRegex =
    /^.*(?=^.{8,32}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  //비밀번호 유효성검사
  const currentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    const isValidPassword = passwordRegex.test(passwordValue);
    setPasswordBoolean(!isValidPassword);
    setPasswordMsg(
      isValidPassword
        ? ""
        : "비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8-32자 이내로 입력해주세요"
    );
  };
  const checkPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault();
    if (password.trim() === "") return alert("비밀번호를 입력해주세요!");
     pwMutation.mutate({ password });
    
  };
  const { isLoading, isError, data } = useQuery("userdata", MYPAGEPW.getUserData);
  if(isLoading) return <h1>로딩중...</h1>
  if (isError) return <h1>에러...</h1>;
  const userDate = data?.data


  return (
    <StMypageWrap>
      <StMypageTop>
        <StMyname>{userDate.memberName}</StMyname>
        <StMyEmail>
          이메일 주소 <StMyEmailSpan>{userDate.email}</StMyEmailSpan>
        </StMyEmail>
        <StBotton onClick={() => changPwBtn()}>비밀번호 변경하기</StBotton>
      </StMypageTop>
      <StMypageBottom>
        <StTapWrap>
          {tabs.map((tab, index) => (
            <StTapLink
              key={index}
              onClick={() => setActiveTab(index)}
              className={activeTab === index ? "active" : ""}
            >
              {tab.name}
            </StTapLink>
          ))}
        </StTapWrap>
        <StContentWrap>{tabs[activeTab].render()}</StContentWrap>
      </StMypageBottom>

      <StChangPwWrap className={changPw ? "on" : "off"}>
        <StChangPw className={changPw ? "on" : "off"}>
          <StTitle>비밀번호 변경</StTitle>
          <StSpan>현재 비밀번호</StSpan>
          <StInputWrap>
            <StInput
              type="password"
              placeholder="비밀번호를 적어주세요"
              value={password}
              onChange={currentPassword}
            />
            {passwordBoolean && <StErrorMsg>{passwordMsg}</StErrorMsg>}
            <StButton type="button" onClick={checkPassword}>
              확인
            </StButton>
          </StInputWrap>
          <StNext onClick={() => nextPwBtn()}>다음</StNext>
          <StIoClose onClick={() => changPwBtn()} />
        </StChangPw>
        {currntPw && (
          <StCurrntPw className={changPw ? "on" : "off"}>
            <StTitle>비밀번호 변경</StTitle>
            <StIoClose onClick={() => changPwBtn()} />
          </StCurrntPw>
        )}

        <StChangePwBg
          className={changPw ? "on" : "off"}
          onClick={() => changPwBtn()}
        />
      </StChangPwWrap>
    </StMypageWrap>
  );
};
export default MypageForm;


const StMypageWrap = styled.div`
padding:60px 0;
`
const StMypageTop = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 30px;
  padding-bottom: 30px;
  &::after {
    width: 910px;
    height: 1px;
    background: ${(props) => props.theme.keyBlue};
    content: '';
    position:absolute;
    left:0;
    right:0;
    margin:0 auto;
    bottom:0;
  }
`;
const StMyname = styled.h4`
  font-weight: 700;
  font-size: 36px;
  line-height: 45px;
`;
const StMyEmail = styled.em`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px 0;
  font-weight: 700;
  font-size: 18px;
`;
const StMyEmailSpan = styled.span`
  font-weight: 500;
  display:block;
  margin-left:24px;
`;
const StBotton = styled.button`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 22px;
  color: ${(props) => props.theme.keyBlue};
  text-decoration-line: underline;
  background:transparent;
  border:0;
  outline: 0;
  cursor: pointer;
`;
const StMypageBottom = styled.div``
const StTapWrap = styled.div`
  display: flex;
  gap: 3.63%;
  justify-content: center;
  margin:30px 0;
`;
const StTapLink = styled.button`
  background: none;
  border: 0;
  font-weight: 700;
  font-size: 1.25rem;
  cursor: pointer;
  &.active {
    color: ${(props) => props.theme.keyBlue};
    text-decoration-line: underline;
  }
`;
const StContentWrap = styled.div``;
const StChangPwWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 99;
  transition: visibility 0.3s ease-in-out;
  visibility: hidden;
  &.off {
    visibility: hidden;
    transition-delay: 0.5s ease-in-out;
  }
  &.on {
    visibility: visible;
  }
`;
const StChangPw = styled.div`
  width: 712px;
  height: 390px;
  position: absolute;
  background: ${(props) => props.theme.bgColor};
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  border-radius: 10px;
  margin: auto;
  transition: transform 0.3s ease-out;
  transform: translateY(100px);
  transition-delay: 0.5s ease-in-out;
  z-index: 10;
  padding: 70px 85px;
  &.on {
    transition-delay: 0.5s ease-in-out;
    transform: translateY(0);
  }
  &.off {
    transform: translateY(100px);
  }
`;
const StChangePwBg = styled.div`
  background: rgba(18, 18, 18, 0.4);
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  width: 100%;
  min-height: 100vh;
  &.on {
    opacity: 1;
  }
  &.off {
    transition-delay: 1s ease-in-out;
    opacity: 0;
  }
`;

const StTitle = styled.em`
  display: block;
  text-align: center;
  font-weight: 900;
  font-size: 2rem;
  margin-bottom:50px;
`;
const StInputWrap = styled.div`
  position:relative;
`;
const StSpan = styled.p`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom:10px;
`;
const StInput = styled.input`
  width: 100%;
  height: 57px;
  padding: 0 15px;
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 10px;
  outline: 0;
  &:focus {
    border: 1px solid ${(props) => props.theme.keyBlue};
  }
  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }
`;
const StButton = styled.button`
  position: absolute;
  position: absolute;
  right: 0;
  top: 0px;
  font-size: 0.875rem;
  border-radius: 0 5px 5px 0;
  width: 100px;
  height: 57px;
  color: ${(props) => props.theme.textwhite};
  outline: 0;
  border: 0;
  cursor: pointer;
  background: ${(props) => props.theme.keyBlue};
`;

const StErrorMsg = styled.p`
  color: ${(props) => props.theme.textRed};
  font-size: 0.75rem;
  margin-top: 10px;
`;

const StIoClose = styled(Close)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: all 0.3s;
  stroke: ${(props) => props.theme.lightGrey};
  &:hover {
    transform: rotatez(180deg);
  }
`;

const StNext = styled.button`
  width: 95px;
  height: 57px;
  color: ${(props) => props.theme.textwhite};
  background: ${(props) => props.theme.keyBlue};
  border: 0;
  border-radius: 10px;
  margin: 30px auto 0;
  cursor: pointer;
  display: block;
`;


const StCurrntPw = styled.div`
  width: 712px;
  height: 390px;
  position: absolute;
  background: ${(props) => props.theme.bgColor};
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  border-radius: 10px;
  margin: auto;
  transition: transform 0.3s ease-out;
  transform: translateY(100px);
  transition-delay: 0.5s ease-in-out;
  z-index: 10;
  padding: 70px 85px;
  &.on {
    transition-delay: 0.5s ease-in-out;
    transform: translateY(0);
  }
  &.off {
    transform: translateY(100px);
  }
`;