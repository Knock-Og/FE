import { useState } from "react";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import { CreateNewFolder } from "@mui/icons-material";
import styled from "styled-components";
import { NavItem } from "types";

interface Props {
  navItems: NavItem[];
  isBookMarkNav?: boolean;
  addBookmarkHandler?: (addBookmarkInput: string) => void;
}

const Nav = ({ navItems, isBookMarkNav, addBookmarkHandler }: Props) => {
  const params = useParams();
  const [addBookmarkInput, setAddBookmarkInput] = useState("");

  const handleChangeAddBookmarkInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setAddBookmarkInput(e.target.value);

  const handleClickBookMarkAddBtn = () =>
    addBookmarkHandler && addBookmarkHandler(addBookmarkInput);

  return (
    <StContainer>
      <StUl>
        {navItems.map((item) => (
          <StLi
            isActive={params.categoryName === item.itemValue}
            key={item.itemValue}
            onClick={item.handler}
          >
            {item.itemValue}
          </StLi>
        ))}
        {isBookMarkNav && (
          <StAddBookMarkInputWrapper>
            <StAddBookMarkInput onChange={handleChangeAddBookmarkInput} />
            <StAddBookMarkBtn onClick={handleClickBookMarkAddBtn}>
              <CreateNewFolder />
            </StAddBookMarkBtn>
          </StAddBookMarkInputWrapper>
        )}
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
  padding: 30px;
  width: 380px;
  height: 80vh;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 24px;
`;

const StUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

const StLi = styled.li<{ isActive: boolean }>`
  width: 100%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;

  font-weight: 800;
  font-size: 24px;
  line-height: 40px;
  text-align: center;

  background-color: ${(props) =>
    props.isActive ? props.theme.keyBlue : "#fff"};
  color: ${(props) => (props.isActive ? "#fff" : props.theme.grey)};
  cursor: pointer;
`;

const StAddBookMarkInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;

  font-weight: 800;
  font-size: 24px;
  line-height: 40px;
`;

const StAddBookMarkBtn = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translateY(-50%);
`;

const StAddBookMarkInput = styled.input`
  width: 80%;
  height: 40px;
  padding-left: 10px;
  border: none;
  background: none;
  outline: none;
  border-radius: 10px;

  font-weight: 800;
  font-size: 24px;
  line-height: 40px;
`;
