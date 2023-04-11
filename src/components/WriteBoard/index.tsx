import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CATEGORY, POST } from "api";
import { AddPost, Category } from "types";
import { uploadImg } from "utils";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

const WriteBoard = () => {
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

  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  const { data: categoryData } = useQuery<Category[]>(
    "getCategories",
    CATEGORY.getCategories
  );
  const { mutate: addPost } = useMutation(POST.addPost);

  const handleChangeEditor = () => {
    const data = editorRef.current?.getInstance().getHTML();
    data && setNewPost({ ...newPost, content: data });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPost({ ...newPost, title: e.target.value });

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

  return (
    <StContainer>
      <StTitleInput placeholder="제목" onChange={handleChangeTitle} />

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

        <StAddBtn onClick={handleClickAddBtn}>작성완료</StAddBtn>
      </StFooter>
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

const StFooter = styled.div`
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
