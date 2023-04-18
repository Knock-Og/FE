import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Pagination } from "@mui/material";
import styled from "styled-components";
import { CATEGORY, SEARCH, MYPAGE } from "api";
import { PostCard, NoSearched, Setting } from "components";
import {
  endPageState,
  searchedCategoryState,
  searchedPostsState,
} from "store/atoms";
import { Category as ICategory, NavItem, Post } from "types";

const MyPostContent = () => {
  const [navItems, setNavItems] = useState<NavItem[]>();
  const [page, setPage] = useState<number>(1);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const [searchedPosts, setSearchedPosts] = useRecoilState(searchedPostsState);
  const setSearchedCategory = useSetRecoilState(searchedCategoryState);
  const [endPage, setEndPage] = useRecoilState(endPageState);

  const navigate = useNavigate();
  const params = useParams();

  const { data: categoryData } = useQuery<ICategory[]>(
    "getCategories",
    CATEGORY.getCategories
  );

  const { mutate: getMyPosts } = useMutation(MYPAGE.getMyPosts, {
    onSuccess: (res) => {
      setSearchedPosts(res.data.postResponseDtoList as Post[]);
      setEndPage(res.data.endPage);
    },
    onError: () => {
      setSearchedPosts([]);
      setEndPage(1);
    },
  });

  const { mutate } = useMutation(SEARCH.getCategoryData, {
    onSuccess: (res) => {
      setSearchedPosts(res.data.searchResponseDtoList as Post[]);
      setEndPage(res.data.endPage);
    },
    onError: () => {
      setSearchedPosts([]);
      setEndPage(1);
    },
  });

  useEffect(() => {
    setEndPage(1);
    getMyPosts(page);
    //eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    getMyPosts(page);
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (categoryData) {
      const categories: NavItem[] = categoryData.map((v) => {
        return {
          itemValue: v.categoryName,
          handler: () => {
            setPage(1);
            setSearchedCategory(v.categoryName);
            mutate({ category: v.categoryName, page: 1, sort: "관심도" });
            navigate(`/category/${v.categoryName}`);
          },
        };
      });
      setNavItems(categories);
    }
  }, [categoryData, navigate, mutate, setSearchedCategory]);

  return (
    <StPostContent>
      <Setting open={isNavOpen} setOpen={setIsNavOpen} navItems={navItems} />
      {searchedPosts && searchedPosts?.length > 0 ? (
        searchedPosts.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <NoSearched />
      )}
      {searchedPosts && searchedPosts.length > 0 && (
        <Pagination
          count={endPage}
          page={page}
          onChange={(_, curPage) => {
            window.scrollTo(0, 0);
            setPage(curPage);
          }}
          color="primary"
        />
      )}
    </StPostContent>
  );
};
export default MyPostContent;

const StPostContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
