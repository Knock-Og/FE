import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import { isDarkState, searchedPostsState } from "store/atoms";
import { useMutation } from "react-query";
import { SEARCH } from "api";
import { Post } from "types";

const Header = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const setSearchedPosts = useSetRecoilState(searchedPostsState);
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    navigate("/book-mark");
  };
  const handleClickLogOut = () => {
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <StContainer>
      <StHeaderLeftWrapper>
        <StLogo>KNOCK</StLogo>
        <StSearch ref={searchInputRef} onKeyDown={handleKeyDown} />
        <button onClick={handleClickSearchBtn}>찾기</button>
      </StHeaderLeftWrapper>
      <StHeaderRightWrapper>
        <StCreatePostBtn onClick={() => navigate("/create")}>
          새 글 작성
        </StCreatePostBtn>
        <StModeToggleBtn onClick={() => setIsDark((prev) => !prev)}>
          {isDark ? "라이트전환" : "다크전환"}
        </StModeToggleBtn>
        <StAccountBtn onClick={handleClickAccountBtn}>어카운트</StAccountBtn>
        <Menu
          anchorEl={anchorEl}
          open={anchorEl !== null}
          onClick={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleClickMyPost}>내 포스트</MenuItem>
          <MenuItem onClick={handleClickBookMark}>즐겨찾기</MenuItem>
          <MenuItem onClick={handleClickLogOut}>로그아웃</MenuItem>
        </Menu>
      </StHeaderRightWrapper>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.div`
  /* position: fixed; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 30px 15px;
`;

const StHeaderLeftWrapper = styled.div`
  display: flex;
  gap: 50px;
`;

const StLogo = styled.div`
  font-size: 2rem;
`;

const StSearch = styled.input`
  width: 500px;
  border-radius: 10px;
`;

const StHeaderRightWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const StCreatePostBtn = styled.button`
  border-radius: 10px;
`;

const StModeToggleBtn = styled.button`
  border-radius: 50%;
`;

const StAccountBtn = styled.button``;
