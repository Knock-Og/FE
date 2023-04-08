import { BookmarksBoard, CommentBoard, LogBoard } from "components";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { PostDetail } from "types";
import { useState } from "react";
import { Comment, CommentBlue, LogBlue, Log, StarBlue, Star } from "assets";

const DetailBoard = (post: PostDetail) => {
  const paramsPost = useParams();
  // console.log("paramsPost", paramsPost.postId);

  // 컴포넌트 내부에서 사용할 상태 관리
  // select 를 통해서 선택된 컴포넌트를 렌더링
  // isActive 를 통해서 선택된 컴포넌트의 아이콘을 파란색으로 변경

  const [select, setSelect] = useState<string>();
  const [isActiveComment, setIsActiveComment] = useState<boolean>(false);
  const [isActiveLog, setIsActiveLog] = useState<boolean>(false);
  const [isActiveBookmark, setIsActiveBookmark] = useState<boolean>(false);

  // postId 를 받아오기 위한 코드
  const postId = paramsPost.postId ? parseInt(paramsPost.postId) : 0;

  // 선택된 컴포넌트를 렌더링하기 위한 코드
  // postId 를 props 로 넘겨주기 위해 컴포넌트를 렌더링하는 코드를 변수로 선언
  const selectComponent: Record<string, JSX.Element> = {
    comment: <CommentBoard postId={postId} />,
    log: <LogBoard postId={postId} />,
    bookmark: <BookmarksBoard postId={postId} />,
  };

  //클릭시 해당 컴포넌트를 랜더링
  //클릭시 해당 컴포넌트의 아이콘을 파란색으로 변경
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
  };

  return (
    <Wapper>
      <StContainer>
        <StTitle>{post.title}</StTitle>
        <StContent>{post.content}</StContent>
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
    </Wapper>
  );
};

export default DetailBoard;

const Wapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 80%;
  height: 80vh;
  background-color: ${(props) => props.theme.veryLightGrey};
  border: 1px solid ${(props) => props.theme.grey};

  padding: 30px;
`;

const StTitle = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  font-weight: 800;
  font-size: 24px;
  line-height: 40px;
  padding: 0px 40px;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
`;

const StContent = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  font-weight: 800;
  font-size: 24px;
  padding: 20px 40px;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
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

const StButton = styled.button`
  padding: 1rem 2rem;
  margin-right: 1rem;
  color: #111111;
  background-color: #eeeeee;
  border-radius: 2rem;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const StIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 100px;
  margin-top: 50px;
`;

const StCardContainer = styled.div``;
