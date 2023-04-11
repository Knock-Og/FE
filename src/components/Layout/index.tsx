import { Pagination } from "@mui/material";
import styled from "styled-components";
import { Header } from "components";
import { NavItem, Page } from "types";

interface Props {
  navItems?: NavItem[];
  children: React.ReactNode;
  isBookMarkNav?: boolean;
  breadcrumb?: React.ReactNode;
  addBookmarkHandler?: (addBookmarkInput: string) => void;
  page?: Page;
}

const Layout = ({ children, breadcrumb, addBookmarkHandler, page }: Props) => {
  return (
    <StLayout>
      <Header />
      <StContainer>
        {breadcrumb && <StBreadCrumbWrapper>{breadcrumb}</StBreadCrumbWrapper>}
        <StPostsWrapper>
          {children}
          {page && (
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
  width: 1376px;
  margin: 0 auto;
  min-height: calc(100% - 130px);
`;

const StPostsWrapper = styled.div`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StBreadCrumbWrapper = styled.div`
  padding: 0px 0px 10px 10px;
  display: flex;
  align-items: center;
`;
