import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CATEGORY, SEARCH, MYPAGE } from "api";
import { PostCard, Layout, NoSearched } from "components";
import {
  endPageState,
  searchedCategoryState,
  searchedPostsState,
} from "store/atoms";
import { Category as ICategory, NavItem, Post } from "types";

const MyPost = () => {
  const [navItems, setNavItems] = useState<NavItem[]>();
  const [page, setPage] = useState<number>(1);
  const [searchedPosts, setSearchedPosts] = useRecoilState(searchedPostsState);
  const setSearchedCategory = useSetRecoilState(searchedCategoryState);
  const [endPage, setEndPage] = useRecoilState(endPageState);

  const navigate = useNavigate();

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
  }, []);

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
    <Layout navItems={navItems} page={{ page, endPage, setPage }}>
      {searchedPosts && searchedPosts?.length > 0 ? (
        searchedPosts.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <NoSearched />
      )}
    </Layout>
  );
};

export default MyPost;
