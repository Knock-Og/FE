import styled from "styled-components";
import { useState } from "react";
import { MyPostContent, MyPickContent, CurrentPw } from "components";
import {  useQuery } from "react-query";
import { MYPAGEPW } from "api";

const MypageForm = () => {
  const tabs = [
    { name: "내 게시물", render: () => <MyPostContent /> },
    { name: "내 카테고리", render: () => <MyPickContent /> },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [changPw, setChangPw] = useState(false);
  const changPwBtn = () => {
    setChangPw(!changPw);
  };

  
  //조회부분
  const { isLoading, isError, data } = useQuery(
    "userdata",
    MYPAGEPW.getUserData
  );
  if (isLoading) return <h1>로딩중...</h1>;
  if (isError) return <h1>에러...</h1>;
  const userDate = data?.data;

  // tgr%8H%td2x3YS%z
  return (
    <StMypageWrap>
      <StMypageTop>
        <StMyname>{userDate.memberName}</StMyname>
        <StMyEmail>
          이메일 주소 <StMyEmailSpan>{userDate.email}</StMyEmailSpan>
        </StMyEmail>
        <StBotton onClick={() => changPwBtn()}>비밀번호 변경하기</StBotton>
      </StMypageTop>
      <StMypageBottom>
        <StTapWrap>
          {tabs.map((tab, index) => (
            <StTapLink
              key={index}
              onClick={() => setActiveTab(index)}
              className={activeTab === index ? "active" : ""}
            >
              {tab.name}
            </StTapLink>
          ))}
        </StTapWrap>
        <StContentWrap>{tabs[activeTab].render()}</StContentWrap>
      </StMypageBottom>
      <CurrentPw changPw={changPw} changPwBtn={changPwBtn} />
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
const StTapWrap = styled.div`
  display: flex;
  gap: 3.63%;
  justify-content: center;
  margin: 30px 0;
`;
const StTapLink = styled.button`
  background: none;
  border: 0;
  font-weight: 700;
  font-size: 1.25rem;
  cursor: pointer;
  &.active {
    color: ${(props) => props.theme.keyBlue};
    text-decoration-line: underline;
  }
`;
const StContentWrap = styled.div``;
