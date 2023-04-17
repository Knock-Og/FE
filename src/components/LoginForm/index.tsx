import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { setCookie } from "api/cookies";
import { LOGIN } from "api";
import { Alert } from "components";
import { errorState } from "store/atoms";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const setError = useSetRecoilState(errorState);

  const { mutate: login } = useMutation(LOGIN.login, {
    onSuccess: (response) => {
      if (`${response}`.includes("Error")) {
        return setError(`${response}`);
      }
      setCookie("access_token", response.headers.authorization.substr(7));
      navigate("/main");
    },
  });

  const onChangePw = () => setShowPw(!showPw);

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || email.trim() === "")
      return setError("이메일을 입력해주세요!");
    if (password.trim() === "") return setError("비밀번호를 입력해주세요!");

    login({ email, password });
    setEmail("");
    setPassword("");
  };
  const findId = () => {
    navigate("/login/findId");
  };
  const findPw = () => {
    navigate("/login/findPw");
  };
  return (
    <>
      <Alert />
      <StLoginBg>
        <StLoginWrap>
          <StLogin>
            <StLogo
              width="161"
              height="42"
              viewBox="0 0 161 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_108_152)">
                <path d="M29.0008 25.1561L41.361 41.8904H33.7484L24.7444 29.66L19.26 35.6035V41.9134H13.039V12.4179H19.26V26.5959L32.8056 12.34H41.2124L29.0008 25.1561Z" />
                <path d="M68.3581 41.7519H62.8314L51.217 25.7938V41.7576H46.3451V18.5807H51.8718L63.4741 34.6369V18.5807H68.3581V41.7519Z" />
                <path d="M136.807 28.6011L146.509 41.7519H140.533L133.463 32.1412L129.158 36.7893V41.7432H124.281V18.601H129.165V29.7321L139.803 18.5375H146.391L136.807 28.6011Z" />
                <path d="M84.7807 18.324C77.4532 18.324 72.4388 23.676 72.4388 30.1533C72.4388 36.6306 77.4532 41.9827 84.7807 41.9827C92.1083 41.9827 97.1197 36.6595 97.1197 30.1533C97.1197 23.6472 92.1053 18.324 84.7807 18.324ZM84.7807 37.9607C83.408 37.9744 82.0611 37.6053 80.9062 36.899C83.3862 36.2584 85.2476 33.5983 85.2476 30.4101C85.2476 26.9883 83.1012 24.1723 80.3454 23.8145C81.6046 22.861 83.1717 22.3513 84.7807 22.3719C89.3737 22.3719 92.2356 26.1977 92.2356 30.162C92.2356 34.1263 89.3737 37.9607 84.7807 37.9607Z" />
                <path d="M111.678 37.9607C110.415 37.9725 109.176 37.6336 108.113 36.9855C111.244 36.5585 113.67 33.7772 113.67 30.4101C113.67 26.8151 110.911 23.8895 107.464 23.7741C108.644 22.8347 110.14 22.3309 111.678 22.3546C112.738 22.361 113.781 22.6087 114.721 23.077C115.66 23.5453 116.468 24.2206 117.077 25.0465L120.194 21.7747C119.096 20.684 117.779 19.8152 116.32 19.2203C114.862 18.6254 113.292 18.3166 111.705 18.3124C104.378 18.2836 99.6875 23.6645 99.6875 30.1418C99.6875 36.6191 104.378 41.9712 111.705 41.9712C115.434 42.0317 118.038 40.6238 120.194 38.5089L116.859 35.4188C116.279 36.2125 115.503 36.859 114.6 37.302C113.697 37.7451 112.694 37.9712 111.678 37.9607Z" />
                <path d="M150.935 32.2566L154.364 13.9817L160.5 14.9598L157.059 33.2953L150.935 32.2566Z" />
                <path d="M150.004 37.5222C150.07 37.148 150.213 36.7899 150.424 36.4684C150.635 36.1468 150.911 35.868 151.236 35.648C151.561 35.4279 151.928 35.271 152.316 35.1862C152.705 35.1013 153.107 35.0902 153.5 35.1534L153.648 35.1765C154.042 35.2387 154.418 35.3742 154.757 35.5752C155.095 35.7762 155.388 36.0387 155.62 36.3477C155.851 36.6568 156.016 37.0062 156.106 37.3761C156.195 37.7459 156.207 38.1289 156.14 38.5031C156.075 38.8781 155.932 39.237 155.72 39.5592C155.508 39.8815 155.231 40.1607 154.906 40.3808C154.58 40.6009 154.212 40.7576 153.822 40.8419C153.433 40.9262 153.029 40.9364 152.636 40.8719L152.487 40.8488C152.095 40.7855 151.719 40.6493 151.382 40.4479C151.045 40.2465 150.752 39.9838 150.522 39.6749C150.291 39.366 150.127 39.0169 150.038 38.6475C149.949 38.2781 149.938 37.8957 150.004 37.5222Z" />
                <path d="M25.6518 5.65549L20.8659 7.62556L21.8287 9.74406L26.6147 7.77398L25.6518 5.65549Z" />
                <path d="M15.8791 0.00415367L15.131 6.04726L17.5396 6.31735L18.2878 0.27425L15.8791 0.00415367Z" />
                <path d="M6.58541 1.74617L4.79184 3.2999L8.30193 6.96978L10.0955 5.41605L6.58541 1.74617Z" />
                <path d="M1.11673 9.25766L0.499229 11.4898L6.955 13.1073L7.5725 10.8752L1.11673 9.25766Z" />
                <path d="M7.00938 15.8808L1.11909 19.985L2.55185 21.8474L8.44214 17.7431L7.00938 15.8808Z" />
              </g>
            </StLogo>
            <StExplanation>e-mail을 사용하여 로그인 하세요</StExplanation>
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
            <StLink>
              <StLinkli onClick={() => findId()}>아이디 찾기</StLinkli>
              <StLinkli onClick={() => findPw()}>비밀번호 찾기</StLinkli>
            </StLink>
          </StLogin>
        </StLoginWrap>
      </StLoginBg>
    </>
  );
};

export default LoginForm;

const StLoginBg = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StLoginWrap = styled.div`
  width: 700px;
  padding: 0 115px;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  border: 1px solid ${(props) => props.theme.borderColor};
  height: 630px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
`;

const StLogo = styled.svg`
  fill: ${(props) => props.theme.keyBlue};
`;
const StExplanation = styled.p`
  font-weight: 500;
  color: ${(props) => props.theme.greyLight};
  margin: 25px auto 40px;
`;
const StLogin = styled.div`
  width: 100%;
`;
const StLoginForm = styled.form``;
const StLoginUl = styled.ul``;
const StLoginLi = styled.li`
  margin-bottom: 20px;
  position: relative;
`;
const StInput = styled.input`
  width: 100%;
  height: 70px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  padding: 0 25px;
  font-weight: 500;
  outline: 0;
  &::placeholder {
    color: #c9c9c9;
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.keyBlue};
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
  background: ${(props) => props.theme.keyBlue};
  border-radius: 10px;
  font-weight: 500;
  height: 64px;
  border: 0;
  color: ${(props) => props.theme.textwhite};
  cursor: pointer;
`;
const StLink = styled.ul`
  margin-top: 30px;
  line-height: 1;
  text-align: center;
  display: flex;
  justify-content: center;
`;
const StLinkli = styled.li`
  font-weight: 500;
  color: ${(props) => props.theme.keyBlue};
  font-size: 14px;
  cursor: pointer;
  &:first-child {
    margin-right: 18px;
    padding-right: 18px;
    border-right: 1px solid ${(props) => props.theme.textwhite};
  }
`;
