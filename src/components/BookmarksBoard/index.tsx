import { BOOKMARK } from "api";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { IconButton, Input, Snackbar } from "@mui/material";
import { CreateNewFolder } from "@mui/icons-material";
import { Close } from "assets";
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
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [snackBarContent, setSnackBarContent] = useState<string>("");

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
      setSnackBarContent(`[${folderName}] 에서 삭제되었습니다.`);
      setSnackBarOpen(true);
      setSelectedFolders(selectedFolders.filter((x) => x !== folderId));
      deletePostToBookmark({ folderId, postId });
    } else {
      setSnackBarContent(`[${folderName}] 에 추가되었습니다.`);
      setSnackBarOpen(true);
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
      <StSettingWrap className={open ? "on" : "off"}>
        <StSettingBox
          onClick={(e) => e.stopPropagation()}
          className={open ? "on" : "off"}
        >
          <StSettingTop>
            <StSettingTitle>즐겨찾기 추가</StSettingTitle>
            {setOpen && <StIoClose onClick={() => setOpen("")} />}
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
            <Input
              onChange={handleChangeAddBookmarkInput}
              endAdornment={
                <StAddBookMarkBtn onClick={handleClickBookMarkAddBtn}>
                  <CreateNewFolder />
                </StAddBookMarkBtn>
              }
            />
          </StBookmarkAddWrapper>
        </StSettingBox>

        {setOpen && (
          <StSettingBg
            onClick={() => setOpen("")}
            className={open ? "on" : "off"}
          />
        )}
        <StSnackBar
          open={snackBarOpen}
          onClose={() => setSnackBarOpen(false)}
          autoHideDuration={2000}
          message={snackBarContent}
        />
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
  background: ${(props) => props.theme.bgColor};
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
  stroke: ${(props) => props.theme.lightGrey};
  &:hover {
    transform: rotatez(180deg);
  }
`;
const StSettingbottom = styled.div`
  padding-bottom: 50px;
  overflow: auto;
  height: 55%;
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
const StSettingButton = styled.button<{ active?: boolean }>`
  width: 100%;
  display: block;
  padding: 0 50px 0 65px;
  background: ${({ active, theme }) =>
    active ? theme.lightBlue : "transparent"};
  text-align: left;
  color: ${({ active, theme }) => (active ? theme.keyBlue : theme.greyLight)};
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
      ${({ active, theme }) => (active ? theme.keyBlue : theme.greyLight)};
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
      active ? "transparent" : theme.bgColor};
  }
`;

const StBookmarkAddWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.lightGrey};
  height: 45%;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
`;

const StBookmarkAddTitle = styled.h5`
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 100px;
`;

const StAddBookMarkBtn = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translateY(-50%);
`;

const StSnackBar = styled(Snackbar)``;
