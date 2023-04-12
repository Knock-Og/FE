import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import { PostDetailTab } from "components";
import { ActiveState, PostDetail } from "types";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const DetailBoard = (post: PostDetail) => {
  const [activeTab, setActiveTab] = useState<ActiveState>({
    comment: false,
    log: false,
    bookmark: false,
  });

  const navigate = useNavigate();

  const handleClickTab = (name: string) => {
    const initTabState = { comment: false, log: false, bookmark: false };
    setActiveTab({ ...initTabState, [name]: true });
  };

  const handleClickEditRouteBtn = () => {
    if (post.editingStatus === "true") {
      alert("현재 다른 사용자가 편집중입니다. 잠시만 기다려주세요.");
      return;
    }
    navigate(`/post/${post.id}/modify`);
  };

  return (
    <>
      <StContainer>
        <StTitleWrapper>
          <StTitle>{post.title}</StTitle>
          <StEditRouteBtn onClick={handleClickEditRouteBtn}>
            수정하기
          </StEditRouteBtn>
        </StTitleWrapper>
        <StOhterUl>
          <StOhterLi>
            <StOhterSpan>작성자명</StOhterSpan> {post.memberName}
          </StOhterLi>
          <StOhterLi>
            <StOhterSpan>읽기권한</StOhterSpan> {post.readablePosition}
          </StOhterLi>
          <StOhterLi>
            <StOhterSpan>수정권한</StOhterSpan> {post.modifyPermission}
          </StOhterLi>
          <StOhterLi>
            <StOhterSpan>조회수</StOhterSpan> {post.postViews}
          </StOhterLi>
          <StOhterLi>
            <StOhterSpan>작성일</StOhterSpan>
            {new Date(post.createdAt)
              .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\//g, ".")}
          </StOhterLi>
        </StOhterUl>
        <ViewerWrap>
          <Viewer initialValue={post.content} />
        </ViewerWrap>

        <StkeyWordWrap>
          {post.keywords.map((item) => {
            return <StkeyWordP key={item}>#{item}</StkeyWordP>;
          })}
        </StkeyWordWrap>
      </StContainer>

      <PostDetailTab
        activeTab={activeTab}
        handleClickTab={handleClickTab}
        postId={post.id}
        folders={post.folders}
      />
    </>
  );
};

export default DetailBoard;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) => props.theme.bgColor};
  border: 20px;
`;

const StTitle = styled.h4`
  width: 100%;
  line-height: 35px;
  padding: 30px 40px;
  font-size: 1.75rem;
  outline: none;
  border-radius: 5px 5px 0 0;
  font-weight: 800;
`;
const StOhterUl = styled.ul`
  border-top: 0;
  padding: 30px 40px;
  display: flex;
  gap: 30px;
  border: 1px solid ${(props) => props.theme.pageBorder};
`;
const StOhterLi = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    width: 1px;
    height: 10px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    background: ${(props) => props.theme.pageBorder};
    content: "";
    right: -15px;
    position: absolute;
  }
`;
const StOhterSpan = styled.span`
  font-weight: 600;
`;
const ViewerWrap = styled.div`
  border: 1px solid ${(props) => props.theme.pageBorder};
  width: 100%;
  border-top: 0;
  padding: 30px 40px;
  min-height: 670px;
`;

const StkeyWordWrap = styled.div`
  border: 1px solid ${(props) => props.theme.pageBorder};
  width: 100%;
  border-top: 0;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 20px;
  gap: 10px;
`;
const StkeyWordP = styled.p`
  color: ${(props) => props.theme.keyBlue};
  word-break: break-word;
`;

const StTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.pageBorder};
`;

const StEditRouteBtn = styled.button`
  width: 120px;
  height: 50px;
  background: ${(props) => props.theme.keyBlue};
  border-radius: 10px;
  color: ${(props) => props.theme.textwhite};
  border: none;
  outline: 0;
  cursor: pointer;
  margin-right: 30px;
`;
