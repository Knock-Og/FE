import { getCookie } from "api/cookies";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function CommentsBoard() {
  const { id } = useParams();
  const [writeComment, setWriteComment] = useState({
    comment: "",
  });

  //댓글 불러오기
  const accessToken = getCookie("access_token");
  const config = (accessToken) => {
    return { Authorization: `Bearer ${accessToken}` };
  };
  const { isLoading, isError, data } = useQuery(["getComments"], () =>
    getComments(id)
  );

  const getComments = async (id) => {
    return await axios.get(`http://43.201.3.8:8080/post/${id}/comments`, {
      headers: config(accessToken),
    });
  };

  const commentData = data?.data;
  console.log("commentData", commentData);

  const queryClient = useQueryClient();

  //댓글 작성
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setWriteComment({ ...writeComment, [name]: value });
  };

  const createComment = async (data, accessToken) => {
    const response = await axios.post(
      `http://43.201.3.8:8080/post/${id}/comment`,
      writeComment,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  };

  const mutationCreate = useMutation(
    () => createComment(writeComment, getCookie("access_token")),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getComments");
      },
    }
  );

  const commentId = data?.data;
  console.log("commentId", commentId);

  const deleteComment = async (commentId) => {
    return await axios.delete(
      `http://43.201.3.8:8080/post/${id}/comment/${commentId}`,
      {
        headers: config(accessToken),
      }
    );
  };

  const onDeleteHandler = (event) => {
    deleteComment(event);
    console.log("event", event);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    mutationCreate.mutate(writeComment, getCookie("accessToken"));
  };

  return (
    <>
      <div>
        {commentData?.map((comment) => {
          return (
            <div key={comment.id}>
              <div>{comment.comment}</div>
              <div>{comment.createdAt}</div>
              <button
                value={comment.id}
                onClick={() => onDeleteHandler(comment.id)}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>

      <StAddForm onSubmit={onSubmitHandler}>
        <StAddInput
          type="text"
          name="comment"
          value={writeComment.comment}
          onChange={onChangeHandler}
        />
        <StAddButton>추가하기</StAddButton>
      </StAddForm>
    </>
  );
}

export default CommentsBoard;

const StAddForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StAddInput = styled.input`
  width: 300px;
`;

const StAddButton = styled.button`
  width: 300px;
`;
