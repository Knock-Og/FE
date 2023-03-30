import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import { Logo, Search, AccountDrop, Sun, Moon } from "assets";
import { SEARCH } from "api";
import { getCookie, removeCookie } from "api/cookies";
import { isDarkState, searchedPostsState } from "store/atoms";
import { Post } from "types";

const Header = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const setSearchedPosts = useSetRecoilState(searchedPostsState);
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const accessToken = getCookie("access_token");

  const { mutate } = useMutation(SEARCH.getSearchedData, {
    onSuccess: (res) => setSearchedPosts(res.data as Post[]),
  });

  const handleClickSearchBtn = () => {
    mutate(`${searchInputRef.current?.value}`);
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
      <StHeader>
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
      </StHeader>

      <StMainWrapper>
        <Logo />
        <StSearchWrapper>
          <StSearchInput
            ref={searchInputRef}
            onKeyDown={handleKeyDown}
            placeholder="Ask, Seek, Knock !"
          />
          <StSearchBtn onClick={handleClickSearchBtn}>찾기</StSearchBtn>
        </StSearchWrapper>
      </StMainWrapper>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

const StHeader = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  padding: 30px;
`;

const StMainWrapper = styled.div`
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  gap: 50px;
`;

const StSearchWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StSearchInput = styled.input`
  width: 100%;
  height: 64px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 128px;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
  padding: 20px 40px;
  outline: none;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
`;

const StSearchBtn = styled(Search)`
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
`;

const StModeToggleBtn = styled.button`
  border: none;
  background: none;
`;

const StAccountBtn = styled.button`
  border: none;
  background: none;
`;
