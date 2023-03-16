import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Header, Nav, PostCard } from "components";
import { NavItem, Post } from "types";

const Temp = () => {
  const navigate = useNavigate();
  const NAV_ITEMS: NavItem[] = [
    {
      itemValue: "카테고리1",
      handler: () => navigate(`/book-mark?bf=카테고리1`),
    },
    {
      itemValue: "카테고리2",
      handler: () => navigate(`/book-mark?bf=카테고리2`),
    },
    {
      itemValue: "카테고리3",
      handler: () => navigate(`/book-mark?bf=카테고리3`),
    },
    {
      itemValue: "카테고리4",
      handler: () => navigate(`/book-mark?bf=카테고리4`),
    },
    {
      itemValue: "카테고리5",
      handler: () => navigate(`/book-mark?bf=카테고리5`),
    },
  ];
  const POSTS: Post[] = [
    {
      id: 1,
      memberName: "swing",
      title: "title",
      content: "content",
      createdAt: "2023-03-16",
      modifiedAt: "2023-03-16",
      keywords: ["React", "Spring"],
      commentCount: 5,
    },
    {
      id: 2,
      memberName: "swing",
      title:
        "titletitletitletitletitletitletitletitletitletitletitletitletitletitletitle",
      content:
        "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
      createdAt: "2023-03-16",
      modifiedAt: "2023-03-16",
      keywords: ["React", "Spring"],
      commentCount: 5,
    },
  ];
  return (
    <>
      <Header />
      <StContainer>
        <Nav navItems={NAV_ITEMS} isBookMarkNav />
        <StPostCardContainer>
          {POSTS.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </StPostCardContainer>
      </StContainer>
    </>
  );
};

export default Temp;

const StContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const StPostCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px;
  border: 1px solid gainsboro;
`;
