import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { createBrowserHistory } from "history";
import styled from "styled-components";
import { CATEGORY, POST } from "api";
import { PostDetailTab, Alert } from "components";
import { errorState } from "store/atoms";
import { ActiveState, Category, EditPost, PostDetail } from "types";
import { uploadImg } from "utils";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

const ModifyBoard = (post: PostDetail) => {
  const positionArr = ["Owner", "Manager", "Member"];
  const [newPost, setNewPost] = useState<EditPost>({
    title: "",
    content: "",
    keywords: [],
    category: "",
    modifyPermission: "",
    readablePosition: "",
  });
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveState>({
    comment: false,
    log: false,
    bookmark: false,
  });

  const setError = useSetRecoilState(errorState);

  const handleClickTab = (name: string) => {
    const initTabState = { comment: false, log: false, bookmark: false };
    setActiveTab({ ...initTabState, [name]: true });
  };

  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const history = createBrowserHistory();

  const { data: categoryData } = useQuery<Category[]>(
    "getCategories",
    CATEGORY.getCategories
  );
  const { mutate: editPost } = useMutation(POST.editPost, {
    onSuccess: () => {
      navigate(`/post/${post.id}`, { replace: true });
    },
  });
  const { mutate: delPost } = useMutation(POST.delPost, {
    onSuccess: () => {
      navigate("/mypage", { replace: true });
    },
  });
  const { mutate: updateEditingStatus } = useMutation(POST.updateEditingStatus);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPost({ ...newPost, title: e.target.value });

  const handleChangeEditor = () => {
    const data = editorRef.current?.getInstance().getHTML();
    data && setNewPost({ ...newPost, content: data });
  };

  const handleClickEditBtn = () => {
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
    editPost({ postId: post.id, post: newPost });
  };

  const handleClickDelBtn = () => {
    // eslint-disable-next-line
    const isDel = confirm("삭제하시겠습니까?");
    if (isDel) {
      delPost(post.id);
    }
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

  useEffect(() => {
    updateEditingStatus(post.id);

    setNewPost({
      title: post.title,
      content: post.content,
      keywords: post.keywords,
      category: post.category,
      modifyPermission: post.modifyPermission.toLowerCase(),
      readablePosition: post.readablePosition.toLowerCase(),
    });

    return () => {
      if (history.action === "POP") {
        updateEditingStatus(post.id);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Alert />
      <StContainer>
        <StTitleInput
          defaultValue={newPost.title}
          placeholder="제목"
          onChange={handleChangeTitle}
        />
        <StMidSelet style={{ display: "flex", gap: "10px" }}>
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
            value={
              newPost.modifyPermission.charAt(0).toUpperCase() +
              newPost.modifyPermission.slice(1)
            }
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
            value={
              newPost.readablePosition.charAt(0).toUpperCase() +
              newPost.readablePosition.slice(1)
            }
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
          initialValue={post.content}
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

          <StDelBtn onClick={handleClickDelBtn}>삭제하기</StDelBtn>
          <StAddBtn onClick={handleClickEditBtn}>수정완료</StAddBtn>
        </StFooter>
      </StContainer>

      <PostDetailTab
        activeTab={activeTab}
        handleClickTab={handleClickTab}
        postId={post.id}
        folders={post.folders}
      />
    </>
  );
};

export default ModifyBoard;

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
  font-weight: 800;
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
  border-bottom: 1px solid ${(props) => props.theme.pageBorder};
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

const StDelBtn = styled.button`
  width: 120px;
  height: 50px;
  background: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  color: ${(props) => props.theme.keyBlue};
  border: 1px solid ${(props) => props.theme.borderBlue};
  margin-right: 15px;
  outline: 0;
  cursor: pointer;
`;
