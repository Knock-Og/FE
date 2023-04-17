import { useRecoilState } from "recoil";
import styled from "styled-components";
import { errorState, successState } from "store/atoms";

const Alert = () => {
  const [error, setError] = useRecoilState(errorState);
  const [success, setSuccess] = useRecoilState(successState);

  return (
    <StAlert className={error || success ? "on" : "off"}>
      <StAlertBox className={error || success ? "on" : "off"}>
        <StCloseBtn
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setError(null);
            setSuccess(null);
          }}
        >
          <path
            d="M27.5594 11.4419L10.8927 28.1086"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.8927 11.4419L27.5594 28.1086"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </StCloseBtn>
        <StAlertTitle isError={error ? true : false}>
          {error && "Error !"}
          {success && "Success !"}
        </StAlertTitle>
        <StAlertContent>
          {error && error.includes("Error") ? error.slice(7) : error}
          {success && success}
        </StAlertContent>
      </StAlertBox>
      <StAlertBg
        onClick={() => {
          setError(null);
          setSuccess(null);
        }}
        className={error || success ? "on" : "off"}
      />
    </StAlert>
  );
};

export default Alert;

const StAlert = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 9999;
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

const StAlertBox = styled.div`
  width: 500px;
  height: 250px;
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
  padding: 70px 75px;
  &.on {
    transition-delay: 0.3s ease-in-out;
    transform: translateY(0);
  }
  &.off {
    transform: translateY(100px);
  }
`;

const StAlertTitle = styled.h3<{ isError: boolean }>`
  font-weight: 800;
  font-size: 1.25rem;
  margin-bottom: 35px;
  text-align: center;
  color: ${(props) =>
    props.isError ? props.theme.textRed : props.theme.keyBlue};
`;

const StAlertContent = styled.div`
  width: 100%;
  height: 44px;
  text-align: center;
`;

const StCloseBtn = styled.svg`
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

const StAlertBg = styled.div`
  background: rgba(18, 18, 18, 0.4);
  transition: opacity 0.5s ease-in-out;
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
