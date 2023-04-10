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
  children,
  breadcrumb,
}: Props) => {
  return (
    <StLayout>
      <Header />
      <StContainer>
        {/* {navItems && (
          <Nav
            navItems={navItems}
            isBookMarkNav={isBookMarkNav}
            addBookmarkHandler={addBookmarkHandler}
          />
        )} */}
          {breadcrumb && (
            <StBreadCrumbWrapper>{breadcrumb}</StBreadCrumbWrapper>
          )}
          <StPostsWrapper>{children}</StPostsWrapper>
      </StContainer>
    </StLayout>
  );
};

export default Layout;

const StLayout = styled.div``;

const StContainer = styled.div`
  width: 1376px;
  margin: 0 auto;
  min-height: calc(100% - 130px);
`;


const StPostsWrapper = styled.div``;

const StBreadCrumbWrapper = styled.div`
  padding: 0px 0px 10px 10px;
  display: flex;
  align-items: center;
`;
