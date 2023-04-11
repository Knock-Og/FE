import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import { Comment, CommentBlue, LogBlue, Log, StarBlue, Star } from "assets";
import { BOOKMARK } from "api";
import { BookmarksBoard, CommentBoard, LogBoard } from "components";
import { PostDetail } from "types";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const DetailBoard = (post: PostDetail) => {
  const [isBookmarkPost, setIsBookmarkPost] = useState(false);
  const [select, setSelect] = useState<string>();
  const [isActiveComment, setIsActiveComment] = useState<boolean>(false);
  const [isActiveLog, setIsActiveLog] = useState<boolean>(false);
  const [isActiveBookmark, setIsActiveBookmark] = useState<boolean>(false);

  const location = useLocation();

  const { mutate: addPostToBookmark } = useMutation(BOOKMARK.addPostToBookmark);
  const { mutate: deletePostToBookmark } = useMutation(
    BOOKMARK.deletePostToBookmark
  );

  const selectComponent: Record<string, JSX.Element> = {
    comment: <CommentBoard postId={post.id} />,
    log: <LogBoard postId={post.id} />,
    bookmark: <BookmarksBoard postId={post.id} />,
  };

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

    // isBookmarkPost
    //   ? addPostToBookmark({
    //       folderId: location.state.folderId,
    //       postId: post.id,
    //     })
    //   : deletePostToBookmark({
    //       folderId: location.state.folderId,
    //       postId: post.id,
    //     });
  };

  useEffect(() => {
    // 즐겨찾기에 있는 건지 조회 후 update
    setIsBookmarkPost(false);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <StContainer>
        <button onClick={handleClickBookmark}>
          {isBookmarkPost ? "제거" : "추가1"}
        </button>
        <StTitle>{post.title}1</StTitle>
        <Viewer initialValue={post.content} />
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
