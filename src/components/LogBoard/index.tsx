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
            {logs?.map((log, idx) => (
              <StCard key={idx}>
                <StName>
                  <StNameSpan>{log.memberName}</StNameSpan>
                  {log.content.slice(-19, -1)}.
                </StName>

                <StOldText
                  dangerouslySetInnerHTML={{
                    __html: `Old : ${log.oldContent.replace(
                      /<img\s[^>]*>/gi,
                      ""
                    )}`,
                  }}
                />
                <StNewText
                  dangerouslySetInnerHTML={{
                    __html: `New : ${log.newContent.replace(
                      /<img\s[^>]*>/gi,
                      ""
                    )}`,
                  }}
                />
                <StDate>
                  {new Date(log.createDate)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                    .replace(/\//g, ".")
                    .replace(",", "")   }

                  
                </StDate>
              </StCard>
            ))}
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
  background: ${(props) => props.theme.bglightblack};
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
  stroke: ${(props) => props.theme.borderGray};
  &:hover {
    transform: rotatez(180deg);
  }
`;

const StSettingbottom = styled.div`
  height: calc(100% - 100px);
  overflow-y: scroll;
  padding: 20px 0;
  &::-webkit-scrollbar {
    width: 5px;
    background: ${(props) => props.theme.bgToggle};
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollColor};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.bgToggle};
  }
`;
const StCard = styled.div`
  border-radius: 5px;
  background: ${(props) => props.theme.bgGrey};
  padding: 30px;
  width: 332px;
  margin: 0 auto 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StName = styled.p`
  display: block;
  font-weight: 500;
  line-height: 1.6;
`;
const StNameSpan = styled.span`
  color: ${(props) => props.theme.textBlue};
  font-weight: 600;
`;
const StDate = styled.p`
  font-size: 0.875rem;
  margin-top: 20px;
`;

const StOldText = styled.p`
  margin-top: 20px;
  color: ${(props) => props.theme.redLightColor};
  font-weight: 500;
  word-wrap: break-word;
  > p:first-child {
    margin-top: 10px;
  }
  > p > span {
    color: ${(props) => props.theme.redLightColor} 
  }
`;
const StNewText = styled.p`
  margin-top: 20px;
  color: ${(props) => props.theme.greenColor};
  font-weight: 500;
  word-wrap: break-word;
  > p:first-child {
    margin-top: 10px;
  }
  > p > span {
    color: ${(props) => props.theme.greenColor} 
  }
`
