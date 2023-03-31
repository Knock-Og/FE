import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { POST } from "api";
import { AddPost } from "types";

const WriteBoard = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState<AddPost>({
    title: "",
    content: "",
    keywords: ["게시글작성"],
    editingStatus: "false",
    category: "공지사항",
    modifyPermission: "Owner",
    readablePosition: "Owner",
  });

  const { mutate: addPost } = useMutation(POST.addPost);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPost({ ...newPost, title: e.target.value });

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNewPost({ ...newPost, content: e.target.value });

  const handleClickAddBtn = () => {
    if (newPost.title.length === 0) {
      return alert("제목을 입력해주세요 !");
    }
    if (newPost.content.length === 0) {
      return alert("내용을 입력해주세요 !");
    }

    addPost(newPost);
    navigate(-1);
  };

  return (
    <StContainer>
      <StTitleInput placeholder="제목" onChange={handleChangeTitle} />
      <StContentInput placeholder="내용" onChange={handleChangeContent} />
      <StAddBtnWrapper>
        <StAddBtn onClick={handleClickAddBtn}>작성완료</StAddBtn>
      </StAddBtnWrapper>
    </StContainer>
  );
};

export default WriteBoard;

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

const StAddBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StAddBtn = styled.button`
  width: 100px;
  height: 42px;
  background: ${(props) => props.theme.keyBlue};
  border-radius: 12px;
  color: #fff;
  border: none;
`;

const StTitleInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  font-weight: 800;
  font-size: 24px;
  line-height: 40px;
  padding: 20px 40px;
  outline: none;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
`;

const StContentInput = styled.textarea`
  width: 100%;
  height: 400px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  font-weight: 800;
  font-size: 24px;
  padding: 20px 40px;
  outline: none;
  resize: none;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
`;
