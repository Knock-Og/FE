import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { DelIcon, MainArr } from "assets";
import { CATEGORY, POST } from "api";
import { Alert } from "components";
import { errorState, isDarkState } from "store/atoms";
import { AddPost, Category } from "types";
import { uploadImg } from "utils";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
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
  const isDark = useRecoilValue(isDarkState);
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
  const delKeyword = (keywordToDelete: string) => {
    const updatedKeywords = newPost.keywords.filter(
      (keyword) => keyword !== keywordToDelete
    );
    setNewPost({ ...newPost, keywords: updatedKeywords });
  };
  
  const [readOpen, setReadOpen] = useState(false);
  const [selectedRead, setSelectedRead] = useState(positionArr?.[2]);
  const handleSelectRead = (position: string) => {
    setSelectedRead(position);
    setReadOpen(false);
  };
  const [positionOpen, setPositionOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(positionArr?.[2]);
  const handleSelectPosition = (position: string) => {
    setSelectedPosition(position);
    setPositionOpen(false);
  };
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryData?.[0]?.categoryName
  );
  const handleSelectCategory = (categoryName:string) => {
    setSelectedCategory(categoryName);
    setIsOpen(false);
  };
  

  return (
    <>
      <Alert />

      <StContainer
        onClick={() => {
          setIsOpen(false);
          setPositionOpen(false);
          setReadOpen(false);
        }}
      >
        <StTitleInput placeholder="제목" onChange={handleChangeTitle} />

        <StMidSelet>
          <Stlabel>카테고리</Stlabel>
          <StselectDiv>
            <StSelectp
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              {selectedCategory
                ? selectedCategory
                : categoryData?.[0]?.categoryName}
              <MenuArr className={isOpen ? "on" : "off"} />
            </StSelectp>
            <StSelectUl className={isOpen ? "on" : "off"}>
              {categoryData?.map((category) => (
                <StSelectli
                  key={category.id}
                  value={category.categoryName}
                  onClick={() => {
                    handleSelectCategory(category.categoryName);
                  }}
                >
                  {category.categoryName}
                </StSelectli>
              ))}
            </StSelectUl>
          </StselectDiv>

          <Stlabel>수정권한</Stlabel>
          <StselectDiv>
            <StSelectp
              onClick={(e) => {
                e.stopPropagation();
                setPositionOpen(!positionOpen);
              }}
            >
              {selectedPosition ? selectedPosition : positionArr?.[2]}
              <MenuArr className={positionOpen ? "on" : "off"} />
            </StSelectp>
            <StSelectUl className={positionOpen ? "on" : "off"}>
              {positionArr?.map((position) => (
                <StSelectli
                  key={`modify-${position}`}
                  value={position}
                  onClick={() => {
                    handleSelectPosition(position);
                  }}
                >
                  {position}
                </StSelectli>
              ))}
            </StSelectUl>
          </StselectDiv>

          <Stlabel>읽기권한</Stlabel>
          <StselectDiv>
            <StSelectp
              onClick={(e) => {
                e.stopPropagation();
                setReadOpen(!readOpen);
              }}
            >
              {selectedRead ? selectedRead : positionArr?.[2]}
              <MenuArr className={readOpen ? "on" : "off"} />
            </StSelectp>
            <StSelectUl className={readOpen ? "on" : "off"}>
              {positionArr?.map((position) => (
                <StSelectli
                  key={`readable-${position}`}
                  value={position}
                  onClick={() => {
                    handleSelectRead(position);
                  }}
                >
                  {position}
                </StSelectli>
              ))}
            </StSelectUl>
          </StselectDiv>
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
          hooks={{ addImageBlobHook: uploadImg }}
          theme={isDark ? "dark" : "default"}
        />

        <StFooter>
          <StkeyWordWrap>
            {newPost.keywords.map((keyword) => (
              <StKeyword>
                <StkeyWordP key={keyword}>#{keyword}</StkeyWordP>
                <Stbutton onClick={() => delKeyword(keyword)}>
                  <StDelIcon />
                </Stbutton>
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
    </>
  );
};

export default WriteBoard;
const StselectDiv = styled.div`
  position: relative;
  width: 150px;
  border: 1px solid ${(props) => props.theme.borderColor};
  height: 45px;
  background: ${(props) => props.theme.bgwhite};
  cursor: pointer;
`;
const StSelectp = styled.p`
  line-height:45px;
  padding:0 15px;
  position:relative;
`;
const MenuArr = styled(MainArr)`
  stroke: ${(props) => props.theme.fillGrey};
  fill: ${(props) => props.theme.fillGrey};
  transition: all 0.3s;
  position: absolute;
  right: 15px;
  bottom:0;
  margin:auto 0;
  top:0;
  &.on {
    transform: rotateZ(-180deg);
  }
`;
const StSelectUl = styled.ul`
  width: calc(100% + 2px);
  left: -1px;
  top: 43px;
  position: absolute;
  border: 1px solid ${(props) => props.theme.borderColor};
  background: ${(props) => props.theme.bgwhite};
  border-top: 0;
  height: 0;
  overflow: hidden;
  &.on {
    height: auto;
    
  }
`;
const StSelectli = styled.li`
  line-height: 45px;
  padding: 0 15px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.bgLightBlue};
    color: ${(props) => props.theme.textBlue};
  }
`;

const Stlabel = styled.label``;

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
  align-items: center;
  gap: 20px;
  background: ${(props) => props.theme.bgwhite};
  position: relative;
  z-index: 30;
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
  display: flex;
  align-items: center;
  gap: 5px;
`;
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
  display: flex;
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
