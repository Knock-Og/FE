import React from 'react'
import styled from 'styled-components'
import { SettingProps } from "types";
const Setting = ({ settingOpen, onClose }: SettingProps) => {
    const closeBtn =()=>{
        onClose()
    }
    
  return (
    <StSettingWrap className={settingOpen ? "on" : "off"}>
      <StSettingBox
        onClick={(e) => e.stopPropagation()}
        className={settingOpen ? "on" : "off"}
      >
        <StSettingTop>
          <StSettingTitle>카테고리 추가</StSettingTitle>
        </StSettingTop>
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
  width: 500px;
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
const StSettingTop = styled.div``
const StSettingTitle = styled.h4``