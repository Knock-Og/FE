import { ReactComponent as Exclamation } from "assets/exclamationMark.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NoSearched = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <StLogo />
      <StLabel>검색된 게시물이 없습니다</StLabel>
      <StCreateBtn onClick={() => navigate("/create")}>게시글 작성</StCreateBtn>
    </StContainer>
  );
};

export default NoSearched;

const StContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;
`;

const StLogo = styled(Exclamation)`
  width: 100px;
  height: 100px;
`;

const StLabel = styled.div``;

const StCreateBtn = styled.button``;
