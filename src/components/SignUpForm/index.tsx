import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { ADMIN } from "api";
import {SignUpFormProps} from "types"
import { Close } from "assets";
const SignUpForm = ({ modalOpen, onClose }: SignUpFormProps) => {
  // 이름, 이메일
  const [memberName, setMemberName] = useState("");
  const [position, setPosition] = useState("");
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
  const signUpMutation = useMutation("signUp", ADMIN.signUp, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("member");
      return response.data;
    },
    onError: async (response: {
      response: { data: { message: string } };
    }): Promise<string> => {
      queryClient.invalidateQueries("member");
      return response.response.data.message;
    },
  });

  // CONST
  const POSITION_LIST = ["직급을 선택해주세요", "Member", "Manager", "Owner"];
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
    setPhoneNumBoolean(!isphoneNumber);
    setPhoneNumMsg(
      isphoneNumber ? "" : "'-'를 포함한 휴대폰 번호를 정확히 입력하세요!"
    );
    
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
    const isValidEmail = emailRegex.test(e.target.value);
    setIsValidEmailBoolean(isValidEmail);
    setEmailMsg(isValidEmail ? "" : "이메일형식이 올바르지 않습니다!");
  };

  //이메일 중복확인
  const checkEmailMutation = useMutation("checkEmail", ADMIN.checkEmail, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("email");
        alert("사용가능한 이메일 입니다.");
      }
    },
    onError: (response) => {
      if (response) {
        queryClient.invalidateQueries("email");
        alert("중복된 이메일 입니다!");
      }
    },
  });
  //이메일을 서버로 전송..
  const checkEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isValidEmail) return alert("이메일형식이 올바르지 않습니다!");
    checkEmailMutation.mutate(email);
    
    setIsValidEmailBoolean(true);
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
    if (!isValidName) return alert("올바른 형식의 이름이 아닙니다!");
    checkNameMutation.mutate(memberName);
    setIsValidNameBoolean(true);
  };
  //이름 중복확인
  const checkNameMutation = useMutation("checkName", ADMIN.checkName, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("name");
        setIsValidNameBoolean(true);
        alert("사용가능한 이름 입니다!");
      }
    },
    onError: (response) => {
      if (response) {
        queryClient.invalidateQueries("name");
        alert("중복된 이름 입니다!");
      }
    },
  });
  const signupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (position.trim() === "") return alert("직급을 선택해주세요!");
    if (memberName.trim() === "") return alert("이름을 입력해주세요!");
    if (!isValidName) return alert("이름 중복 검사를 수행해주세요!");
    if (!isValidEmail) return alert("이메일 중복 검사를 수행해주세요!");
    if (email.trim() === "") return alert("이메일을 입력해주세요!");
    if (phoneNum.trim() === "") return alert("휴대폰 번호를 입력해주세요!");
    if (password.trim() === "") return alert("비밀번호를 입력해주세요!");
    if (passwordCheck.trim() === "") return alert("비밀번호 확인란을 입력해주세요!");
    
    const isphoneNumber = phoneNumberRegex.test(phoneNum);
    if (!isphoneNumber) return alert("'-'를 포함한 휴대폰 번호를 정확히 입력하세요!");
    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword)
      return alert(
        "비밀번호는 대소문자, 숫자, 특수문자를 포함하여 8-32자 이내로 입력해주세요!"
      );
    if (password !== passwordCheck)
      return alert("비밀번호가 일치하지 않습니다!");

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

  return (
    <StSignWrap>
      <StSignForm onSubmit={signupSubmit}>
        <StTop>
          <svg
            width="214"
            height="52"
            viewBox="0 0 214 52"
            fill="#007FFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_233_2558)">
              <path d="M38.1199 30.6145L54.6516 50.9797H44.4698L32.4268 36.0955L25.0916 43.3287V51.0078H16.771V15.1124H25.0916V32.3666L43.2087 15.0176H54.4529L38.1199 30.6145Z" />
              <path d="M90.7602 50.8111H83.3682L67.834 31.3904V50.8181H61.3178V22.6123H68.7098L84.2278 42.1523V22.6123H90.7602V50.8111Z" />
              <path d="M182.311 34.8068L195.287 50.811H187.295L177.839 39.1151L172.081 44.7717V50.8005H165.556V22.6368H172.089V36.1832L186.317 22.5596H195.129L182.311 34.8068Z" />
              <path d="M112.725 22.2998C102.925 22.2998 96.2181 28.8131 96.2181 36.6959C96.2181 44.5786 102.925 51.092 112.725 51.092C122.526 51.092 129.229 44.6137 129.229 36.6959C129.229 28.778 122.522 22.2998 112.725 22.2998ZM112.725 46.1973C110.889 46.2139 109.088 45.7647 107.543 44.9052C110.86 44.1257 113.35 40.8883 113.35 37.0084C113.35 32.8441 110.479 29.4171 106.793 28.9817C108.477 27.8213 110.573 27.201 112.725 27.2261C118.869 27.2261 122.696 31.882 122.696 36.7064C122.696 41.5309 118.869 46.1973 112.725 46.1973Z" />
              <path d="M148.7 46.1973C147.011 46.2116 145.354 45.7992 143.932 45.0105C148.12 44.4908 151.364 41.106 151.364 37.0084C151.364 32.6334 147.674 29.073 143.064 28.9326C144.642 27.7893 146.643 27.1761 148.7 27.205C150.119 27.2128 151.514 27.5143 152.77 28.0841C154.027 28.654 155.107 29.4758 155.922 30.481L160.09 26.4993C158.622 25.1719 156.86 24.1146 154.909 23.3907C152.959 22.6667 150.859 22.2909 148.737 22.2858C138.936 22.2507 132.663 28.7991 132.663 36.6819C132.663 44.5646 138.936 51.0779 148.737 51.0779C153.724 51.1517 157.207 49.4382 160.09 46.8644L155.63 43.1039C154.854 44.0697 153.817 44.8565 152.609 45.3957C151.401 45.9349 150.059 46.2101 148.7 46.1973Z" />
              <path d="M201.207 39.2558L205.793 17.0156L214 18.2059L209.398 40.5198L201.207 39.2558Z" />
              <path d="M199.962 45.6638C200.05 45.2085 200.241 44.7727 200.523 44.3813C200.806 43.99 201.175 43.6507 201.609 43.3829C202.044 43.1152 202.535 42.9242 203.054 42.8209C203.574 42.7177 204.112 42.7041 204.637 42.7811L204.836 42.8092C205.362 42.8849 205.866 43.0498 206.318 43.2944C206.771 43.539 207.163 43.8585 207.473 44.2345C207.782 44.6106 208.003 45.0359 208.123 45.486C208.242 45.9361 208.258 46.4022 208.169 46.8576C208.081 47.3139 207.89 47.7507 207.607 48.1429C207.323 48.535 206.953 48.8748 206.517 49.1427C206.082 49.4106 205.589 49.6013 205.068 49.7039C204.547 49.8064 204.008 49.8188 203.482 49.7403L203.283 49.7122C202.758 49.6353 202.256 49.4695 201.804 49.2244C201.353 48.9792 200.963 48.6596 200.654 48.2836C200.346 47.9077 200.126 47.4828 200.007 47.0333C199.888 46.5838 199.873 46.1184 199.962 45.6638Z" />
              <path d="M33.6406 6.88273L27.2393 9.28027L28.5271 11.8584L34.9284 9.46089L33.6406 6.88273Z" />
              <path d="M20.5696 0.00505102L19.5689 7.35938L22.7905 7.68808L23.7912 0.333752L20.5696 0.00505102Z" />
              <path d="M8.13924 2.12527L5.74033 4.01611L10.4351 8.48228L12.834 6.59143L8.13924 2.12527Z" />
              <path d="M0.824865 11.2665L-0.0010376 13.9829L8.63355 15.9514L9.45946 13.235L0.824865 11.2665Z" />
              <path d="M8.7063 19.3265L0.828033 24.3213L2.74436 26.5877L10.6226 21.5929L8.7063 19.3265Z" />
            </g>
          </svg>
          <StSignTitle>계정생성</StSignTitle>
          {modalOpen && <StIoClose onClick={onClose} />}
        </StTop>
        <StSignUl>
          <StSignLi>
            <StSignLeft>직급</StSignLeft>
            <StSignRight>
              <StSignSelect
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              >
                {POSITION_LIST.map((item) => (
                  <StSelectOption value={item} key={item}>
                    {item}
                  </StSelectOption>
                ))}
              </StSignSelect>
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
      <StSignBg onClick={onClose} />
    </StSignWrap>
  );
};

export default SignUpForm;

const StSignWrap = styled.div`
  width: 100%;
`;
const StSignBg = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, 0.4);
`;
const StSignForm = styled.form`
  width: 712px;
  background: #fff;
  z-index: 1;
  border-radius: 10px;
  padding: 45px 85px;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  overflow-y: scroll;
  height: 700px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }
`;
const StTop = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;
const StSignTitle = styled.h3`
  font-weight: 900;
  font-size: 2rem;
  margin-top: 40px;
  color: #121212;
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
  color: #121212;
  display: block;
`;
const StSignRight = styled.div`
  width:100%;
  position: relative;
`;
const StSignCommon = `
  width: 100%;
  height: 57px;
  padding: 0 15px;
  border: 1px solid #121212;
  border-radius: 10px;
  outline: 0;
   &:focus {
    border: 1px solid #007fff;
  }
`;
const StSignInput = styled.input`
  ${StSignCommon}
  &::placeholder {
    color: #bdbdbd;
  }
`;
const StSignInputOver = styled(StSignInput)`
  padding:0 105px 0 15px;
`
const StSignSelect = styled.select`
  ${StSignCommon}
  padding: 0px 10px;
`;
const StSelectOption = styled.option`
  padding: 0px;
  margin: 0px;
  
`;
const StSignBtn = `
  height: 57px;
  color: #fff;
  outline:0;
  border:0;
  cursor: pointer;
  background: #007fff;
`;
const StCheckBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0px;
  font-size: 0.875rem;
  border-radius: 0 5px 5px 0;
  width: 100px;
  ${StSignBtn}
`;
const StErrorMsg = styled.p`
  color: #ff0000;
  font-size: 0.75rem;
  margin-top: 10px;
`;
const StSuccessMsg = styled.p`
  color: #007fff;
  font-size: 0.75rem;
  margin-top: 10px;
`;
const StButton = styled.button`
  width: 203px;
  height: 57px;
  ${StSignBtn}
  font-size:1.25rem;
  border-radius: 57px;
  margin: 45px auto 0;
  display: block;
  font-weight: 700;
  letter-spacing: 0.016em;
`;
