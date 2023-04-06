import React from "react";

import { COMMENT } from "api";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { AddComment, Comments, PostId } from "types";

function index({ postId }: PostId) {
  // 댓글 데이터 불러오기
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: comments } = useQuery<Comments[]>("getComment", () =>
    COMMENT.getComments(postId)
  );
  console.log("CommentsBoard", comments);

  // 댓글 추가하기
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [newComment, setNewComment] = useState<AddComment>({
    comment: "",
  });
  console.log("newComment", newComment);

  // Mutation
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate: addComment } = useMutation(COMMENT.addComment);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewComment({ ...newComment, comment: e.target.value });

  const handleClickAddBtn = () => {
    addComment({ postId: postId, comment: newComment });
  };

  return (
    <>
      <form>
        <StCardContainer>
          {comments?.map((comment) => (
            <StCard key={comment.id}>
              <div>{comment.id}</div>
              <div>{comment.comment}</div>
              <div>{comment.createdAt}</div>
            </StCard>
          ))}
        </StCardContainer>

        <div>
          <StInput
            placeholder="댓글을 입력해주세요"
            onChange={handleChangeTitle}
          />
        </div>
        <StAddBtn onClick={handleClickAddBtn}>작성완료</StAddBtn>
      </form>
    </>
  );
}

export default index;

const StCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow: auto;
  gap: 10px;
`;

const StCard = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
  background-color: ${(props) => props.theme.veryLightGrey};
  border: 1px solid ${(props) => props.theme.grey};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StInput = styled.input``;

const StAddBtn = styled.button`
  width: 100px;
  height: 42px;
  background: ${(props) => props.theme.keyBlue};
  border-radius: 12px;
  color: #fff;
  border: none;
`;
