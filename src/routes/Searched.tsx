import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
      sort: "관심도",
      itemValue: "연관순",
      handler: () =>
        getSearchedData({ keyword: searchedKeyword, page, sort: "관심도" }),
    },
    {
      sort: "생성일자",
      itemValue: "최신순",
      handler: () =>
        getSearchedData({ keyword: searchedKeyword, page, sort: "생성일자" }),
    },
    {
      sort: "조회수",
      itemValue: "조회순",
      handler: () =>
        getSearchedData({ keyword: searchedKeyword, page, sort: "조회수" }),
    },
    {
      sort: "댓글수",
      itemValue: "댓글순",
      handler: () =>
        getSearchedData({ keyword: searchedKeyword, page, sort: "댓글수" }),
    },
  ];
  const [navItems, setNavItems] = useState<NavItem[]>();
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("");
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const [searchedPosts, setSearchedPosts] = useRecoilState(searchedPostsState);
  const setSearchedCategory = useSetRecoilState(searchedCategoryState);
  const searchedKeyword = useRecoilValue(searchedKeywordState);
  const [endPage, setEndPage] = useRecoilState(endPageState);

  const navigate = useNavigate();
  const params = useParams();

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
    getSearchedData({
      keyword: searchedKeyword,
      page,
      sort: sort === "" ? "관심도" : sort,
    });
    //eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    setEndPage(1);
    getSearchedData({ keyword: searchedKeyword, page, sort: "관심도" });
    //eslint-disable-next-line
  }, [params]);

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
              총 <span>{searchedPosts.length}</span>개의 결과를 찾았습니다.
            </StBreadCrumb>
            <Sort sortItems={SORT_ITEMS} sort={sort} setSort={setSort} />
          </StBreadCrumbWrapper>
        )
      }
      navItems={navItems}
      isNavOpen={isNavOpen}
      setIsNavOpen={setIsNavOpen}
      page={{ page, endPage, setPage }}
      isPagination={searchedPosts && searchedPosts.length > 0}
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
  gap: 30px;
  align-items: center;
`;

const StBreadCrumb = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  > span {
    color: ${(props) => props.theme.textBlue};
    font-weight: 600;
    font-size: 1.125rem;
  }
`;
