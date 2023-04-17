import styled, { keyframes } from "styled-components";
import { Comment, Log, Star } from "assets";
import { BookmarksBoard, CommentBoard, LogBoard } from "components";
import { ActiveState } from "types";

interface Props {
  activeTab: ActiveState;
  handleClickTab: (tabName: string) => void;
  postId: number;
  folders: number[];
}

const PostDetailTab = ({
  activeTab,
  handleClickTab,
  postId,
  folders,
}: Props) => {
  return (
    <StBox>
      <StIconBox>
        <StIcon onClick={() => handleClickTab("comment")}>
          <Comment />
        </StIcon>
        <StIconTxt onClick={() => handleClickTab("comment")}>댓글</StIconTxt>
        <StIcon onClick={() => handleClickTab("log")}>
          <Log />
        </StIcon>
        <StIconTxt onClick={() => handleClickTab("log")}>로그</StIconTxt>
        <StIcon onClick={() => handleClickTab("bookmark")}>
          <Star />
        </StIcon>
        <StIconTxt onClick={() => handleClickTab("bookmark")}>
          즐겨찾기
        </StIconTxt>
      </StIconBox>

      <>
        <CommentBoard
          postId={postId}
          open={activeTab.comment}
          setOpen={handleClickTab}
        />
        <LogBoard
          postId={postId}
          open={activeTab.log}
          setOpen={handleClickTab}
        />
        <BookmarksBoard
          postId={postId}
          open={activeTab.bookmark}
          setOpen={handleClickTab}
          folders={folders}
        />
      </>
    </StBox>
  );
};

export default PostDetailTab;
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
const StBox = styled.div``;

const StIcon = styled.div`
  border-radius: 100px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border: 1px solid ${(props) => props.theme.borderGray};
  &:hover {
    border: 1px solid ${(props) => props.theme.textBlue};
  }
  margin-top: 25px;
  &:first-child {
    margin-top: 0;
  }
  > svg {
    stroke: ${(props) => props.theme.textBlue};
    fill: ${(props) => props.theme.fillWhite};
  }
`;
const StIconTxt = styled.p`
  margin-top: 10px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const StIconBox = styled.div`

  position: fixed;
  top: 300px;
  width: 100px;
  height: 380px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 99;
  border-radius: 100px;
  right: 50px;
  text-align: center;
  background: ${(props) => props.theme.bgwhite};
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 12px -4px;
  animation: ${bounceFrames} 1s infinite;
`;
