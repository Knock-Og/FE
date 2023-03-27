import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
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
  const [navItems, setNavItems] = useState<NavItem[]>([
    { itemValue: "test", handler: () => console.log("test") },
  ]);

  const { data: bookmarksData } = useQuery<IBookmark[]>(
    "getBookmarks",
    BOOKMARK.getBookmarks
  );
  const { mutate: getBookmark } = useMutation(BOOKMARK.getBookmark, {
    onSuccess: (res) => setSearchedPosts(res.data as Post[]),
  });

  const { mutate: addBookmark } = useMutation(BOOKMARK.addBookmark, {
    onSuccess: () => queryClient.invalidateQueries("getBookmarks"),
  });
  const { mutate: editBookmark } = useMutation(BOOKMARK.editBookmark, {
    onSuccess: () => queryClient.invalidateQueries("getBookmarks"),
  });
  const { mutate: deleteBookmark } = useMutation(BOOKMARK.deleteBookmark, {
    onSuccess: () => queryClient.invalidateQueries("getBookmarks"),
  });

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
    <Layout navItems={navItems} addBookmarkHandler={addBookmark} isBookMarkNav>
      <StBreadCrumbWrapper>
        {params.folderName && <StBreadCrumb>{params.folderName}</StBreadCrumb>}
        <StEditBtn
          onClick={() =>
            editBookmark({
              folderId: location.state.folderId,
              bookMarkFolderName: params.folderName as string,
            })
          }
        >
          수정
        </StEditBtn>
        <StDelBtn onClick={() => deleteBookmark(location.state.folderId)}>
          삭제
        </StDelBtn>
      </StBreadCrumbWrapper>
      {searchedPosts ? (
        searchedPosts.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <NoSearched />
      )}
    </Layout>
  );
};

export default Bookmark;

const StBreadCrumbWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StBreadCrumb = styled.div`
  font-size: 1.5rem;
`;

const StEditBtn = styled.button``;

const StDelBtn = styled.button``;
