import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { adminApi } from "api";

const SignUpForm = () => {
  // 이름, 이메일
  const [memberName, setMemberName] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");

  //오류메시지
  const [memberNameMsg, setMemberNameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordCheckMsg, setPasswordCheckMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  //유효성 검사
  const [isValidName, setIsValidNameBoolean] = useState(false);
  const [passwordBoolean, setPasswordBoolean] = useState(false);
  const [passwordCheckBoolean, setPasswordCheckBoolean] = useState(false);
  const [isValidEmail, setIsValidEmailBoolean] = useState(false);

  // 가입
  const queryClient = useQueryClient();
  const signUpMutation = useMutation("signUp", adminApi.signUp, {
    onSuccess: (response) => {
      return response.data;
    },
  });

  //이메일 중복확인
  const checkEmailMutation = useMutation(adminApi.checkEmail, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("email");
        alert("사용가능한 이메일 입니다.");
      } else {
        alert("중복된 이메일 입니다.");
      }
    },
    onError: (response) => {
      if (response) {
        queryClient.invalidateQueries("email");
        alert("실패했습니다.");
      }
    },
  });

  //이름 중복확인
  const checkNameMutation = useMutation(adminApi.checkName, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("name");
        alert("사용가능한 이름 입니다.");
      } else {
        queryClient.invalidateQueries("name");
        alert("중복된 이름 입니다.");
      }
    },
  });

  // CONST
  const POSITION_LIST = ["직급을 선택해주세요", "Member", "Manager", "Owner"];
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  //비밀번호 유효성검사
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    const isValidPassword = passwordRegex.test(passwordValue);
    setPasswordBoolean(!isValidPassword);
    setPasswordMsg(
      isValidPassword
        ? "사용 가능한 비밀번호입니다"
        : "영어,숫자,특수문자를 포함한 8자~15자 이내로 입력해주세요"
    );
  };

  //비밀번호 확인 유효성검사
  const passwordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCheckValue = e.target.value;
    setPasswordCheck(passwordCheckValue);
    const isPasswordCheck = password === passwordCheckValue;
    setPasswordCheckBoolean(!isPasswordCheck);
    setPasswordCheckMsg(
      isPasswordCheck
        ? "비밀번호가 일치합니다."
        : "비밀번호가 일치하지 않습니다."
    );
  };

  //이메일을 서버로 전송..
  const checkEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    checkEmailMutation.mutate(email);
  };

  //이메일 유효성검사
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCheck = e.target.value;
    setEmail(emailCheck);
    const isValidEmail = emailRegex.test(e.target.value);
    setIsValidEmailBoolean(isValidEmail);
    setEmailMsg(isValidEmail ? "" : "이메일형식이 올바르지 않습니다.");
  };

  //이름을 서버로 전송..
  const checkName = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    checkNameMutation.mutate(memberName);
  };

  //이름 유효성검사
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameCheck = e.target.value;
    setMemberName(nameCheck);
    const isValidName = nameCheck.length > 2;
    setIsValidNameBoolean(isValidName);
    setMemberNameMsg(isValidName ? "" : "2자 이상 적어주세요");
  };

  const signupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    if (memberName.trim() === "") return alert("이름을 입력해주세요!");
    if (position.trim() === "") return alert("직급을 선택해주세요!");
    if (password.trim() === "") return alert("비밀번호를 입력해주세요!");
    if (passwordCheck.trim() === "")
      return alert("비밀번호 확인란을 입력해주세요!");
    if (email.trim() === "") return alert("이메일을 입력해주세요!");

    signUpMutation.mutate({
      position,
      memberName,
      password,
      email,
    });

    setMemberName("");
    setPosition("");
    setPassword("");
    setPasswordCheck("");
    setEmail("");
  };

  return (
    <StSignWrap>
      <StSignForm onSubmit={signupSubmit}>
        <StSignTitle>회원가입</StSignTitle>
        <StSignUl>
          <StSignLi>
            <StSignLeft>이메일</StSignLeft>
            <StSignRight>
              <StSignInput
                type="text"
                value={email}
                placeholder="test@test.com"
                onChange={emailChange}
              />
              {!isValidEmail && <StErrorMsg>{emailMsg}</StErrorMsg>}
              <StCheckBtn
                type="button"
                disabled={!isValidEmail}
                onClick={checkEmail}
              >
                중복확인
              </StCheckBtn>
            </StSignRight>
          </StSignLi>
          {/* 확인요망 회원명 */}
          <StSignLi>
            <StSignLeft>회원명</StSignLeft>
            <StSignRight>
              <StSignInput
                type="text"
                value={memberName}
                placeholder="회원명을 적어주세요"
                onChange={nameChange}
              />
              {!isValidName && <StErrorMsg>{memberNameMsg}</StErrorMsg>}
              <StCheckBtn
                type="button"
                disabled={!isValidName}
                onClick={checkName}
              >
                중복확인
              </StCheckBtn>
            </StSignRight>
          </StSignLi>
          {/* 직급*/}
          <StSignLi>
            <StSignLeft>직급</StSignLeft>
            <StSignRight>
              <StSignSelect
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              >
                {POSITION_LIST.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </StSignSelect>
            </StSignRight>
          </StSignLi>
          {/* 확인요망 이메일*/}

          {/* 비밀번호 */}
          <StSignLi>
            <StSignLeft>비밀번호</StSignLeft>
            <StSignRight>
              <StSignInput
                type="password"
                value={password}
                placeholder="비밀번호를 적어주세요"
                onChange={passwordChange}
              />
              {passwordBoolean && <StErrorMsg>{passwordMsg}</StErrorMsg>}
              {!passwordBoolean && password && (
                <StSuccessMsg>{passwordMsg}</StSuccessMsg>
              )}
            </StSignRight>
          </StSignLi>
          {/* 비밀번호 확인*/}
          <StSignLi>
            <StSignLeft>비밀번호 확인</StSignLeft>
            <StSignRight>
              <StSignInput
                type="password"
                value={passwordCheck}
                placeholder="비밀번호확인"
                onChange={passwordCheckChange}
              />
              {passwordCheckBoolean && (
                <StErrorMsg>{passwordCheckMsg}</StErrorMsg>
              )}
              {!passwordCheckBoolean && passwordCheck && (
                <StSuccessMsg>{passwordCheckMsg}</StSuccessMsg>
              )}
            </StSignRight>
          </StSignLi>
        </StSignUl>
        <StButton>가입하기</StButton>
      </StSignForm>
    </StSignWrap>
  );
};

export default SignUpForm;

const StSignWrap = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background:rgba(0,0,0,0.6);
`;
const StSignForm = styled.form`
  width: 500px;
  background:#fff;
  padding:60px;
`;
const StSignTitle = styled.h3`
  font-size: 35px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 40px;
  text-align: center;
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
  width: 110px;
`;
const StSignRight = styled.div`
  width: calc(100% - 140px);
  position: relative;
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
  margin-bottom:5px;
`;
const StSignSelect = styled.select`
  width: 100%;
  height: 50px;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ececec;
`;
const StCheckBtn = styled.button`
  position: absolute;
  right: 0;
  top: 10px;
`;
const StErrorMsg = styled.p`
  color: #ff0000;
`;
const StSuccessMsg = styled.p`
  color: #22cb88;
`;
const StButton = styled.button`
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #000;
  color: #fff;
  cursor: pointer;
`;
