import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import { BOOKMARK } from "api";
import { PostDetail } from "types";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const DetailBoard = (post: PostDetail) => {
  const [isBookmarkPost, setIsBookmarkPost] = useState(false);

  const location = useLocation();

  const { mutate: addPostToBookmark } = useMutation(BOOKMARK.addPostToBookmark);
  const { mutate: deletePostToBookmark } = useMutation(
    BOOKMARK.deletePostToBookmark
  );

  const handleClickBookmark = () => {
    isBookmarkPost
      ? addPostToBookmark({
          folderId: location.state.folderId,
          postId: post.id,
        })
      : deletePostToBookmark({
          folderId: location.state.folderId,
          postId: post.id,
        });
  };

  useEffect(() => {
    // 즐겨찾기에 있는 건지 조회 후 update
    setIsBookmarkPost(false);
    //eslint-disable-next-line
  }, []);

  return (
    <StContainer>
      <button onClick={handleClickBookmark}>
        {isBookmarkPost ? "제거" : "추가"}
      </button>
      <StTitle>{post.title}</StTitle>
      <Viewer initialValue={post.content} />
    </StContainer>
  );
};

export default DetailBoard;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  height: 80vh;
  background-color: ${(props) => props.theme.veryLightGrey};
  border: 1px solid ${(props) => props.theme.grey};
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
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
