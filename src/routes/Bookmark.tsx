import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { IconButton, Input } from "@mui/material";
import { Edit, FolderDelete, Cancel } from "@mui/icons-material";
import styled from "styled-components";
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
            getBookmark({ folderId: v.id, page });
          },
        };
      });
      setNavItems(nav);
    },
    onError: () => {
      setNavItems([{ itemValue: "", handler: () => null }]);
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
    setSearchedPosts([]);
    //eslint-disable-next-line
  }, []);

  return (
    <Layout
      navItems={navItems}
      addBookmarkHandler={addBookmark}
      isBookMarkNav
      page={{ page, endPage, setPage }}
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
        <NoSearched />
      )}
    </Layout>
  );
};

export default Bookmark;

const StBreadCrumb = styled.div`
  font-size: 1.5rem;
`;

const StBreadCrumbInput = styled(Input)``;

const StEditBtn = styled(IconButton)``;

const StDelBtn = styled(IconButton)``;
