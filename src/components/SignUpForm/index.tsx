import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ADMIN } from "api";
import { Alert } from "components";
import { errorState, successState } from "store/atoms";
import { SignUpFormProps } from "types";
import { Close, MainArr } from "assets";

const SignUpForm = ({ modalOpen, onClose }: SignUpFormProps) => {
  const setError = useSetRecoilState(errorState);
  const setSuccess = useSetRecoilState(successState);
  // 이름, 이메일
  const [memberName, setMemberName] = useState("");

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  //오류메시지
  const [memberNameMsg, setMemberNameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordCheckMsg, setPasswordCheckMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [phoneNumMsg, setPhoneNumMsg] = useState("");
  //유효성 검사
  const [isValidName, setIsValidNameBoolean] = useState(false);
  const [passwordBoolean, setPasswordBoolean] = useState(false);
  const [passwordCheckBoolean, setPasswordCheckBoolean] = useState(false);
  const [isValidEmail, setIsValidEmailBoolean] = useState(false);
  const [phoneNumBoolean, setPhoneNumBoolean] = useState(false);
  // 가입
  const queryClient = useQueryClient();
  const signUpMutation = useMutation(ADMIN.signUp, {
    onSuccess: (response) => {
      if (`${response}`.includes("Error")) {
        return setError(`${response}`);
      }
      setSuccess("멤버가 추가되었습니다.");
      queryClient.invalidateQueries("member");
      return response.data;
    },
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^.*(?=^.{8,32}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const phoneNumberRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  const nameRegex = /^[가-힣a-zA-Z]+$/;
  //전화번호 유효성검사
  const phoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumberValue = e.target.value;
    setPhoneNum(phoneNumberValue);
    const isphoneNumber = phoneNumberRegex.test(phoneNumberValue);
    setPhoneNumBoolean(isphoneNumber);
    setPhoneNumMsg(
      isphoneNumber ? "" : "'-'를 포함한 휴대폰 번호를 정확히 입력하세요!"
    );
  };
  //전화번호 중복확인
  const checkPhonenumMutation = useMutation("checkPhonenum", ADMIN.checkPhone, {
    onSuccess: (response) => {
      if (response) {
        if (`${response}`.includes("Error")) {
          return setError(`${response}`);
        }
        queryClient.invalidateQueries("phonenum");
        return setSuccess("사용가능한 번호 입니다.");
      }
    },
  });
  //휴대폰번호을 서버로 전송..
  const checkPhone = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!phoneNumBoolean)
      return setError("휴대폰번호형식이 올바르지 않습니다!");
    checkPhonenumMutation.mutate(phoneNum);
  };
  //비밀번호 유효성검사
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    const isValidPassword = passwordRegex.test(passwordValue);
    setPasswordBoolean(!isValidPassword);
    setPasswordMsg(
      isValidPassword
        ? "사용 가능한 비밀번호입니다"
        : "비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8-32자 이내로 입력해주세요"
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
        : "비밀번호가 일치하지 않습니다!"
    );
  };
  //이메일 유효성검사
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCheck = e.target.value;
    setEmail(emailCheck);
    const isValidEmail = emailRegex.test(emailCheck);
    setIsValidEmailBoolean(isValidEmail);
    setEmailMsg(isValidEmail ? "" : "이메일형식이 올바르지 않습니다!");
  };

  //이메일 중복확인
  const checkEmailMutation = useMutation("checkEmail", ADMIN.checkEmail, {
    onSuccess: (response) => {
      if (response) {
        if (`${response}`.includes("Error")) {
          return setError(`${response}`);
        }
        queryClient.invalidateQueries("email");
        return setSuccess("사용가능한 이메일 입니다.");
      }
    },
    onError: (response) => {
      if (response) {
        queryClient.invalidateQueries("email");
        setError("중복된 이메일 입니다!");
      }
    },
  });
  //이메일을 서버로 전송..
  const checkEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isValidEmail) return setError("이메일형식이 올바르지 않습니다!");
    checkEmailMutation.mutate(email);
  };
  //이름 유효성검사
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameCheck = e.target.value;
    setMemberName(nameCheck);
    const isValidName =
      nameRegex && nameRegex.test(nameCheck) && nameCheck.length >= 2;
    setIsValidNameBoolean(isValidName);
    setMemberNameMsg(isValidName ? "" : "영문 또는 한글 2자 이상 적어주세요!");
  };

  //이름을 서버로 전송..
  const checkName = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isValidName) return setError("올바른 형식의 이름이 아닙니다!");
    checkNameMutation.mutate(memberName);
  };
  //이름 중복확인
  const checkNameMutation = useMutation("checkName", ADMIN.checkName, {
    onSuccess: (response) => {
      if (response) {
        if (`${response}`.includes("Error")) {
          return setError(`${response}`);
        }
        queryClient.invalidateQueries("name");
        setError("사용가능한 이름 입니다!");
      }
    },
    onError: (response) => {
      if (response) {
        queryClient.invalidateQueries("name");
        setError("중복된 이름 입니다!");
      }
    },
  });
  const signupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (position.trim() === "") return setError("직급을 선택해주세요!");
    if (memberName.trim() === "") return setError("이름을 입력해주세요!");
    if (!isValidName) return setError("이름 중복 검사를 수행해주세요!");
    if (!isValidEmail) return setError("이메일 중복 검사를 수행해주세요!");
    if (email.trim() === "") return setError("이메일을 입력해주세요!");
    if (phoneNum.trim() === "") return setError("휴대폰 번호를 입력해주세요!");
    if (password.trim() === "") return setError("비밀번호를 입력해주세요!");
    if (passwordCheck.trim() === "")
      return setError("비밀번호 확인란을 입력해주세요!");

    const isphoneNumber = phoneNumberRegex.test(phoneNum);
    if (!isphoneNumber)
      return setError("'-'를 포함한 휴대폰 번호를 정확히 입력하세요!");
    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword)
      return setError(
        "비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8-32자 이내로 입력해주세요!"
      );
    if (password !== passwordCheck)
      return setError("비밀번호가 일치하지 않습니다!");

    try {
      await signUpMutation.mutateAsync({
        position,
        memberName,
        password,
        email,
        phoneNum,
      });
      setPhoneNum("");
      setMemberName("");
      setPosition("");
      setPassword("");
      setPasswordCheck("");
      setEmail("");
      onClose();
    } catch (error) {
      queryClient.invalidateQueries("member");
      e.stopPropagation();
    }
  };
  const positionList = [
    { id: 0, position: "MEMBER" },
    { id: 1, position: "MANAGER" },
    { id: 2, position: "OWNER" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(positionList[0].position);
  const handleOptionClick = (position: string) => {
    setPosition(position);
    setIsOpen(false);
  };

  return (
    <>
      <Alert />
      <StSignWrap className={modalOpen ? "on" : "off"}>
        <StSignBox className={modalOpen ? "on" : "off"}>
          <StSignForm onSubmit={signupSubmit}>
            <StTop>
              <StSignTitle>계정생성</StSignTitle>
              {modalOpen && <StIoClose onClick={onClose} />}
            </StTop>
            <StSignUl>
              <StSignLi>
                <StSignLeft>직급</StSignLeft>
                <StSignRight>
                  <StSeletLabel onClick={() => setIsOpen(!isOpen)}>
                    {position}
                    <MenuArr />
                  </StSeletLabel>
                  {isOpen && (
                    <StSeletUl>
                      {positionList.map((item) => (
                        <StSeletLi
                          key={item.id}
                          onClick={() => handleOptionClick(item.position)}
                        >
                          {item.position}
                        </StSeletLi>
                      ))}
                    </StSeletUl>
                  )}
                </StSignRight>
              </StSignLi>
              <StSignLi>
                <StSignLeft>회원명</StSignLeft>
                <StSignRight>
                  <StSignInputOver
                    type="text"
                    value={memberName}
                    placeholder="회원명을 적어주세요"
                    onChange={nameChange}
                  />
                  {!isValidName && <StErrorMsg>{memberNameMsg}</StErrorMsg>}
                  <StCheckBtn type="button" onClick={checkName}>
                    중복확인
                  </StCheckBtn>
                </StSignRight>
              </StSignLi>
              <StSignLi>
                <StSignLeft>이메일</StSignLeft>
                <StSignRight>
                  <StSignInputOver
                    type="text"
                    value={email}
                    placeholder="test@test.com"
                    onChange={emailChange}
                  />
                  {!isValidEmail && <StErrorMsg>{emailMsg}</StErrorMsg>}
                  <StCheckBtn type="button" onClick={checkEmail}>
                    중복확인
                  </StCheckBtn>
                </StSignRight>
              </StSignLi>
              <StSignLi>
                <StSignLeft>전화번호</StSignLeft>
                <StSignRight>
                  <StSignInput
                    type="text"
                    value={phoneNum}
                    placeholder="'-'포함 입력"
                    onChange={phoneNumberChange}
                  />
                  {phoneNumBoolean && <StErrorMsg>{phoneNumMsg}</StErrorMsg>}
                  <StCheckBtn type="button" onClick={checkPhone}>
                    중복확인
                  </StCheckBtn>
                </StSignRight>
              </StSignLi>

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
            <StButton>회원가입</StButton>
          </StSignForm>
        </StSignBox>
        <StSignBg onClick={onClose} className={modalOpen ? "on" : "off"} />
      </StSignWrap>
    </>
  );
};

export default SignUpForm;

const StSignWrap = styled.div`
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
const StSignBg = styled.div`
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
const StSignBox = styled.div`
  width: 650px;
  height: 700px;
  position: absolute;
  background: ${(props) => props.theme.bgColor};
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  border-radius: 10px;
  margin: auto;
  overflow: hidden;
  transition: transform 0.3s ease-out;
  transform: translateY(100px);
  transition-delay: 0.3s ease-in-out;
  z-index: 10;
  &.on {
    transition-delay: 0.3s ease-in-out;
    transform: translateY(0);
  }
  &.off {
    transform: translateY(100px);
    transition-delay: 0.3s ease-in-out;
  }
`;
const StSignForm = styled.form`
  overflow-y: scroll;
  height: 100%;
  padding: 65px 65px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollColor};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bgColor};
  }
`;
const StTop = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;
const StSignTitle = styled.h3`
  font-weight: 900;
  font-size: 2rem;
`;
const StIoClose = styled(Close)`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  transition: all 0.3s;
  stroke: ${(props) => props.theme.lightGrey};
  &:hover {
    transform: rotatez(180deg);
  }
`;
const StSignUl = styled.div``;
const StSignLi = styled.div`
  margin-top: 35px;
  &:nth-child(1) {
    margin-top: 0;
  }
`;
const StSignLeft = styled.label`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
`;
const StSignRight = styled.div`
  width: 100%;
  position: relative;
`;

const StSignInput = styled.input`
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
const StSignInputOver = styled(StSignInput)`
  padding: 0 105px 0 15px;
`;

const StCheckBtn = styled.button`
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
const StSuccessMsg = styled.p`
  color: ${(props) => props.theme.keyBlue};
  font-size: 0.75rem;
  margin-top: 10px;
`;
const StButton = styled.button`
  width: 203px;
  height: 57px;
  color: ${(props) => props.theme.textwhite};
  outline: 0;
  border: 0;
  cursor: pointer;
  background: ${(props) => props.theme.keyBlue};
  font-size: 1.25rem;
  border-radius: 57px;
  margin: 45px auto 0;
  display: block;
  font-weight: 700;
  letter-spacing: 0.016em;
`;

const StSeletLabel = styled.p`
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 10px;
  width: 100%;
  height: 57px;
  margin: 0 auto;
  line-height: 57px;
  font-weight: 500;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MenuArr = styled(MainArr)`
  fill: ${(props) => props.theme.lightGrey};
`;
const StSeletUl = styled.ul`
  position: absolute;
  bottom: -175px;
  left: 0;
  background: ${(props) => props.theme.bgColor};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 2px 1px;
  z-index: 1;
  width: 100%;
`;
const StSeletLi = styled.li`
  line-height: 57px;
  padding: 0px 15px;

  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.lightBlue};
    color: ${(props) => props.theme.keyBlue};
  }
`;
