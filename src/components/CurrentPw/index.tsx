import styled from "styled-components"
import { Close } from "assets";
import { MYPAGEPW } from "api";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { CurrenPw } from "types";
const CurrentPw = ({ changPw, changPwBtn }: CurrenPw) => {
    const [password, setPassword] = useState("");
    const [passwordBoolean, setPasswordBoolean] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState("");
    const [pageChage, setPageChage] = useState(false);
    const [passwordCorrect, setPasswordCorrect] = useState(false);

    const passwordRegex =
      /^.*(?=^.{8,32}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const queryClient = useQueryClient();
  const pwMutation = useMutation("getPw", MYPAGEPW.getPwData, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("getPw");
      alert("비밀번호가 일치합니다.");
      setPasswordCorrect(true);
      return response.data;
    },
    onError: async (response: {
      response: { data: { message: string } };
    }): Promise<string> => {
      queryClient.invalidateQueries("getPw");
      alert("비밀번호가 일치하지 않습니다.");
      return response.response.data.message;
    },
  });
  const pwPutMutation = useMutation("getPw", MYPAGEPW.putPwData, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("getPw");
      alert("비밀번호가 변경되었습니다.");
       setPageChage(false);
       changPwBtn();
      return response.data;
    },
  });

  

  //비밀번호 서버 일치안하는지...
  const checkPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (passwordBoolean) return alert("올바른 형식의 비밀번호가 아닙니다.");
    pwMutation.mutate({ password });
  };
  //비밀번호확인란 유효성검사
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

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordBoolean, setNewPasswordBoolean] = useState(false);
  const [newPasswordMsg, setNewPasswordMsg] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckMsg, setPasswordCheckMsg] = useState("");
  const [passwordCheckBoolean, setPasswordCheckBoolean] = useState(false);
  //비밀번호확인란 유효성검사
  const newCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setNewPassword(passwordValue);
    const isValidPassword = passwordRegex.test(passwordValue);
    setNewPasswordBoolean(!isValidPassword);
    setNewPasswordMsg(
      isValidPassword
        ? ""
        : "비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8-32자 이내로 입력해주세요"
    );
  };
  //비밀번호 확인 유효성검사
  const passwordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCheckValue = e.target.value;
    setPasswordCheck(passwordCheckValue);
    const isPasswordCheck = newPassword === passwordCheckValue;
    setPasswordCheckBoolean(!isPasswordCheck);
    setPasswordCheckMsg(
      isPasswordCheck
        ? "비밀번호가 일치합니다."
        : "비밀번호가 일치하지 않습니다!"
    );
  };

  const nextPwBtn = () => {
    if (!passwordCorrect) return alert("비밀번호 확인을 수행해주세요!");
    if (password.trim() === "") return alert("비밀번호를 입력해주세요");
    setPassword("");
    setPageChage(true);
  };
  const putPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValidPassword = passwordRegex.test(newPassword);
    if (!isValidPassword)
      return alert(
        "비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8-32자 이내로 입력해주세요!"
      );
    if (newPassword.trim() === "") return alert("비밀번호를 입력해주세요!");
    if (passwordCheck.trim() === "")
      return alert("비밀번호 확인란을 입력해주세요!");

    if (newPassword !== passwordCheck)
      return alert("비밀번호가 일치하지 않습니다!");
    pwPutMutation.mutate({ newPassword });
  };
  return (
    <>
      <StChangPwWrap className={changPw ? "on" : "off"}>
        {pageChage ? (
          <StCurrntPw className={changPw ? "on" : "off"}>
            <StTitle>비밀번호 변경</StTitle>
            <StCurrntPwEm>새로운 비밀번호를 입력해주세요.</StCurrntPwEm>
            <StCurrntPwContent>
              - 비밀번호는 8 ~ 32 자의 영문 대소문자, 숫자, 특수문자를
              조합하여설정해 주세요.
            </StCurrntPwContent>
            <StCurrntPwContent>
              - 안전을 위해 자주 사용했거나 쉬운 비밀번호가 아닌 새 비밀번호를
              등록하고 주기적으로 변경해 주세요.
            </StCurrntPwContent>
            <StSCurrntpan>비밀번호</StSCurrntpan>
            <StInput
              type="password"
              placeholder="비밀번호를 적어주세요"
              value={newPassword}
              onChange={newCurrentPassword}
            />
            {newPasswordBoolean && <StErrorMsg>{newPasswordMsg}</StErrorMsg>}
            <StSCurrntpan>비밀번호 확인</StSCurrntpan>
            <StInput
              type="password"
              value={passwordCheck}
              placeholder="비밀번호확인"
              onChange={passwordCheckChange}
            />
            {passwordCheckBoolean && (
              <StErrorMsg>{passwordCheckMsg}</StErrorMsg>
            )}
            <StNext type="button" onClick={putPassword}>
              변경
            </StNext>
            <StIoClose onClick={() => changPwBtn()} />
          </StCurrntPw>
        ) : (
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
        )}

        <StChangePwBg
          className={changPw ? "on" : "off"}
          onClick={() => changPwBtn()}
        />
      </StChangPwWrap>
    </>
  );
};
export default CurrentPw;



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
  padding: 70px 70px;
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
  margin-bottom: 50px;
`;
const StInputWrap = styled.div`
  position: relative;
`;
const StSpan = styled.p`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 20px;
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
  height: 650px;
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
  padding: 70px 70px;
  &.on {
    transition-delay: 0.5s ease-in-out;
    transform: translateY(0);
  }
  &.off {
    transform: translateY(100px);
  }
`;
const StCurrntPwEm = styled.em`
  display: block;
  font-weight: 700;
  font-size: 1.125rem;
  color: ${(props) => props.theme.textblack};
  margin-bottom: 15px;
`;
const StCurrntPwContent = styled.p`
  margin-top: 10px;
  font-weight: 500;
  font-size: 0.875rem;
  color: ${(props) => props.theme.textGrey};
`;

const StSCurrntpan = styled.p`
  font-weight: 600;
  font-size: 1.125rem;
  margin: 30px 0 20px;
`;