import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { IconButton, Input } from "@mui/material";
import { Edit, FolderDelete, Cancel } from "@mui/icons-material";
import styled from "styled-components";
import { Folder } from "assets";
import { BOOKMARK } from "api";
import { PostCard, Layout } from "components";
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
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

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

  return (
    <Layout
      navItems={navItems}
      isNavOpen={isNavOpen}
      setIsNavOpen={setIsNavOpen}
      addBookmarkHandler={addBookmark}
      isBookMarkNav
      page={{ page, endPage, setPage }}
      isPagination={searchedPosts && searchedPosts.length > 0}
      breadcrumb={
        params.folderName && (
          <>
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
          </>
        )
      }
    >
      {searchedPosts && searchedPosts?.length > 0 ? (
        searchedPosts.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <StFolder>
          {navItems?.map((folder) => (
            <StFolderli key={folder.itemValue} onClick={folder.handler}>
              <Folder />
              <StFolderP>{folder.itemValue}</StFolderP>
            </StFolderli>
          ))}
        </StFolder>
      )}
    </Layout>
  );
};

export default Bookmark;

const StBreadCrumb = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
`;

const StBreadCrumbInput = styled(Input)`
  margin-right: 30px;
`;

const StEditBtn = styled(IconButton)``;

const StDelBtn = styled(IconButton)``;

const StFolder = styled.div`
  width: 625px;
  flex-wrap: wrap;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
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
