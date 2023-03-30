import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { IconButton, Input } from "@mui/material";
import { Edit, FolderDelete, Cancel } from "@mui/icons-material";
import styled from "styled-components";
import { BOOKMARK } from "api";
import { PostCard, Layout, NoSearched } from "components";
import { searchedPostsState } from "store/atoms";
import { Bookmark as IBookmark, NavItem, Post } from "types";

const Bookmark = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [searchedPosts, setSearchedPosts] = useRecoilState(searchedPostsState);
  const [navItems, setNavItems] = useState<NavItem[]>();
  const [isEdit, setIsEdit] = useState(false);
  const [editedFolderName, setEditedFolderName] = useState(
    params.folderName as string
  );

  const { data: bookmarksData } = useQuery<IBookmark[]>(
    "getBookmarks",
    BOOKMARK.getBookmarks
  );
  const { mutate: getBookmark } = useMutation(BOOKMARK.getBookmark, {
    onSuccess: (res) => setSearchedPosts(res.data as Post[]),
    onError: () => setSearchedPosts(null),
  });

  const { mutate: addBookmark } = useMutation(BOOKMARK.addBookmark, {
    onSuccess: () => queryClient.invalidateQueries("getBookmarks"),
  });
  const { mutate: editBookmark } = useMutation(BOOKMARK.editBookmark, {
    onSuccess: (res) => {
      queryClient.invalidateQueries("getBookmarks");
      alert(res.data.message);
    },
  });
  const { mutate: deleteBookmark } = useMutation(BOOKMARK.deleteBookmark, {
    onSuccess: () => queryClient.invalidateQueries("getBookmarks"),
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
  };

  const handleClickDelBtn = () => {
    deleteBookmark(location.state.folderId);
    navigate("/bookmark");
  };

  useEffect(() => {
    setSearchedPosts(null);
  }, [setSearchedPosts]);

  useEffect(() => {
    if (bookmarksData) {
      const bookmarks: NavItem[] = bookmarksData.map((v) => {
        return {
          itemValue: v.bookMarkFolderName,
          handler: () => {
            navigate(`/bookmark/${v.bookMarkFolderName}`, {
              state: { folderId: v.id },
            });
            getBookmark(v.id);
          },
        };
      });
      setNavItems(bookmarks);
    }
  }, [bookmarksData, navigate, getBookmark]);

  return (
    <Layout
      navItems={navItems}
      addBookmarkHandler={addBookmark}
      isBookMarkNav
      breadcrumb={
        params.folderName && (
          <>
            {isEdit ? (
              <StBreadCrumbInput
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
