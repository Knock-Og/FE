import { getCookie } from "api/cookies";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function ModifyBoard() {
  const location = useLocation();
  console.log("location", location.state.PostData);

  const modifyData = location.state.PostData;
  const modifyDataId = location.state.PostData.id;

  const [bordContent, setBordContent] = useState({
    title: modifyData.title,
    content: modifyData.content,
    keywords: modifyData.keywords,
    editingStatus: "false",
    category: modifyData.category,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setBordContent({ ...bordContent, [name]: value });
  };

  //통신
  const modifyBoard = async (data, accessToken) => {
    const response = await axios.put(
      `http://43.201.3.8:8080/post/${modifyDataId}`,
      bordContent,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  };

  const queryClient = useQueryClient();
  const mutationCreate = useMutation(
    () => modifyBoard(bordContent, getCookie("access_token")),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getPost");
      },
    }
  );

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    mutationCreate.mutate(bordContent, getCookie("accessToken"));
    navigate(`/post/${modifyDataId}`);
  };

  const categoryOptions = [
    { key: 1, value: "공지사항" },
    { key: 2, value: "점심메뉴" },
    { key: 3, value: "연차, 휴가" },
  ];

  const modifyPermissionOptions = [
    { key: 1, value: "member" },
    { key: 2, value: "manger" },
    { key: 3, value: "owner" },
  ];

  const readablePositionOptions = [
    { key: 1, value: "member" },
    { key: 2, value: "manger" },
    { key: 3, value: "owner" },
  ];

  console.log("bordContent", bordContent);

  return (
    <StAddForm onSubmit={onSubmitHandler}>
      <StInputGroup>
        <StFormLabel>제목</StFormLabel>
        <StAddInput
          type="text"
          name="title"
          value={bordContent.title}
          onChange={onChangeHandler}
        />
        <StFormLabel>내용</StFormLabel>
        <StAddInput
          type="text"
          name="content"
          value={bordContent.content}
          onChange={onChangeHandler}
        />
        <StAddSelect name="category" onChange={onChangeHandler}>
          {categoryOptions.map((option) => (
            <StAddOption key={option.key} value={option.value}>
              {option.value}
            </StAddOption>
          ))}
        </StAddSelect>
        <StAddSelect name="modifyPermission" onChange={onChangeHandler}>
          {modifyPermissionOptions.map((option) => (
            <StAddOption key={option.key} value={option.value}>
              {option.value}
            </StAddOption>
          ))}
        </StAddSelect>
        <StAddSelect name="readablePosition" onChange={onChangeHandler}>
          {readablePositionOptions.map((option) => (
            <StAddOption key={option.key} value={option.value}>
              {option.value}
            </StAddOption>
          ))}
        </StAddSelect>
      </StInputGroup>
      <StAddButton>수정하기</StAddButton>
    </StAddForm>
  );
}

export default ModifyBoard;

const StInputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const StFormLabel = styled.label``;

const StAddForm = styled.form``;

const StAddInput = styled.input`
  width: 300px;
`;

const StAddButton = styled.button``;

const StAddSelect = styled.select`
  margin-top: 50px;
  width: 300px;
`;

const StAddOption = styled.option``;
