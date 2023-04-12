import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { IconButton, Input } from "@mui/material";
import { Edit, FolderDelete, Cancel } from "@mui/icons-material";
import styled from "styled-components";
import { Folder, FolderPlus } from "assets";
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
    editBookmark({
      folderId: location.state.folderId,
      bookMarkFolderName: editedFolderName,
    });
    navigate(`/bookmark/${editedFolderName}`);
    handleClickEditBtn();
  };

  const handleClickDelBtn = () => {
    deleteBookmark(location.state.folderId);
    navigate("/bookmark");
    handleClickEditBtn();
  };

  useEffect(() => {
    setEndPage(1);
    getBookmarks();
    params.folderName
      ? getBookmark({ folderId: location.state.folderId, page: 1 })
      : setSearchedPosts([]);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!params.folderName) {
      setSearchedPosts([]);
    }
    //eslint-disable-next-line
  }, [params]);

  return (
    <>
      <StCategoryAdd className={isShowAddFolderModal ? "on" : "off"}>
        <StSignBox className={isShowAddFolderModal ? "on" : "off"}>
          <StCategoryForm
            onSubmit={(e) => {
              e.preventDefault();
              addBookmark(addInput);
              setIsShowAddFolderModal(false);
            }}
          >
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
                <Folder />
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
                      <Edit />
                    </IconButton>
                  }
                />
              ) : (
                <StBreadCrumb>{params.folderName}</StBreadCrumb>
              )}
              <StEditBtn onClick={handleClickEditBtn}>
                {isEdit ? <Cancel /> : <Edit />}
              </StEditBtn>
              <StDelBtn onClick={handleClickDelBtn}>
                <FolderDelete />
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
  width: 625px;
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

const StFolderP = styled.p`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 0.875rem;
  margin-top: 12px;
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
  background: ${(props) => props.theme.bgColor};
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
  height: 44px;
  border: 0;
  outline: 0;
  padding-right: 90px;
  border-bottom: 1px solid ${(props) => props.theme.blockBorder};
  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }
`;
const StCategory = styled.div`
  position: relative;
`;
const StCommonButton = styled.button`
  position: absolute;
  width: 84px;
  height: 44px;
  right: 0px;
  top: 0;
  background: ${(props) => props.theme.keyBlue};
  color: ${(props) => props.theme.textwhite};
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const StIoClose = styled.svg`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  stroke: ${(props) => props.theme.lightGrey};
`;
