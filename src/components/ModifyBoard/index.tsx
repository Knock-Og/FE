import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { POST } from "api";
import { EditPost, PostDetail } from "types";

const ModifyBoard = (post: PostDetail) => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState<EditPost>({
    title: "",
    content: "",
    keywords: ["게시글수정"],
    category: "공지사항",
    modifyPermission: "Owner",
    readablePosition: "Owner",
  });

  const { mutate: editPost } = useMutation(POST.editPost);
  const { mutate: delPost } = useMutation(POST.delPost);

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

    editPost({ postId: post.id, post: newPost });
    navigate(-1);
  };

  const handdleClickDelBtn = () => {
    // eslint-disable-next-line
    const isDel = confirm("삭제하시겠습니까?");

    if (isDel) {
      delPost(post.id);
      navigate(-1);
    }
  };

  useEffect(() => {
    setNewPost({
      ...newPost,
      title: post.title,
      content: post.content,
      keywords: post.keywords,
      category: post.category,
    });
    // eslint-disable-next-line
  }, [post]);

  return (
    <StContainer>
      <StTitleInput
        defaultValue={newPost.title}
        placeholder="제목"
        onChange={handleChangeTitle}
      />
      <StContentInput
        defaultValue={newPost.content}
        placeholder="내용"
        onChange={handleChangeContent}
      />
      <StAddBtnWrapper>
        <StBtn onClick={handdleClickDelBtn}>삭제하기</StBtn>
        <StBtn onClick={handleClickAddBtn}>수정완료</StBtn>
      </StAddBtnWrapper>
    </StContainer>
  );
};

export default ModifyBoard;

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
  gap: 10px;
`;

const StBtn = styled.button`
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
