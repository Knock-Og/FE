import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { CATEGORY } from "api";
import { PostCard, Layout, NoSearched } from "components";
import { searchedPostsState } from "store/atoms";
import { Category, NavItem } from "types";

const Searched = () => {
  const navigate = useNavigate();
  const { data: categoryData } = useQuery<Category[]>(
    "getCategories",
    CATEGORY.getCategories
  );

  const searchedPosts = useRecoilValue(searchedPostsState);
  const [navItems, setNavItems] = useState<NavItem[]>();

  useEffect(() => {
    if (categoryData) {
      const categories: NavItem[] = categoryData.map((v) => {
        return {
          itemValue: v.categoryName,
          handler: () => navigate(`/category/${v.categoryName}`),
        };
      });
      setNavItems(categories);
    }
  }, [categoryData, navigate]);

  return (
    <Layout navItems={navItems}>
      {searchedPosts ? (
        searchedPosts.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <NoSearched />
      )}
    </Layout>
  );
};

export default Searched;
