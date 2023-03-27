import { useState } from "react";
import styled from "styled-components";
import { NavItem } from "types";

interface Props {
  navItems: NavItem[];
  isBookMarkNav?: boolean;
  addBookmarkHandler?: (addBookmarkInput: string) => void;
}

const Nav = ({ navItems, isBookMarkNav, addBookmarkHandler }: Props) => {
  const [addBookmarkInput, setAddBookmarkInput] = useState("");

  const handleChangeAddBookmarkInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setAddBookmarkInput(e.target.value);

  const handleClickBookMarkAddBtn = () =>
    addBookmarkHandler && addBookmarkHandler(addBookmarkInput);

  return (
    <StContainer>
      {isBookMarkNav && (
        <StAddBookMarkBtn onClick={handleClickBookMarkAddBtn}>
          추가
        </StAddBookMarkBtn>
      )}
      <StUl>
        {navItems.map((item) => (
          <StLi key={item.itemValue} onClick={item.handler}>
            {item.itemValue}
          </StLi>
        ))}
        {isBookMarkNav && <input onChange={handleChangeAddBookmarkInput} />}
      </StUl>
    </StContainer>
  );
};

export default Nav;

const StContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gainsboro;
  padding: 30px;
  width: 300px;
  height: 100vh;
`;

const StUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StLi = styled.li`
  cursor: pointer;
`;

const StAddBookMarkBtn = styled.button`
  position: absolute;
  top: 3%;
  right: 3%;
  border-radius: 50%;
`;
