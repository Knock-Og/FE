import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { CATEGORY, POST } from "api";
import { Alert } from "components";
import { errorState } from "store/atoms";
import { AddPost, Category } from "types";
import { uploadImg } from "utils";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

const WriteBoard = () => {
  const positionArr = ["Owner", "Manager", "Member"];
  const [newPost, setNewPost] = useState<AddPost>({
    title: "",
    content: "",
    keywords: [],
    category: "",
    modifyPermission: "",
    readablePosition: "",
    editingStatus: "false",
  });
  const [keyword, setKeyword] = useState("");

  const setError = useSetRecoilState(errorState);

  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  const { data: categoryData } = useQuery<Category[]>(
    "getCategories",
    CATEGORY.getCategories
  );

  const { mutate: addPost } = useMutation(POST.addPost, {
    onSuccess: (response) => {
      if (`${response}`.includes("Error")) {
        return setError(`${response}`);
      }
      navigate(`/post/${response.data.postId}`);
    },
  });

  const handleChangeEditor = () => {
    const data = editorRef.current?.getInstance().getHTML();
    data && setNewPost({ ...newPost, content: data });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPost({ ...newPost, title: e.target.value });

  const handleClickAddBtn = () => {
    if (newPost.title.length === 0) {
      return setError("제목을 입력해주세요 !");
    }
    if (newPost.content.length === 0) {
      return setError("내용을 입력해주세요 !");
    }
    if (newPost.keywords.length === 0) {
      return setError("키워드를 1개 이상 입력해주세요 !");
    }
    if (newPost.category === "") {
      return setError("카테고리를 선택해주세요 !");
    }
    if (newPost.modifyPermission === "") {
      return setError("수정권한을 선택해주세요 !");
    }
    if (newPost.readablePosition === "") {
      return setError("읽기권한을 선택해주세요 !");
    }
    addPost(newPost);
  };

  const handleChangeSelectBox = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const handleChangeKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      if (newPost.keywords.includes(keyword)) {
        return setError("이미 추가한 키워드입니다 !");
      }
      setNewPost({
        ...newPost,
        keywords: [...newPost.keywords, keyword].filter((v) => v !== ""),
      });
      setKeyword("");
    }
  };

  return (
    <>
      <Alert />

      <StContainer>
        <StTitleInput placeholder="제목" onChange={handleChangeTitle} />

        <StMidSelet>
          <label htmlFor="category">카테고리</label>
          <select
            id="category"
            name="category"
            value={newPost.category}
            onChange={handleChangeSelectBox}
          >
            <option value="">-- 카테고리 --</option>
            {categoryData?.map((category) => (
              <option key={category.id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <label htmlFor="modifyPermission">수정권한</label>
          <select
            id="modifyPermission"
            name="modifyPermission"
            value={newPost.modifyPermission}
            onChange={handleChangeSelectBox}
          >
            <option value="">-- 수정권한 --</option>
            {positionArr?.map((position) => (
              <option key={`modify-${position}`} value={position}>
                {position}
              </option>
            ))}
          </select>

          <label htmlFor="readablePosition">읽기권한</label>
          <select
            id="readablePosition"
            name="readablePosition"
            value={newPost.readablePosition}
            onChange={handleChangeSelectBox}
          >
            <option value="">-- 읽기권한 --</option>
            {positionArr?.map((position) => (
              <option key={`readable-${position}`} value={position}>
                {position}
              </option>
            ))}
          </select>
        </StMidSelet>
        <Editor
          previewStyle="vertical"
          height="100%"
          initialEditType="wysiwyg"
          hideModeSwitch={true}
          useCommandShortcut={false}
          plugins={[colorSyntax]}
          language="ko-KR"
          ref={editorRef}
          onChange={handleChangeEditor}
          hooks={{
            addImageBlobHook: uploadImg,
          }}
        />
        <StFooter>
          <StkeyWordWrap>
            {newPost.keywords.map((keyword) => (
              <StkeyWordP key={keyword}>#{keyword}</StkeyWordP>
            ))}
            <StkeyWordInput
              placeholder="태그를 입력하세요 (엔터로 구분)"
              value={keyword}
              onChange={handleChangeKeywordInput}
              onKeyUp={handleKeyUp}
            />
          </StkeyWordWrap>
          <StAddBtn onClick={handleClickAddBtn}>작성완료</StAddBtn>
        </StFooter>
      </StContainer>
    </>
  );
};

export default WriteBoard;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const StMidSelet = styled.div`
  border: 1px solid ${(props) => props.theme.pageBorder};
  border-top: 0;
  border-bottom: 0;
  padding: 20px 20px;
  display: flex;
  gap: 20px;
`;
const StTitleInput = styled.input`
  width: 100%;
  height: 80px;
  border: 1px solid ${(props) => props.theme.pageBorder};
  padding: 20px 30px;
  font-size: 1.125rem;
  outline: none;
  border-radius: 5px 5px 0 0;
  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }
`;
const StFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
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
const StkeyWordInput = styled.input`
  outline: 0;
  border: 0;
  width: 200px;
`;

const StAddBtn = styled.button`
  width: 120px;
  height: 50px;
  background: ${(props) => props.theme.keyBlue};
  border-radius: 10px;
  color: ${(props) => props.theme.textwhite};
  border: none;
  outline: 0;
  cursor: pointer;
`;
