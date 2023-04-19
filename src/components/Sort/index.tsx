import { useState } from "react";
import { SortItem } from "types";
import styled from "styled-components";
import {  MainArr } from "assets";
interface Props {
  sortItems: SortItem[];
  sort: string;
  setSort: (sort: string) => void;
}

const Sort = ({ sortItems, sort, setSort }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortItems?.[0]?.itemValue);
  const handleSelectSort = (itemValue: string) => {
    setSelectedSort(itemValue);
    setIsOpen(false);
  };
  return (
    //
    <StselectDiv
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <StSelectp
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        // value={sort}
        // onChange={(e) => setSort(e.target.value)}
      >
        {selectedSort ? selectedSort : sortItems?.[0]?.itemValue}
        <MenuArr className={isOpen ? "on" : "off"} />
      </StSelectp>
      <StSelectUl className={isOpen ? "on" : "off"}>
        {sortItems.map((item) => (
          <StSelectli
            key={item.itemValue}
            value={item.itemValue}
            onClick={() => {
              handleSelectSort(item.itemValue);
            }}
          >
            {item.itemValue}
          </StSelectli>
        ))}
      </StSelectUl>
    </StselectDiv>
  );
};

export default Sort;

const StselectDiv = styled.div`
  position: relative;
  width: 130px;
  border: 1px solid ${(props) => props.theme.borderColor};
  height: 45px;
  background: ${(props) => props.theme.bgwhite};
  cursor: pointer;
`;
const StSelectp = styled.label`
  line-height: 45px;
  padding: 0 15px;
  position: relative;
  width: 100%;
  display: block;
  cursor: pointer;
`;
const MenuArr = styled(MainArr)`
  stroke: ${(props) => props.theme.fillGrey};
  fill: ${(props) => props.theme.fillGrey};
  transition: all 0.3s;
  position: absolute;
  right: 15px;
  bottom: 0;
  margin: auto 0;
  top: 0;
  &.on {
    transform: rotateZ(-180deg);
  }
`;
const StSelectUl = styled.ul`
  width: calc(100% + 2px);
  left: -1px;
  top: 43px;
  position: absolute;
  border: 1px solid ${(props) => props.theme.borderColor};
  background: ${(props) => props.theme.bgwhite};
  border-top: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.3s;
  &.on {
    height: 181px;
  }
`;
const StSelectli = styled.li`
  line-height: 45px;
  padding: 0 15px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.bgLightBlue};
    color: ${(props) => props.theme.textBlue};
  }
`;

