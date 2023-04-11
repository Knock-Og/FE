import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import { Logo, Search, AccountDrop, Sun, Moon } from "assets";
import { SEARCH } from "api";
import { getCookie, removeCookie } from "api/cookies";
import {
  isDarkState,
  searchedKeywordState,
  searchedPostsState,
} from "store/atoms";
import { Post } from "types";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const setSearchedPosts = useSetRecoilState(searchedPostsState);
  const setSearchedKeyword = useSetRecoilState(searchedKeywordState);
  const [isDark, setIsDark] = useRecoilState(isDarkState);

  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const accessToken = getCookie("access_token");

  const { mutate: getSearchedData } = useMutation(SEARCH.getSearchedData, {
    onSuccess: (res) => setSearchedPosts(res.data as Post[]),
  });

  const handleClickSearchBtn = () => {
    getSearchedData({
      keyword: `${searchInputRef.current?.value}`,
      page: 1,
      sort: "관심도",
    });
    setSearchedKeyword(`${searchInputRef.current?.value}`);
    navigate(`/search?k=${searchInputRef.current?.value}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickSearchBtn();
    }
  };

  const handleClickAccountBtn = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClickMyPost = () => {
    setAnchorEl(null);
    navigate("/mypage/posts");
  };
  const handleClickBookMark = () => {
    setAnchorEl(null);
    navigate("/bookmark");
  };
  const handleClickLogOut = () => {
    setAnchorEl(null);
    navigate("/login");
    removeCookie("access_token");
  };

  return (
    <StContainer>
      <StHeaderLeftWrapper>
        <StLogo onClick={() => navigate("/")} />
        <StSearchWrapper>
          <StSearchInput ref={searchInputRef} onKeyDown={handleKeyDown} />
          <StSearchBtn onClick={handleClickSearchBtn}>찾기</StSearchBtn>
        </StSearchWrapper>
      </StHeaderLeftWrapper>
      <StHeaderRightWrapper>
        <StModeToggleBtn onClick={() => setIsDark((prev) => !prev)}>
          {isDark ? <Sun /> : <Moon />}
        </StModeToggleBtn>
        <StAccountBtn onClick={handleClickAccountBtn}>
          <AccountDrop />
        </StAccountBtn>
        <Menu
          anchorEl={anchorEl}
          open={anchorEl !== null}
          onClick={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => navigate("/write")}>새 글 작성</MenuItem>
          <MenuItem onClick={handleClickMyPost}>내 포스트</MenuItem>
          <MenuItem onClick={handleClickBookMark}>즐겨찾기</MenuItem>
          <MenuItem onClick={handleClickLogOut}>
            {accessToken ? "로그아웃" : "로그인"}
          </MenuItem>
        </Menu>
      </StHeaderRightWrapper>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StHeaderLeftWrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  gap: 70px;
`;

const StLogo = styled(Logo)`
  transform: translateY(-10px);
  cursor: pointer;
`;

const StSearchWrapper = styled.div`
  width: 60%;
  position: relative;
`;

const StSearchInput = styled.input`
  width: 100%;
  height: 32px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 128px;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
  padding: 10px;
  outline: none;
`;

const StSearchBtn = styled(Search)`
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
`;

const StHeaderRightWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

const StModeToggleBtn = styled.button`
  border: none;
  background: none;
`;

const StAccountBtn = styled.button`
  border: none;
  background: none;
`;
