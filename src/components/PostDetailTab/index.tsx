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
        <StIcon>
          <Comment onClick={() => handleClickTab("comment")} />
        </StIcon>
        <StIconTxt>댓글</StIconTxt>
        <StIcon>
          <Log onClick={() => handleClickTab("log")} />
        </StIcon>
        <StIconTxt>로그</StIconTxt>
        <StIcon>
          <Star onClick={() => handleClickTab("bookmark")} />
        </StIcon>
        <StIconTxt>즐겨찾기</StIconTxt>
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
  height: 60px;
  background: ${(props) => props.theme.textwhite};
  border: 1px solid ${(props) => props.theme.greylight};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 25px;
  &:first-child {
    margin-top: 0;
  }
  > svg {
    stroke: ${(props) => props.theme.borderBlue};
    fill: ${(props) => props.theme.fillWhite};
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.borderBlue};
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
  right: 50px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 380px;
  align-items: center;
  border-radius: 100px;
  z-index: 99;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 12px -4px;
  animation: ${bounceFrames} infinite 1s;
  background: ${(props) => props.theme.textwhite};
`;
