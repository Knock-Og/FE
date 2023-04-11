import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { MYPAGEPW } from "api";
import { MyPostContent, CurrentPw } from "components";

const MypageForm = () => {
  const [changPw, setChangPw] = useState(false);

  const { isLoading, isError, data } = useQuery(
    "userdata",
    MYPAGEPW.getUserData
  );
  if (isLoading) return <h1>로딩중...</h1>;
  if (isError) return <h1>에러...</h1>;
  const userDate = data?.data;

  return (
    <StMypageWrap>
      <StMypageTop>
        <StMyname>{userDate.memberName}</StMyname>
        <StMyEmail>
          이메일 주소 <StMyEmailSpan>{userDate.email}</StMyEmailSpan>
        </StMyEmail>
        <StBotton onClick={() => setChangPw(!changPw)}>
          비밀번호 변경하기
        </StBotton>
      </StMypageTop>
      <StMypageBottom>
        <StContentWrap>
          <MyPostContent />
        </StContentWrap>
      </StMypageBottom>
      <CurrentPw changPw={changPw} changPwBtn={() => setChangPw(!changPw)} />
    </StMypageWrap>
  );
};
export default MypageForm;

const StMypageWrap = styled.div`
  padding: 60px 0;
`;
const StMypageTop = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 30px;
  padding-bottom: 30px;
  &::after {
    width: 910px;
    height: 1px;
    background: ${(props) => props.theme.keyBlue};
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 0;
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
  display: block;
  margin-left: 24px;
`;
const StBotton = styled.button`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 22px;
  color: ${(props) => props.theme.keyBlue};
  text-decoration-line: underline;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
`;
const StMypageBottom = styled.div``;

const StContentWrap = styled.div`
  margin: 30px 0;
`;
