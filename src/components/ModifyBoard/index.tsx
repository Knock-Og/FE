import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { createBrowserHistory } from "history";
import styled from "styled-components";
import { CATEGORY, POST } from "api";
import { DelIcon, MainArr } from "assets";
import { PostDetailTab, Alert } from "components";
import { errorState, isDarkState } from "store/atoms";
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

  const isDark = useRecoilValue(isDarkState);
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

  // const handleChangeSelectBox = (e: React.ChangeEvent<HTMLSelectElement>) =>
  //   setNewPost({ ...newPost, [e.target.name]: e.target.value });

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
  const [selectedRead, setSelectedRead] = useState("");
  const handleSelectRead = (readablePosition: string) => {
    setSelectedRead(readablePosition);
    setReadOpen(false);
    setNewPost({ ...newPost, readablePosition });
  };
  const [positionOpen, setPositionOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const handleSelectPosition = (modifyPermission: string) => {
    setSelectedPosition(modifyPermission);
    setPositionOpen(false);
    setNewPost({ ...newPost, modifyPermission });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
    setNewPost({ ...newPost, category });
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

    setSelectedRead(
      post.readablePosition.toLowerCase().charAt(0).toUpperCase() +
        post.readablePosition.toLowerCase().slice(1)
    );
    setSelectedPosition(
      post.modifyPermission.toLowerCase().charAt(0).toUpperCase() +
        post.modifyPermission.toLowerCase().slice(1)
    );
    setSelectedCategory(post.category);

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
        <StMidSelect>
          <Stlabel>카테고리</Stlabel>
          <StSelectDiv>
            <StSelectp
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              {selectedCategory && selectedCategory}
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
          </StSelectDiv>

          <Stlabel>수정권한</Stlabel>
          <StSelectDiv>
            <StSelectp
              onClick={(e) => {
                e.stopPropagation();
                setPositionOpen(!positionOpen);
              }}
            >
              {selectedPosition && selectedPosition}
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
          </StSelectDiv>

          <Stlabel>읽기권한</Stlabel>
          <StSelectDiv>
            <StSelectp
              onClick={(e) => {
                e.stopPropagation();
                setReadOpen(!readOpen);
              }}
            >
              {selectedRead && selectedRead}
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
          </StSelectDiv>
        </StMidSelect>
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
          theme={isDark ? "dark" : "default"}
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

const StSelectDiv = styled.div`
  position: relative;
  width: 150px;
  border: 1px solid ${(props) => props.theme.borderColor};
  height: 45px;
  background: ${(props) => props.theme.bgwhite};
  cursor: pointer;
`;
const StSelectp = styled.p`
  line-height: 45px;
  padding: 0 15px;
`;
const MenuArr = styled(MainArr)`
  stroke: ${(props) => props.theme.fillGrey};
  fill: ${(props) => props.theme.fillGrey};
  transition: all 0.3s;
  position: absolute;
  right: 15px;
  bottom: 0;
  margin: auto 0;
  top: 0;
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
const StMidSelect = styled.div`
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
  gap: 10px;
`;
const StkeyWordP = styled.p`
  color: ${(props) => props.theme.textBlue};
  word-break: break-word;
`;
const StKeyword = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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

const StDelBtn = styled.button`
  width: 120px;
  height: 50px;
  background: ${(props) => props.theme.bgwhite};
  border-radius: 10px;
  color: ${(props) => props.theme.textBlue};
  border: 1px solid ${(props) => props.theme.delBtn};
  margin-right: 15px;
  outline: 0;
  cursor: pointer;
`;
