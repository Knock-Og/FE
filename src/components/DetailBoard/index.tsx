import { useState } from "react";
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

  const handleClickTab = (name: string) => {
    const initTabState = { comment: false, log: false, bookmark: false };
    setActiveTab({ ...initTabState, [name]: true });
  };

  return (
    <>
      <StContainer>
        <StTitle>{post.title}</StTitle>
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
  height: 100vh;
  background: ${(props) => props.theme.bgColor};
  border: 20px;
`;

const StTitle = styled.h4`
  width: 100%;
  line-height: 35px;
  border: 1px solid ${(props) => props.theme.pageBorder};
  padding: 30px 40px;
  font-size: 1.75rem;
  outline: none;
  border-radius: 5px 5px 0 0;
  font-weight: 800;
`;
const StOhterUl = styled.ul`
  border: 1px solid ${(props) => props.theme.pageBorder};
  border-top: 0;
  padding: 30px 40px;
  display: flex;
  gap: 30px;
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
