import styled from "styled-components";
import { Header, Nav } from "components";
import { NavItem } from "types";

interface Props {
  navItems?: NavItem[];
  children: React.ReactNode;
  isBookMarkNav?: boolean;
  breadcrumb?: React.ReactNode;
  addBookmarkHandler?: (addBookmarkInput: string) => void;
}

const Layout = ({
  navItems,
  children,
  isBookMarkNav,
  breadcrumb,
  addBookmarkHandler,
}: Props) => {
  return (
    <StLayout>
      <Header />
      <StContainer>
        {navItems && (
          <Nav
            navItems={navItems}
            isBookMarkNav={isBookMarkNav}
            addBookmarkHandler={addBookmarkHandler}
          />
        )}
        <StContents>
          {breadcrumb && (
            <StBreadCrumbWrapper>{breadcrumb}</StBreadCrumbWrapper>
          )}
          <StPostsWrapper>{children}</StPostsWrapper>
        </StContents>
      </StContainer>
    </StLayout>
  );
};

export default Layout;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
`;

const StContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const StContents = styled.div`
  height: 80vh;
  width: 100%;
  overflow: hidden;
`;

const StPostsWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

const StBreadCrumbWrapper = styled.div`
  padding: 0px 0px 10px 10px;
  display: flex;
  align-items: center;
`;
