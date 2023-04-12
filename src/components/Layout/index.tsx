import { Pagination } from "@mui/material";
import styled from "styled-components";
import { Header, Setting } from "components";
import { NavItem, Page } from "types";

interface Props {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  page?: Page;
  navItems?: NavItem[];
  isBookMarkNav?: boolean;
  addBookmarkHandler?: (addBookmarkInput: string) => void;
  isNavOpen?: boolean;
  setIsNavOpen?: (isOpen: boolean) => void;
  isPagination?: boolean | null;
}

const Layout = ({
  children,
  breadcrumb,
  navItems,
  isBookMarkNav,
  addBookmarkHandler,
  page,
  isNavOpen,
  setIsNavOpen,
  isPagination,
}: Props) => {
  return (
    <StLayout>
      <Header />
      {navItems && (
        <Setting
          open={isNavOpen}
          setOpen={setIsNavOpen}
          navItems={navItems}
          isBookMarkNav={isBookMarkNav}
          addBookmarkHandler={addBookmarkHandler}
        />
      )}
      <StContainer>
        {breadcrumb && <StBreadCrumbWrapper>{breadcrumb}</StBreadCrumbWrapper>}
        <StPostsWrapper>
          {children}
          {page && isPagination && (
            <Pagination
              count={page.endPage}
              page={page.page}
              onChange={(_, curPage) => {
                window.scrollTo(0, 0);
                page.setPage(curPage);
              }}
              color="primary"
            />
          )}
        </StPostsWrapper>
      </StContainer>
    </StLayout>
  );
};

export default Layout;

const StLayout = styled.div``;

const StContainer = styled.div`
  margin: 200px auto 80px;
  min-width: 1376px;
  width: 1376px;
  @media only screen and (max-width: 1375px) {
    padding: 0px 60px 0 0;
    margin: 200px 60px 80px;
  }
`;


const StPostsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const StBreadCrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
`;
