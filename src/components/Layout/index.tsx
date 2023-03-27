import styled from "styled-components";
import { Header, Nav } from "components";
import { NavItem } from "types";

interface Props {
  navItems?: NavItem[];
  children: React.ReactNode;
  isBookMarkNav?: boolean;
  isNavHidden?: boolean;
  addBookmarkHandler?: (addBookmarkInput: string) => void;
}

const Layout = ({
  navItems,
  children,
  isBookMarkNav,
  isNavHidden,
  addBookmarkHandler,
}: Props) => {
  return (
    <>
      <Header />
      <StContainer>
        {navItems && !isNavHidden && (
          <Nav
            navItems={navItems}
            isBookMarkNav={isBookMarkNav}
            addBookmarkHandler={addBookmarkHandler}
          />
        )}
        <StPostCardContainer>{children}</StPostCardContainer>
      </StContainer>
    </>
  );
};

export default Layout;

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
