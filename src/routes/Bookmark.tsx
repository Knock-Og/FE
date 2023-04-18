import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { IconButton, Input } from "@mui/material";
import styled from "styled-components";
import { Folder, FolderPlus, Pencil, Trash, Delx } from "assets";
import { BOOKMARK } from "api";
import { PostCard, Layout, NoSearched } from "components";
import { endPageState, searchedPostsState } from "store/atoms";
import { Bookmark as IBookmark, NavItem, Post } from "types";

const Bookmark = () => {
  const params = useParams();

  const [page, setPage] = useState<number>(1);
  const [isEdit, setIsEdit] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>();
  const [editedFolderName, setEditedFolderName] = useState(
    params.folderName as string
  );
  const [isShowAddFolderModal, setIsShowAddFolderModal] =
    useState<boolean>(false);
  const [addInput, setAddInput] = useState<string>("");

  const [searchedPosts, setSearchedPosts] = useRecoilState(searchedPostsState);
  const [endPage, setEndPage] = useRecoilState(endPageState);

  const navigate = useNavigate();
  const location = useLocation();
  const [folderId, setFolderId] = useState<number>(0);

  const { mutate: getBookmarks } = useMutation(BOOKMARK.getBookmarks, {
    onSuccess: (res) => {
      const nav = res.data.map((v: IBookmark) => {
        return {
          itemValue: v.bookMarkFolderName,
          handler: () => {
            navigate(`/bookmark/${v.bookMarkFolderName}`, {
              state: { folderId: v.id },
            });
            getBookmark({ folderId: v.id, page: 1 });
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
    if (editedFolderName.trim() === "")
      return alert("변경할즐겨찾기명을 적어주세요");
    editBookmark({
      folderId,
      bookMarkFolderName: editedFolderName,
    });
    navigate(`/bookmark/${editedFolderName}`);
    handleClickEditBtn();
    setAddInput("");
  };

  const handleClickDelBtn = () => {
    deleteBookmark(folderId);
    navigate("/bookmark");
    handleClickEditBtn();
    setAddInput("");
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
  }, []);

  useEffect(() => {
    if (!params.folderName) {
      setSearchedPosts([]);
    }
    //eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    const folId = location?.state?.folderId;
    setFolderId(folId ? folId : 0);
  }, [location.state]);
  const addBookmarkBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addInput.trim() === "") return alert("추가할즐겨찾기명을 적어주세요")
    addBookmark(addInput);
    setAddInput("");
    setIsShowAddFolderModal(false);
  };
  return (
    <>
      <StCategoryAdd className={isShowAddFolderModal ? "on" : "off"}>
        <StSignBox className={isShowAddFolderModal ? "on" : "off"}>
          <StCategoryForm onSubmit={addBookmarkBtn}>
            <StIoClose
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
            </StIoClose>
            <StCategoryTitle>즐겨찾기 폴더 추가</StCategoryTitle>
            <StCategory>
              <StCategoryInput
                type="text"
                value={addInput}
                maxLength={10}
                placeholder="추가할 폴더 명"
                onChange={(e) => setAddInput(e.target.value)}
              />
              <StCommonButton>추가</StCommonButton>
            </StCategory>
          </StCategoryForm>
        </StSignBox>
        <StSignBg
          onClick={() => setIsShowAddFolderModal(!isShowAddFolderModal)}
          className={isShowAddFolderModal ? "on" : "off"}
        />
      </StCategoryAdd>

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
                  defaultValue={editedFolderName}
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
                {isEdit ? (
                 
                    <StDelIcon />
                  
                ) : (
                  <StPencil />
                )}
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

const StCategoryAdd = styled.div`
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
const StSignBg = styled.div`
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

const StSignBox = styled.div`
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

const StCategoryForm = styled.form`
  padding: 70px 75px;
`;

const StCategoryTitle = styled.h3`
  font-weight: 800;
  font-size: 1.25rem;
  margin-bottom: 35px;
  text-align: center;
`;
const StCategoryInput = styled.input`
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
const StCategory = styled.div`
  position: relative;
`;
const StCommonButton = styled.button`
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

const StIoClose = styled.svg`
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
;