import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Exclamation } from "assets";

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
  height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 30px;
  border: 1px solid ${(props) => props.theme.grey};
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
  border-radius: 24px;
`;

const StLogo = styled(Exclamation)`
  width: 100px;
  height: 100px;
`;

const StLabel = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 43px;
  text-align: center;
`;

const StCreateBtn = styled.button`
  width: 360px;
  height: 64px;
  background: ${(props) => props.theme.keyBlue};
  border-radius: 24px;
  color: #fff;
  border: none;
`;
