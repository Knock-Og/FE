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
import { DelIcon } from "assets";
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
    if (newPost.keywords.length === 0) {
      return alert("키워드를 입력해주세요 !");
    }
    if (newPost.category === "") {
      return alert("카테고리를 선택해주세요 !");
    }
    if (newPost.modifyPermission === "") {
      return alert("수정권한을 선택해주세요 !");
    }
    if (newPost.readablePosition === "") {
      return alert("읽기권한을 선택해주세요 !");
    }
    addPost(newPost);
    navigate("/main");
  };

  const handleChangeSelectBox = (e: SelectChangeEvent) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const handleChangeKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      if (newPost.keywords.includes(keyword)) {
        alert("이미 추가한 키워드입니다 !");
        return;
      }
      setNewPost({
        ...newPost,
        keywords: [...newPost.keywords, keyword].filter((v) => v !== ""),
      });
      setKeyword("");
    }
  };
  const delKeyword = (keywordToDelete:string) => {
    const updatedKeywords = newPost.keywords.filter(
      (keyword) => keyword !== keywordToDelete
    );
    setNewPost({ ...newPost, keywords: updatedKeywords });
  };
  
  return (
    <StContainer>
      <StTitleInput placeholder="제목" onChange={handleChangeTitle} />

      <StMidSelet>
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
            <StKeyword>
              <StkeyWordP key={keyword}>#{keyword}</StkeyWordP>
              <Stbutton onClick={() => delKeyword(keyword)}><StDelIcon/></Stbutton>
            </StKeyword>
          ))}
          <StkeyWordInput
            placeholder="키워드를 입력하세요 (엔터로 구분)"
            value={keyword}
            onChange={handleChangeKeywordInput}
            onKeyUp={handleKeyUp}
          />
        </StkeyWordWrap>
        <StAddBtn onClick={handleClickAddBtn}>작성완료</StAddBtn>
      </StFooter>
    </StContainer>
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
  border: 1px solid ${(props) => props.theme.borderWrite};
  border-top: 0;
  border-bottom: 0;
  padding: 20px 20px;
  display: flex;
  gap: 20px;
  background: ${(props) => props.theme.bgwhite};
  
`;
const StTitleInput = styled.input`
  background: ${(props) => props.theme.bgwhite};
  width: 100%;
  height: 80px;
  border: 1px solid ${(props) => props.theme.borderWrite};
  padding: 20px 30px;
  font-size: 1.125rem;
  outline: none;
  border-radius: 5px 5px 0 0;
  color: ${(props) => props.theme.textColor};
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
  border: 1px solid ${(props) => props.theme.borderWrite};
  background: ${(props) => props.theme.bgwhite};
  width: 100%;
  border-top: 0;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 20px;
  gap: 15px;
`;
const StKeyword = styled.div`
  display:flex;
  align-items: center;
  gap:5px;
`
const StkeyWordP = styled.p`
  color: ${(props) => props.theme.textBlue};
  word-break: break-word;
`;
const StDelIcon = styled(DelIcon)`
  fill: ${(props) => props.theme.textwhite}; ;
`;
const Stbutton = styled.button`
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  width: 16px;
  height: 16px;
  border-radius: 18px;
  display:flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.bgBlue};
`;
const StkeyWordInput = styled.input`
  outline: 0;
  border: 0;
  width: 210px;
  background: transparent;
  color: ${(props) => props.theme.textColor};
`;

const StAddBtn = styled.button`
  width: 120px;
  height: 50px;
  background: ${(props) => props.theme.bgBlue};
  border-radius: 10px;
  color: ${(props) => props.theme.textwhite};
  border: none;
  outline: 0;
  cursor: pointer;
`;
