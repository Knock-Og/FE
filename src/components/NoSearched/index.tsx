import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NoSearch } from "assets";

const NoSearched = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <NoSearch />
      <StLabel>검색된 게시물이 없습니다</StLabel>
      <StCreateBtn onClick={() => navigate("/write")}>게시글 작성</StCreateBtn>
    </StContainer>
  );
};

export default NoSearched;

const StContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 230px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 40px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.greyBorder};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 4px 0px;
`;

const StLabel = styled.h4`
  font-weight: 800;
  font-size: 2rem;
  margin-bottom: 10px;
`;

const StCreateBtn = styled.button`
  width: 250px;
  height: 60px;
  background: ${(props) => props.theme.keyBlue};
  border-radius: 60px;
  color: ${(props) => props.theme.textwhite};
  border: none;
  cursor: pointer;
`;
