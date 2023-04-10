import React from 'react'
import styled from 'styled-components'
import { SettingProps, NavItem } from "types";
import { Close } from "assets";
import {  } from "types";
interface Props {
  navItems: NavItem[];
  isBookMarkNav?: boolean;
  addBookmarkHandler?: (addBookmarkInput: string) => void;
}

const Setting = (
  { settingOpen, onClose }: SettingProps,
  { navItems, isBookMarkNav, addBookmarkHandler }: Props
) => {
  const closeBtn = () => {
    onClose();
  };
  const pathname = window.location.pathname;
  return (
    <StSettingWrap className={settingOpen ? "on" : "off"}>
      <StSettingBox
        onClick={(e) => e.stopPropagation()}
        className={settingOpen ? "on" : "off"}
      >
        <StSettingTop>
          <StSettingTitle>카테고리</StSettingTitle>
          <StIoClose onClick={onClose} />
        </StSettingTop>
        <StSettingbottom>
          <StSettingLink href="/">
            <StsettingButton active={pathname === "/"}>
              카테고리명명입니다!!!!!!!!!!
            </StsettingButton>
          </StSettingLink>
        </StSettingbottom>
      </StSettingBox>
      <StSettingBg onClick={closeBtn} className={settingOpen ? "on" : "off"} />
    </StSettingWrap>
  );
};

export default Setting


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
  position:relative;
  height:100px;
  padding:0 50px;
`
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
  overflow-y: scroll;
  height: calc(100vh - 100px);
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
const StSettingLink = styled.a`
  width: 100%;
  display: block;
`;
const StsettingButton = styled.button<{ active?: boolean }>`
  width: 100%;
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
    border:5px solid
      ${({ active, theme }) => (active ? theme.keyBlue : theme.greyLight)};
  }
  &:before {
    width: 14px;
    height: 14px;
    border-radius: 20px;
    position: absolute;
    left: 38px;
    z-index: 1;
    top: 0px;
    bottom: 0px;
    margin: auto 0px;
    content: "";
    background:
      ${({ active, theme }) => (active ? "transparent" : theme.bgColor)};
  }
`;