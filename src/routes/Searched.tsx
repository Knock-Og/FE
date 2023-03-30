import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { CATEGORY, SEARCH } from "api";
import { PostCard, Layout, NoSearched } from "components";
import { searchedPostsState } from "store/atoms";
import { Category as ICategory, NavItem, Post } from "types";

const Searched = () => {
  const navigate = useNavigate();
  const [searchedPosts, setSearchedPosts] = useRecoilState(searchedPostsState);
  const [navItems, setNavItems] = useState<NavItem[]>();

  const { data: categoryData } = useQuery<ICategory[]>(
    "getCategories",
    CATEGORY.getCategories
  );
  const { mutate } = useMutation(SEARCH.getCategoryData, {
    onSuccess: (res) => setSearchedPosts(res.data as Post[]),
  });

  useEffect(() => {
    if (categoryData) {
      const categories: NavItem[] = categoryData.map((v) => {
        return {
          itemValue: v.categoryName,
          handler: () => {
            mutate(v.categoryName);
            navigate(`/category/${v.categoryName}`);
          },
        };
      });
      setNavItems(categories);
    }
  }, [categoryData, navigate, mutate]);

  return (
    <Layout navItems={navItems}>
      {searchedPosts && searchedPosts?.length > 0 ? (
        searchedPosts.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <NoSearched />
      )}
    </Layout>
  );
};

export default Searched;
