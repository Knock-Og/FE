import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IconButton, Input } from "@mui/material";
import styled from "styled-components";
import { Folder, FolderPlus, Pencil, Trash, Delx } from "assets";
import { BOOKMARK } from "api";
import { PostCard, Layout, NoSearched, Alert } from "components";
import {
  endPageState,
  errorState,
  folderIdState,
  searchedPostsState,
} from "store/atoms";
import { Bookmark as IBookmark, NavItem, Post } from "types";

const Bookmark = () => {
  const [page, setPage] = useState<number>(1);
  const [isEdit, setIsEdit] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>();
  const [editedFolderName, setEditedFolderName] = useState("");
  const [isShowAddFolderModal, setIsShowAddFolderModal] =
    useState<boolean>(false);
  const [addInput, setAddInput] = useState<string>("");

  const [folderId, setFolderId] = useRecoilState(folderIdState);
  const [searchedPosts, setSearchedPosts] = useRecoilState(searchedPostsState);
  const [endPage, setEndPage] = useRecoilState(endPageState);
  const setError = useSetRecoilState(errorState);

  const params = useParams();
  const navigate = useNavigate();

  const { mutate: getBookmarks } = useMutation(BOOKMARK.getBookmarks, {
    onSuccess: (res) => {
      const nav = res.data.map((v: IBookmark) => {
        return {
          itemValue: v.bookMarkFolderName,
          handler: () => {
            setFolderId(v.id);
            navigate(`/bookmark/${v.bookMarkFolderName}`);
            getBookmark({ folderId: v.id, page: 1 });
            setIsEdit(false);
            setEditedFolderName(v.bookMarkFolderName);
            setAddInput("");
          },
        };
      });
      setNavItems(nav);
    },
    onError: () => setNavItems([]),
  });

  const { mutate: getBookmark } = useMutation(BOOKMARK.getBookmark, {
    onSuccess: (res) => {
      setSearchedPosts(res.data.postResponseDtoList as Post[]);
      setEndPage(res.data.endPage);
    },
    onError: () => {
      setSearchedPosts([]);
      setEndPage(1);
    },
  });
  const { mutate: addBookmark } = useMutation(BOOKMARK.addBookmark, {
    onSuccess: () => getBookmarks(),
  });
  const { mutate: editBookmark } = useMutation(BOOKMARK.editBookmark, {
    onSuccess: () => getBookmarks(),
  });
  const { mutate: deleteBookmark } = useMutation(BOOKMARK.deleteBookmark, {
    onSuccess: () => getBookmarks(),
  });

  const handleChangeEditInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditedFolderName(e.target.value);

  const handleClickEditBtn = () => setIsEdit((prev) => !prev);

  const handleEditSubmit = () => {
    if (editedFolderName === "")
      return setError("편집할 폴더명을 입력해주세요.");

    if (editedFolderName.trim() === "")
      return setError("변경할 즐겨찾기명을 적어주세요.");

    editBookmark({
      folderId,
      bookMarkFolderName: editedFolderName,
    });

    navigate(`/bookmark/${editedFolderName}`, { replace: true });
    handleClickEditBtn();
    setAddInput("");
  };

  const handleClickDelBtn = () => {
    deleteBookmark(folderId);
    navigate("/bookmark", { replace: true });
    handleClickEditBtn();
    setAddInput("");
  };

  const handleSubmitAddForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addInput === "") return setError("추가할 폴더명을 입력해주세요.");
    addBookmark(addInput);
    setAddInput("");
    setIsShowAddFolderModal(false);
  };

  useEffect(() => {
    setEndPage(1);
    getBookmarks();
    params.folderName
      ? getBookmark({ folderId, page: 1 })
      : setSearchedPosts([]);

    return () => {
      setAddInput("");
      setEditedFolderName("");
    };
    //eslint-disable-next-line
  }, [params]);

  return (
    <>
      <Alert />
      <StBookmarkAdd className={isShowAddFolderModal ? "on" : "off"}>
        <StBookmarkAddModal className={isShowAddFolderModal ? "on" : "off"}>
          <StForm onSubmit={handleSubmitAddForm}>
            <StCloseBtn
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setIsShowAddFolderModal(!isShowAddFolderModal)}
            >
              <path
                d="M27.5594 11.4419L10.8927 28.1086"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.8927 11.4419L27.5594 28.1086"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </StCloseBtn>
            <StModalTitle>즐겨찾기 폴더 추가</StModalTitle>
            <StInputWrapper>
              <StInput
                type="text"
                value={addInput}
                maxLength={10}
                placeholder="추가할 폴더 명"
                onChange={(e) => setAddInput(e.target.value)}
              />
              <StSubmitBtn>추가</StSubmitBtn>
            </StInputWrapper>
          </StForm>
        </StBookmarkAddModal>
        <StModalBg
          onClick={() => setIsShowAddFolderModal(!isShowAddFolderModal)}
          className={isShowAddFolderModal ? "on" : "off"}
        />
      </StBookmarkAdd>

      <Layout
        page={{ page, endPage, setPage }}
        isPagination={searchedPosts && searchedPosts.length > 0}
      >
        <StLayoutChildrenWrapper>
          <StFolder>
            <StFolderli
              onClick={() => setIsShowAddFolderModal(!isShowAddFolderModal)}
            >
              <FolderPlus />
              <StFolderP>폴더추가하기</StFolderP>
            </StFolderli>
            {navItems?.map((folder) => (
              <StFolderli key={folder.itemValue} onClick={folder.handler}>
                <StFolderIcon />
                <StFolderP>{folder.itemValue}</StFolderP>
              </StFolderli>
            ))}
          </StFolder>

          {params.folderName && (
            <StBreadCrumbWrapper>
              {isEdit ? (
                <StBreadCrumbInput
                  type="text"
                  value={editedFolderName}
                  onChange={handleChangeEditInput}
                  endAdornment={
                    <IconButton onClick={handleEditSubmit}>
                      <StPencil />
                    </IconButton>
                  }
                />
              ) : (
                <StBreadCrumb>{params.folderName}</StBreadCrumb>
              )}
              <StEditBtn onClick={handleClickEditBtn}>
                {isEdit ? <StDelIcon /> : <StPencil />}
              </StEditBtn>
              <StDelBtn onClick={handleClickDelBtn}>
                <StTrash />
              </StDelBtn>
            </StBreadCrumbWrapper>
          )}

          {searchedPosts && searchedPosts.length > 0 ? (
            searchedPosts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <NoSearched />
          )}
        </StLayoutChildrenWrapper>
      </Layout>
    </>
  );
};

export default Bookmark;

const StBreadCrumb = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
`;

const StBreadCrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const StBreadCrumbInput = styled(Input)`
  margin-right: 30px;
  height: 50px !important;
  position: relative;
  &:before {
    border-bottom: 1px solid ${(props) => props.theme.bgBlue};
  }
  > input {
    height: 50px;
    color: ${(props) => props.theme.textColor};
  }
`;

const StEditBtn = styled(IconButton)``;

const StDelBtn = styled(IconButton)``;

const StLayoutChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StFolder = styled.div`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const StFolderli = styled.button`
  width: 120px;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-size: 0;
`;

const StFolderIcon = styled(Folder)`
  fill: ${(props) => props.theme.fillGrey};
  border: 1px solid ${(props) => props.theme.fillGrey};
  border-radius: 50px;
`;
const StFolderP = styled.p`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 0.875rem;
  margin-top: 12px;
  color: ${(props) => props.theme.textColor};
`;

const StBookmarkAdd = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 99;
  transition: visibility 0.3s ease-in-out;
  visibility: hidden;
  &.off {
    visibility: hidden;
    transition-delay: 0.5s ease-in-out;
  }
  &.on {
    visibility: visible;
  }
`;
const StModalBg = styled.div`
  background: rgba(18, 18, 18, 0.4);
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
  width: 100%;
  min-height: 100vh;
  &.on {
    opacity: 1;
  }
  &.off {
    transition-delay: 1s ease-in-out;
    opacity: 0;
  }
`;

const StBookmarkAddModal = styled.div`
  width: 500px;
  height: 250px;
  position: absolute;
  background: ${(props) => props.theme.bgwhite};
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  border-radius: 10px;
  margin: auto;
  overflow: hidden;
  transition: transform 0.3s ease-out;
  transform: translateY(100px);
  transition-delay: 0.3s ease-in-out;
  z-index: 10;
  &.on {
    transition-delay: 0.3s ease-in-out;
    transform: translateY(0);
  }
  &.off {
    transform: translateY(100px);
  }
`;

const StForm = styled.form`
  padding: 70px 75px;
`;

const StModalTitle = styled.h3`
  font-weight: 800;
  font-size: 1.25rem;
  margin-bottom: 35px;
  text-align: center;
`;
const StInput = styled.input`
  width: 100%;
  height: 45px;
  border: 0;
  outline: 0;
  padding-right: 90px;
  border-bottom: 1px solid ${(props) => props.theme.bgBlue};
  background: transparent;
  color: ${(props) => props.theme.textColor};
  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }
`;
const StInputWrapper = styled.div`
  position: relative;
`;
const StSubmitBtn = styled.button`
  position: absolute;
  width: 85px;
  height: 45px;
  right: 0px;
  top: 0;
  background: ${(props) => props.theme.bgBlue};
  color: ${(props) => props.theme.textwhite};
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const StCloseBtn = styled.svg`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  transition: all 0.3s;
  stroke: ${(props) => props.theme.borderGray};
  &:hover {
    transform: rotatez(180deg);
  }
`;

const StPencil = styled(Pencil)`
  fill: ${(props) => props.theme.fillblack};
`;
const StTrash = styled(Trash)`
  fill: ${(props) => props.theme.fillblack};
`;

const StDelIcon = styled(Delx)`
  fill: ${(props) => props.theme.fillblack};
`;
