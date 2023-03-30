import styled from "styled-components";
import { PostDetail } from "types";

const DetailBoard = (post: PostDetail) => {
  return (
    <StContainer>
      <StTitle>{post.title}</StTitle>
      <StContent>{post.content}</StContent>
    </StContainer>
  );
};

export default DetailBoard;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  height: 80vh;
  background-color: ${(props) => props.theme.veryLightGrey};
  border: 1px solid ${(props) => props.theme.grey};
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  padding: 30px;
`;

const StTitle = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  font-weight: 800;
  font-size: 24px;
  line-height: 40px;
  padding: 0px 40px;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
`;

const StContent = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  font-weight: 800;
  font-size: 24px;
  padding: 20px 40px;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
`;
