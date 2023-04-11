import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import styled from "styled-components";
import { CATEGORY, POST } from "api";
import { Category, EditPost, PostDetail } from "types";
import { uploadImg } from "utils";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

const ModifyBoard = (post: PostDetail) => {
  console.log(post);
  const [newPost, setNewPost] = useState<EditPost>({
    title: "",
    content: "",
    keywords: [],
    category: "",
    modifyPermission: "",
    readablePosition: "",
  });
  const [keyword, setKeyword] = useState("");
  
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  const { data: categoryData } = useQuery<Category[]>(
    "getCategories",
    CATEGORY.getCategories
  );
  const { mutate: editPost } = useMutation(POST.editPost);
  const { mutate: delPost } = useMutation(POST.delPost);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPost({ ...newPost, title: e.target.value });

  const handleChangeEditor = () => {
    const data = editorRef.current?.getInstance().getHTML();
    data && setNewPost({ ...newPost, content: data });
  };

  const handleClickEditBtn = () => {
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

  const handleChangeSelectBox = (e: SelectChangeEvent) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const handleChangeKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setNewPost({ ...newPost, keywords: [...newPost.keywords, keyword] });
      setKeyword("");
    }
    return;
  };

  useEffect(() => {
    setNewPost({
      title: post.title,
      content: post.content,
      keywords: post.keywords,
      category: post.category,
      modifyPermission: post.modifyPermission,
      readablePosition: post.readablePosition,
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
      <div style={{ display: "flex", gap: "10px" }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="category">카테고리</InputLabel>
          <Select
            labelId="category"
            label="category"
            name="category"
            value={newPost.category}
            onChange={handleChangeSelectBox}
            autoWidth
          >
            {categoryData?.map((category) => (
              <MenuItem key={category.id} value={category.categoryName}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="modifyPermission">수정권한</InputLabel>
          <Select
            labelId="modifyPermission"
            label="modifyPermission"
            name="modifyPermission"
            defaultValue={post.modifyPermission}
            value={newPost.modifyPermission}
            onChange={handleChangeSelectBox}
            autoWidth
          >
            <MenuItem value="Owner">Owner</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Member">Member</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="readablePosition">읽기권한</InputLabel>
          <Select
            labelId="readablePosition"
            label="readablePosition"
            name="readablePosition"
            defaultValue={post.readablePosition}
            value={newPost.readablePosition}
            onChange={handleChangeSelectBox}
            autoWidth
          >
            <MenuItem value="Owner">Owner</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Member">Member</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Editor
        initialValue={post.content}
        previewStyle="vertical"
        height="100%"
        initialEditType="wysiwyg"
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
        <div style={{ width: "100%", display: "flex", gap: "10px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {newPost.keywords.map((keyword) => (
              <div key={keyword} style={{ border: "1px solid blue" }}>
                {keyword}
              </div>
            ))}
          </div>
          <input
            placeholder="키워드"
            value={keyword}
            onChange={handleChangeKeywordInput}
            onKeyUp={handleKeyUp}
          />
        </div>
        <StBtn onClick={handdleClickDelBtn}>삭제하기</StBtn>
        <StBtn onClick={handleClickEditBtn}>수정완료</StBtn>
      </StFooter>
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

const StFooter = styled.div`
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
