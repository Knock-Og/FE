import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  HeaderLogo,
  Search,
  Sun,
  Dark,
  Headermenu,
  MainArr,
  Bell,
  AlarmIcon,
} from "assets";
import { SEARCH } from "api";
import { getCookie, removeCookie } from "api/cookies";
import {
  endPageState,
  isDarkState,
  searchedKeywordState,
  searchedPostsState,
} from "store/atoms";
import { Post } from "types";

const Header = () => {
  const [isOn, setIsOn] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);

  const setSearchedPosts = useSetRecoilState(searchedPostsState);
  const setSearchedKeyword = useSetRecoilState(searchedKeywordState);
  const setEndPage = useSetRecoilState(endPageState);
  const [isDark, setIsDark] = useRecoilState(isDarkState);

  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const accessToken = getCookie("access_token");

  const { mutate: getSearchedData } = useMutation(SEARCH.getSearchedData, {
    onSuccess: (res) => {
      setSearchedPosts(res.data.searchResponseDtoList as Post[]);
      setEndPage(res.data.endPage);
    },
    onError: () => {
      setSearchedPosts([]);
      setEndPage(1);
    },
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

  const handleClickAccountBtn = () => {
    setIsOn(!isOn);
    setIsAlarm(false);
  };

  const isAlarmBtn = () => {
    setIsAlarm(!isAlarm);
    setIsOn(false);
  };

  const handleClickLogOut = () => {
    navigate("/login");
    removeCookie("access_token");
  };
  const [headerMove, setHeaderMove] = useState(false);
  const stContainerRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    if (window.scrollY !== 0) {
      setHeaderMove(true);
      if (stContainerRef.current) {
        stContainerRef.current.classList.add("on");
      }
    } else {
      setHeaderMove(false);
      if (stContainerRef.current) {
        stContainerRef.current.classList.remove("on");
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StContainer className={headerMove ? "on" : ""}>
      <StHeaderLeftWrapper>
        <StHeaderLogo onClick={() => navigate("/")} />
        <StSearchWrapper>
          <StSearchInput
            ref={searchInputRef}
            onKeyDown={handleKeyDown}
            placeholder="검색어 또는 키워드를 입력"
          />
          <StSearchBtn onClick={handleClickSearchBtn}>찾기</StSearchBtn>
        </StSearchWrapper>
      </StHeaderLeftWrapper>
      <StHeaderRightWrapper>
        <StHeaderMeun>
          <StWrite onClick={() => navigate("/write")}>게시물작성</StWrite>
          <StbellWrap onClick={isAlarmBtn}>
            <Bell />
          </StbellWrap>
          <StAccountBtn onClick={handleClickAccountBtn}>
            <Menuperson />
            <MenuArr className={isOn ? "on" : ""} />
          </StAccountBtn>
        </StHeaderMeun>
        <StMenu className={isOn ? "on" : ""}>
          <StMenuItem onClick={() => navigate("/mypage")}>
            마이페이지
          </StMenuItem>
          <StMenuItem onClick={() => navigate("/bookmark")}>
            즐겨찾기
          </StMenuItem>
          <StMenuItem onClick={handleClickLogOut}>
            {accessToken ? "로그아웃" : "로그인"}
          </StMenuItem>
        </StMenu>
        <StAlarm className={isAlarm ? "on" : ""}>
          <StAlarmTop>
            <StAlarmTitle> 알림</StAlarmTitle>
          </StAlarmTop>
          <StAlarmContentWrap>
            <StAlarmcontent>
              <StAlarmIconWrap>
                <AlarmIcon />
              </StAlarmIconWrap>
              <StAlarmcontentP>
                000님이 '0000'댓글을 달았습니다.
              </StAlarmcontentP>
            </StAlarmcontent>
          </StAlarmContentWrap>
        </StAlarm>
      </StHeaderRightWrapper>
      <StModeToggleBtn onClick={() => setIsDark((prev) => !prev)}>
        {isDark ? <Sun /> : <Dark />}
        {isDark ? "라이트모드로 전환" : "다크모드로 전환"}
      </StModeToggleBtn>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.div`
  min-width: 1440px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 130px;
  padding: 0 60px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.lightGrey};
  background: ${(props) => props.theme.bgColor};
  z-index: 9;
  transition: all 0.3s;
  &.on {
    position: fixed;
    height: 85px;
    box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.05);
  }
`;

const StHeaderLeftWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  gap: 80px;
`;

const StHeaderLogo = styled(HeaderLogo)`
  cursor: pointer;
  position: relative;
  top: -5px;
  width: 140px;
  height: 36px;
`;

const StSearchWrapper = styled.div`
  width: calc(100% - 220px);
  position: relative;
`;

const StSearchInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 65px;
  border: 1px solid ${(props) => props.theme.lightGrey};
  box-shadow: 4px 5px 11px -5px rgba(106, 115, 147, 0.4);
  padding: 0px 55px 0px 30px;
  outline: none;
`;

const StSearchBtn = styled(Search)`
  position: absolute;
  right: 4.46%;
  top: 0;
  bottom: 0;
  margin: auto 0;
`;

const StHeaderRightWrapper = styled.div`
  position: relative;
`;

const StModeToggleBtn = styled.button`
  border: none;
  background: ${(props) => props.theme.bgColor};
  width: 150px;
  height: 48px;
  box-shadow: 0px 5px 7px -4px rgba(0, 0, 0, 0.3);
  border-radius: 60px;
  position: fixed;
  font-size: 0.875rem;
  right: 60px;
  bottom: 60px;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) => props.theme.keyBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 5px;
  z-index: 2;
`;

const StHeaderMeun = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;
const StWrite = styled.button`
  border: none;
  background: ${(props) => props.theme.bgColor};
  width: 120px;
  height: 40px;
  box-shadow: 0px 5px 7px -4px rgba(0, 0, 0, 0.3);
  border-radius: 60px;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) => props.theme.keyBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  gap: 5px;
`;
const StbellWrap = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  padding-top: 5px;
`;

const StAccountBtn = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  position: relative;
  outline: 0;
  cursor: pointer;
`;
const Menuperson = styled(Headermenu)`
  fill: ${(props) => props.theme.lightGrey};
  margin-right: 10px;
`;
const MenuArr = styled(MainArr)`
  fill: ${(props) => props.theme.lightGrey};

  transition: all 0.3s;
  &.on {
    transform: rotateZ(-180deg);
  }
`;
const StMenu = styled.div`
  position: absolute;
  width: 150px;
  bottom: -170px;
  right: 0;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.05);
  background: ${(props) => props.theme.bgColor};
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  transform: translateY(-10px);
  visibility: hidden;
  &.on {
    opacity: 1;
    visibility: visible;
    transform: translateY(0px);
  }
`;
const StMenuItem = styled.button`
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: left;
  border: 0;
  background: transparent;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.lightBlue};
    color: ${(props) => props.theme.keyBlue};
  }
`;

const StAlarm = styled.div`
  position: absolute;
  width: 350px;
  height: 600px;
  right: 0;
  bottom: -625px;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.05);
  background: ${(props) => props.theme.bgColor};
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  transform: translateY(-10px);
  visibility: hidden;
  &.on {
    opacity: 1;
    visibility: visible;
    transform: translateY(0px);
  }
`;
const StAlarmTop = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  height: 45px;
  line-height: 45px;
  padding: 0 20px;
`;

const StAlarmTitle = styled.p`
  font-weight: 700;
`;
const StAlarmIconWrap = styled.div`
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StAlarmContentWrap = styled.div`
  height: calc(100% - 46px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollColor};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bgColor};
  }
`;
const StAlarmcontent = styled.div`
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  &:hover {
    background: ${(props) => props.theme.lightBlue};
  }
  &:hover p {
    color: ${(props) => props.theme.keyBlue};
  }
`;

const StAlarmcontentP = styled.p`
  width: calc(100% - 60px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
