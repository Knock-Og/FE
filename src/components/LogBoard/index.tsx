import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { LOG } from "api";
import { Close } from "assets";
import { Log } from "types";

interface Props {
  open: boolean;
  setOpen: (openTab: string) => void;
  postId: number;
}

const LogBoard = ({ open, setOpen, postId }: Props) => {
  const { data: logs } = useQuery<Log[]>("getLog", () => LOG.getLog(postId));

  useEffect(() => {
    if (open) {
      document.body.style.cssText = `
    top: -${window.scrollY}px;
    width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [open]);

  return (
    <>
      <StSettingWrap className={open ? "on" : "off"}>
        <StSettingBox
          onClick={(e) => e.stopPropagation()}
          className={open ? "on" : "off"}
        >
          <StSettingTop>
            <StSettingTitle>로그</StSettingTitle>
            {setOpen && <StIoClose onClick={() => setOpen("")} />}
          </StSettingTop>

          <StSettingbottom>
            <StCardContainer>
              {logs?.map((log, idx) => (
                <StCard key={idx}>{JSON.stringify(log)}</StCard>
              ))}
            </StCardContainer>
          </StSettingbottom>
        </StSettingBox>

        {setOpen && (
          <StSettingBg
            onClick={() => setOpen("")}
            className={open ? "on" : "off"}
          />
        )}
      </StSettingWrap>
    </>
  );
};

export default LogBoard;

const StCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow: auto;
  gap: 10px;
`;

const StCard = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
  background-color: ${(props) => props.theme.veryLightGrey};
  border: 1px solid ${(props) => props.theme.grey};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StSettingWrap = styled.div`
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
const StSettingBox = styled.div`
  width: 400px;
  height: 100vh;
  position: absolute;
  background: ${(props) => props.theme.bgColor};
  right: 0;
  top: 0;
  transition: transform 0.3s ease-out;
  transform: translateX(500px);
  transition-delay: 0.5s ease-in-out;
  z-index: 10;
  &.on {
    transition-delay: 0.5s ease-in-out;
    transform: translateX(0);
  }
  &.off {
    transform: translateX(500px);
  }
`;

const StSettingBg = styled.div`
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
const StSettingTop = styled.div`
  position: relative;
  height: 100px;
  padding: 0 50px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor}; ;
`;
const StSettingTitle = styled.h4`
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 100px;
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
const StSettingbottom = styled.div`
  padding-bottom: 50px;
  overflow: auto;
  height: 55%;
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
