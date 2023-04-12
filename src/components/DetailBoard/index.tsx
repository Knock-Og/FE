import { useState } from "react";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import { Comment, CommentBlue, LogBlue, Log, StarBlue, Star } from "assets";
import { BookmarksBoard, CommentBoard, LogBoard } from "components";
import { PostDetail } from "types";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const DetailBoard = (post: PostDetail) => {
  const [select, setSelect] = useState<string>();
  // const [activeTab, setActiveTab] = useState<ActiveState>();
  const [isActiveComment, setIsActiveComment] = useState<boolean>(false);
  const [isActiveLog, setIsActiveLog] = useState<boolean>(false);
  const [isActiveBookmark, setIsActiveBookmark] = useState<boolean>(false);
  const [isBookmarksBoardOpen, setIsBookmarksBoardOpen] =
    useState<boolean>(false);
  const [selectedFolders, setSelectedFolders] = useState<number[]>(
    post.folders
  );

  const selectComponent: Record<string, JSX.Element> = {
    comment: <CommentBoard postId={post.id} />,
    log: <LogBoard postId={post.id} />,
    bookmark: (
      <BookmarksBoard
        postId={post.id}
        open={isBookmarksBoardOpen}
        setOpen={setIsBookmarksBoardOpen}
        selectedFolders={selectedFolders}
        setSelectedFolders={setSelectedFolders}
      />
    ),
  };

  // const handleClickTab = () => {};

  const handleClickComment = () => {
    setSelect("comment");
    setIsActiveComment(true);
    setIsActiveLog(false);
    setIsActiveBookmark(false);
  };

  const handleClickLog = () => {
    setSelect("log");
    setIsActiveComment(false);
    setIsActiveLog(true);
    setIsActiveBookmark(false);
  };

  const handleClickBookmark = () => {
    setSelect("bookmark");
    setIsActiveComment(false);
    setIsActiveLog(false);
    setIsActiveBookmark(true);
    setIsBookmarksBoardOpen(true);
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
            return <StkeyWordP>{item}</StkeyWordP>;
          })}
        </StkeyWordWrap>
      </StContainer>
      <StBox>
        <StIcon>
          {isActiveComment ? (
            <CommentBlue onClick={handleClickComment} />
          ) : (
            <Comment onClick={handleClickComment} />
          )}
          {isActiveLog ? (
            <LogBlue onClick={handleClickLog} />
          ) : (
            <Log onClick={handleClickLog} />
          )}
          {isActiveBookmark ? (
            <StarBlue onClick={handleClickBookmark} />
          ) : (
            <Star onClick={handleClickBookmark} />
          )}
        </StIcon>
        {select && <>{selectComponent[select]}</>}
      </StBox>
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
  padding: 0px 15px;
  height: 40px;
  line-height: 40px;
  background: ${(props) => props.theme.bgBlue};
  border-radius: 20px;
  color: ${(props) => props.theme.textwhite};
  word-break: break-word;
`;

const StBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 25%;
  height: 80vh;

  border-radius: 10px;
  padding: 30px;
  margin-left: 40px;
`;

const StIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 100px;
  margin-top: 50px;
`;
