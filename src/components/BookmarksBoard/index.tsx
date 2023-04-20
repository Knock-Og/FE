import { BOOKMARK } from "api";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {Input } from "@mui/material";
import { Close } from "assets";
import { Alert } from "components";
import { successState } from "store/atoms";
import { Bookmark, BookmarkNavItem } from "types";

interface Props {
  open: boolean;
  setOpen: (openTab: string) => void;
  postId: number;
  folders: number[];
}

const BookmarksBoard = ({ open, setOpen, postId, folders }: Props) => {
  const [selectedFolders, setSelectedFolders] = useState<number[]>(folders);
  const [navItems, setNavItems] = useState<BookmarkNavItem[]>();
  const [addBookmarkInput, setAddBookmarkInput] = useState("");

  const setSuccess = useSetRecoilState(successState);

  const { mutate: getBookmarks } = useMutation(BOOKMARK.getBookmarks, {
    onSuccess: (res) => {
      const nav = res.data.map((v: Bookmark) => {
        return {
          id: v.id,
          itemValue: v.bookMarkFolderName,
          handler: (folderId: number, folderName: string) =>
            handler(folderId, folderName),
        };
      });
      setNavItems(nav);
    },
  });

  const { mutate: addBookmark } = useMutation(BOOKMARK.addBookmark, {
    onSuccess: () => getBookmarks(),
  });
  const { mutate: addPostToBookmark } = useMutation(BOOKMARK.addPostToBookmark);
  const { mutate: deletePostToBookmark } = useMutation(
    BOOKMARK.deletePostToBookmark
  );

  const handler = (folderId: number, folderName: string) => {
    if (selectedFolders.includes(folderId)) {
      setSuccess(`[${folderName}] 에서 삭제되었습니다.`);
      setSelectedFolders(selectedFolders.filter((x) => x !== folderId));
      deletePostToBookmark({ folderId, postId });
    } else {
      setSuccess(`[${folderName}] 에 추가되었습니다.`);
      setSelectedFolders([...selectedFolders, folderId]);
      addPostToBookmark({ folderId, postId });
    }
  };

  const handleChangeAddBookmarkInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setAddBookmarkInput(e.target.value);

  const handleClickBookMarkAddBtn = () => {
    setAddBookmarkInput("");
    addBookmark(addBookmarkInput);
  };

  useEffect(() => {
    getBookmarks();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Alert />

      <StSettingWrap className={open ? "on" : "off"}>
        <StSettingBox
          onClick={(e) => e.stopPropagation()}
          className={open ? "on" : "off"}
        >
          <StSettingTop>
            <StSettingTitle>즐겨찾기</StSettingTitle>
            {setOpen && (
              <StIoClose
                onClick={() => {
                  setOpen("");
                  setAddBookmarkInput("");
                }}
              />
            )}
          </StSettingTop>

          <StSettingbottom>
            {navItems?.map((item) => (
              <StSettingButton
                key={item.itemValue}
                onClick={() => handler(item.id, item.itemValue)}
                active={selectedFolders.includes(item.id)}
              >
                {item.itemValue}
              </StSettingButton>
            ))}
          </StSettingbottom>

          <StBookmarkAddWrapper>
            <StBookmarkAddTitle>즐겨찾기 폴더 생성</StBookmarkAddTitle>
            <StInput
              value={addBookmarkInput}
              onChange={handleChangeAddBookmarkInput}
              endAdornment={
                <StAddBookMarkBtn onClick={handleClickBookMarkAddBtn}>
                  폴더생성
                </StAddBookMarkBtn>
              }
            />
          </StBookmarkAddWrapper>
        </StSettingBox>

        {setOpen && (
          <StSettingBg
            onClick={() => {
              setOpen("");
              setAddBookmarkInput("");
            }}
            className={open ? "on" : "off"}
          />
        )}
      </StSettingWrap>
    </>
  );
};

export default BookmarksBoard;

const StSettingWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 99;
  transition: visibility 0.3s ease-in-out;
  visibility: hidden;
  &.off {
    visibility: hidden;
    transition-delay: 0.5s ease-in-out;
  }
  &.on {
    visibility: visible;
  }
`;
const StSettingBox = styled.div`
  width: 400px;
  height: 100vh;
  position: absolute;
  background: ${(props) => props.theme.bglightblack};
  right: 0;
  top: 0;
  transition: transform 0.3s ease-out;
  transform: translateX(500px);
  transition-delay: 0.5s ease-in-out;
  z-index: 10;
  &.on {
    transition-delay: 0.5s ease-in-out;
    transform: translateX(0);
  }
  &.off {
    transform: translateX(500px);
  }
`;

const StSettingBg = styled.div`
  background: rgba(18, 18, 18, 0.4);
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  width: 100%;
  min-height: 100vh;
  &.on {
    opacity: 1;
  }
  &.off {
    transition-delay: 1s ease-in-out;
    opacity: 0;
  }
`;
const StSettingTop = styled.div`
  position: relative;
  height: 100px;
  padding: 0 50px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor}; ;
`;
const StSettingTitle = styled.h4`
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 100px;
`;
const StIoClose = styled(Close)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: all 0.3s;
  stroke: ${(props) => props.theme.borderGray};
  &:hover {
    transform: rotatez(180deg);
  }
`;
const StSettingbottom = styled.div`
  padding-bottom: 50px;
  overflow: auto;
  height: calc(100% - 350px);
  &::-webkit-scrollbar {
    width: 5px;
    background: ${(props) => props.theme.bgToggle};
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollColor};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.bgToggle};
  }
`;
const StSettingButton = styled.button<{ active?: boolean }>`
  width: 100%;
  display: block;
  padding: 0 50px 0 65px;
  background: ${({ active, theme }) =>
    active ? theme.bgLightBlue : "transparent"};
  text-align: left;
  color: ${({ active, theme }) => (active ? theme.textBlue : theme.textColor)};
  font-weight: 500;
  border: 0;
  outline: 0;
  height: 60px;
  line-height: 60px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.bgLightBlue};
  }
  &:after {
    width: 10px;
    height: 10px;
    border-radius: 20px;
    position: absolute;
    left: 35px;
    top: 0;
    bottom: 0;
    margin: auto 0;

    content: "";
    border: 5px solid
      ${({ active, theme }) => (active ? theme.textBlue : theme.borderGray)};
  }
  &:before {
    width: 16px;
    height: 16px;
    border-radius: 20px;
    position: absolute;
    left: 37px;
    z-index: 1;
    top: 0px;
    bottom: 0px;
    margin: auto 0px;
    content: "";
    background: ${({ active, theme }) =>
      active ? "transparent" : theme.radius};
  }
`;

const StBookmarkAddWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  height: 250px;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
`;

const StBookmarkAddTitle = styled.h5`
  font-weight: 600;
  font-size: 1.55rem;
  margin-bottom:70px;
`;
const StInput = styled(Input)`
  height: 50px !important;
  position: relative;
  &:before {
    border-bottom: 1px solid ${(props) => props.theme.bgBlue};
  }
  > input {
    height: 50px;
    color: ${(props) => props.theme.textColor};
  }
`;
const StAddBookMarkBtn = styled.button`
  position: absolute;
  width: 100px;
  height: 50px;
  border: 0;
  outline: 0;
  color: ${(props) => props.theme.textwhite};
  background: ${(props) => props.theme.bgBlue};
  top: 50%;
  right: 0%;
  transform: translateY(-50%);
`;
