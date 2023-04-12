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
      <Setting
        open={isNavOpen}
        setOpen={setIsNavOpen}
        navItems={navItems}
        isBookMarkNav={isBookMarkNav}
        addBookmarkHandler={addBookmarkHandler}
      />
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
  max-width: 1376px;

  margin: 180px auto 80px;
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
