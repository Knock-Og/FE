import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { IconButton, Input } from "@mui/material";
import { CreateNewFolder } from "@mui/icons-material";
import { NavItem } from "types";
import { Close, NavOpenArrow } from "assets";
import NoCategory from "components/NoCategory";
interface Props {
  open?: boolean;
  setOpen?: (isOpen: boolean) => void;
  navItems?: NavItem[];
  isBookMarkNav?: boolean;
  addBookmarkHandler?: (addBookmarkInput: string) => void;
}

const Setting = ({
  open,
  setOpen,
  navItems,
  isBookMarkNav,
  addBookmarkHandler,
}: Props) => {
  const params = useParams();
  const [addBookmarkInput, setAddBookmarkInput] = useState("");

  const handleChangeAddBookmarkInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setAddBookmarkInput(e.target.value);

  const handleClickBookMarkAddBtn = () => {
    setAddBookmarkInput("");
    addBookmarkHandler && addBookmarkHandler(addBookmarkInput);
  };
  useEffect(() => {
    if (open) {
      document.body.style.cssText = `
     
    top: -${window.scrollY}px;
    width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [open]);
  return (
    <>
      <StSettingWrap className={open ? "on" : "off"}>
        <StSettingBox
          onClick={(e) => e.stopPropagation()}
          className={open ? "on" : "off"}
        >
          <StSettingTop>
            <StSettingTitle>
              {isBookMarkNav ? "즐겨찾기" : "카테고리"}
            </StSettingTitle>
            {setOpen && <StIoClose onClick={() => setOpen(false)} />}
          </StSettingTop>

          <StSettingbottom>
            {navItems ? navItems.map((item) => (
              <StSettingButton
                key={item.itemValue}
                onClick={() => {
                  item.handler();
                  setOpen && setOpen(false);
                }}
                active={
                  params.categoryName === item.itemValue ||
                  params.folderName === item.itemValue
                }
              >
                {item.itemValue}
              </StSettingButton>
            )):<NoCategory/>}
            
          </StSettingbottom>
          {isBookMarkNav && (
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
          )}
        </StSettingBox>

        {setOpen && (
          <StSettingBg
            onClick={() => setOpen(false)}
            className={open ? "on" : "off"}
          />
        )}
      </StSettingWrap>
      {setOpen && <StSettingToggleBtn onClick={() => setOpen(true)} />}
    </>
  );
};

export default Setting;

const bounceFrames = keyframes`
  0%{
    transform : translate(0px,-50%);
  }
  50%{
    transform : translate(10px,-50%);
  }
  100%{
    transform : translate(0px,-50%);
  }
`;

const StSettingToggleBtn = styled(NavOpenArrow)`
  position: fixed;
  top: 50%;
  right: 5%;
  animation: ${bounceFrames} 1s infinite;
`;

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
  height: calc(100% - 400px);
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
  height: 300px;
  padding: 0px 50px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const StBookmarkAddTitle = styled.h5`
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom:50px;
`;

const StAddBookMarkBtn = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translateY(-50%);
`;
