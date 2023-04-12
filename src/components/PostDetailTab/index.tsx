import styled from "styled-components";
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
      <StIcon>
        <Comment onClick={() => handleClickTab("comment")} />
      </StIcon>
      <StIcon>
        <Log onClick={() => handleClickTab("log")} />
      </StIcon>
      <StIcon>
        <Star onClick={() => handleClickTab("bookmark")} />
      </StIcon>

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

const StBox = styled.div`
  position: fixed;
  top: 350px;
  right: 80px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
  z-index: 99;
`;

const StIcon = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 7px -4px;
  border-radius: 100px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  > svg {
    stroke: ${(props) => props.theme.borderBlue};
    fill: ${(props) => props.theme.fillWhite};
  }
`;
