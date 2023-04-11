import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CATEGORY, SEARCH } from "api";
import { PostCard, Layout, NoSearched, Sort } from "components";
import {
  endPageState,
  searchedCategoryState,
  searchedKeywordState,
  searchedPostsState,
} from "store/atoms";
import { Category as ICategory, NavItem, Post, SortItem } from "types";

const Searched = () => {
  const SORT_ITEMS: SortItem[] = [
    {
      itemValue: "연관순",
      handler: () =>
        getSearchedData({ keyword: searchedKeyword, page, sort: "관심도" }),
    },
    {
      itemValue: "최신순",
      handler: () =>
        getSearchedData({ keyword: searchedKeyword, page, sort: "생성일자" }),
    },
    {
      itemValue: "조회순",
      handler: () =>
        getSearchedData({ keyword: searchedKeyword, page, sort: "조회수" }),
    },
    {
      itemValue: "댓글순",
      handler: () =>
        getSearchedData({ keyword: searchedKeyword, page, sort: "댓글수" }),
    },
  ];
  const [navItems, setNavItems] = useState<NavItem[]>();
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("");

  const [searchedPosts, setSearchedPosts] = useRecoilState(searchedPostsState);
  const setSearchedCategory = useSetRecoilState(searchedCategoryState);
  const searchedKeyword = useRecoilValue(searchedKeywordState);
  const [endPage, setEndPage] = useRecoilState(endPageState);

  const navigate = useNavigate();

  const { data: categoryData } = useQuery<ICategory[]>(
    "getCategories",
    CATEGORY.getCategories
  );
  const { mutate: getCategoryData } = useMutation(SEARCH.getCategoryData, {
    onSuccess: (res) => {
      setSearchedPosts(res.data.searchResponseDtoList as Post[]);
      setEndPage(res.data.endPage);
    },
    onError: () => {
      setSearchedPosts([]);
      setEndPage(1);
    },
  });

  const { mutate: getSearchedData } = useMutation(SEARCH.getSearchedData, {
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
    getSearchedData({ keyword: searchedKeyword, page, sort });
    //eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    setEndPage(1);
    getSearchedData({ keyword: searchedKeyword, page, sort: "관심도" });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (categoryData) {
      const categories: NavItem[] = categoryData.map((v) => {
        return {
          itemValue: v.categoryName,
          handler: () => {
            setPage(1);
            setSearchedCategory(v.categoryName);
            getCategoryData({
              category: v.categoryName,
              page: 1,
              sort: "관심도",
            });
            navigate(`/category/${v.categoryName}`);
          },
        };
      });
      setNavItems(categories);
    }
  }, [categoryData, navigate, getCategoryData, setSearchedCategory]);

  return (
    <Layout
      breadcrumb={
        searchedPosts &&
        searchedPosts.length > 0 && (
          <StBreadCrumbWrapper>
            <StBreadCrumb>
              총 {searchedPosts.length}개의 결과를 찾았습니다.
            </StBreadCrumb>
            <Sort sortItems={SORT_ITEMS} sort={sort} setSort={setSort} />
          </StBreadCrumbWrapper>
        )
      }
      navItems={navItems}
      page={{ page, endPage, setPage }}
    >
      {searchedPosts && searchedPosts?.length > 0 ? (
        searchedPosts.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <NoSearched />
      )}
    </Layout>
  );
};

export default Searched;

const StBreadCrumbWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StBreadCrumb = styled.div`
  font-size: 1.5rem;
`;
