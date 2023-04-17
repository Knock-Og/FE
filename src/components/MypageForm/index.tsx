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

  return (
    <StMypageWrap>
      <StMypageTop>
        <StMyname>{data?.data.memberName}</StMyname>
        <StMyEmail>
          이메일 주소 <StMyEmailSpan>{data?.data.email}</StMyEmailSpan>
        </StMyEmail>
        <StMyEmail>
          직위 <StMyEmailSpan>{data?.data.position}</StMyEmailSpan>
        </StMyEmail>
        <StMyEmail>
          휴대폰번호 <StMyEmailSpan>{data?.data.phoneNum}</StMyEmailSpan>
        </StMyEmail>
        <StBotton onClick={() => setChangPw(!changPw)}>
          비밀번호 변경하기
        </StBotton>
      </StMypageTop>
      <StMypageBottom>
        <MyPostContent />
      </StMypageBottom>
      <CurrentPw changPw={changPw} changPwBtn={() => setChangPw(!changPw)} />
    </StMypageWrap>
  );
};
export default MypageForm;

const StMypageWrap = styled.div`
  margin: 200px auto 80px;
  min-width: 1376px;
  width: 1376px;
  @media only screen and (max-width: 1375px) {
    padding: 0px 60px 0 0;
    margin: 200px 60px 80px;
  }
`;
const StMypageTop = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 30px;
  padding: 60px 0px;
  background: ${(props) => props.theme.bgwhite};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 4px 0px;
  border-radius: 10px;
`;
const StMyname = styled.h4`
  font-weight: 700;
  font-size: 2.25rem;
  margin-bottom: 50px;
`;
const StMyEmail = styled.em`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  font-weight: 700;
  font-size: 1.125rem;
`;
const StMyEmailSpan = styled.span`
  font-weight: 500;
  display: block;
  margin-left: 20px;
  font-size: 1.125rem;
`;
const StBotton = styled.button`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 22px;
  color: ${(props) => props.theme.bgBlue};
  text-decoration-line: underline;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
`;
const StMypageBottom = styled.div``;
