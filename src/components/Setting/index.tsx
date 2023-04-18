import { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { IconButton, Input } from "@mui/material";
import { CreateNewFolder } from "@mui/icons-material";
import NavBg from "assets/navBg.png";
import { Close, Grid } from "assets";
import { NoCategory } from "components";
import { NavItem } from "types";
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
            {navItems ? (
              navItems.map((item) => (
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
              ))
            ) : (
              <NoCategory />
            )}
          </StSettingbottom>
          {isBookMarkNav ? (
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
          ) : (
            <StNavBg style={{ backgroundImage: `url(${NavBg})` }} />
          )}
        </StSettingBox>

        {setOpen && (
          <StSettingBg
            onClick={() => setOpen(false)}
            className={open ? "on" : "off"}
          />
        )}
      </StSettingWrap>
      {setOpen && (
        <StSettingToggleBtn onClick={() => setOpen(true)}>
          <div>
            <StSettinWrap>
              <Grid />
            </StSettinWrap>
            <StSettingP>카테고리</StSettingP>
          </div>
        </StSettingToggleBtn>
      )}
    </>
  );
};

export default Setting;

const bounceFrames = keyframes`
  0%{
    transform : translate(-50%,0%);
  }
  50%{
    transform : translate(-50%,10px);
  }
  100%{
    transform : translate(-50%,0%)
  }
`;

const StSettingToggleBtn = styled.div`
  position: fixed;
  top: 300px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 180px;
  margin: auto 0;
  border-radius: 100px;
  width: 100px;
  right: 70px;
  text-align: center;
  background: ${(props) => props.theme.bgwhite};
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 12px -4px;
`;

const StSettinWrap = styled.div`
  border-radius: 100px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border: 1px solid ${(props) => props.theme.borderGray};
  > svg {
    fill: ${(props) => props.theme.textBlue};
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.textBlue};
  }
`;
const StSettingP = styled.p`
  margin-top: 15px;
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
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
  height: calc(100% - 550px);
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
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  height: 300px;
  padding: 0px 50px;
  margin-top: 150px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const StBookmarkAddTitle = styled.h5`
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom: 50px;
`;

const StAddBookMarkBtn = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translateY(-50%);
`;

const StNavBg = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
`;
