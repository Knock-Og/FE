import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { Close } from "assets";
import { COMMENT } from "api";
import { AddComment, Comments } from "types";

interface Props {
  open: boolean;
  setOpen: (openTab: string) => void;
  postId: number;
}

const CommentBoard = ({ open, setOpen, postId }: Props) => {
  // const [navItems, setNavItems] = useState<BookmarkNavItem[]>();

  const [newComment, setNewComment] = useState<AddComment>({
    comment: "",
  });

  const { data: comments } = useQuery<Comments[]>("getComment", () =>
    COMMENT.getComments(postId)
  );

  const { mutate: addComment } = useMutation(COMMENT.addComment);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewComment({ ...newComment, comment: e.target.value });

  const handleClickAddBtn = () => {
    addComment({ postId: postId, comment: newComment });
  };

  useEffect(() => {
    if (open) {
      document.body.style.cssText = `
    top: -${window.scrollY}px;
    width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [open]);

  return (
    <>
      <StSettingWrap className={open ? "on" : "off"}>
        <StSettingBox
          onClick={(e) => e.stopPropagation()}
          className={open ? "on" : "off"}
        >
          <StSettingTop>
            <StSettingTitle>댓글</StSettingTitle>
            {setOpen && <StIoClose onClick={() => setOpen("")} />}
          </StSettingTop>

          <StSettingbottom>
            <StCardContainer>
              {comments?.map((comment) => (
                <StCard key={comment.id}>
                  <div>{comment.id}</div>
                  <div>{comment.comment}</div>
                  <div>{comment.createdAt}</div>
                </StCard>
              ))}
            </StCardContainer>
            <StInput
              placeholder="댓글을 입력해주세요"
              onChange={handleChangeTitle}
            />
            <StAddBtn onClick={handleClickAddBtn}>작성완료</StAddBtn>
          </StSettingbottom>
        </StSettingBox>

        {setOpen && (
          <StSettingBg
            onClick={() => setOpen("")}
            className={open ? "on" : "off"}
          />
        )}
      </StSettingWrap>
    </>
  );
};

export default CommentBoard;

const StCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow: auto;
  gap: 10px;
`;

const StCard = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
  background-color: ${(props) => props.theme.veryLightGrey};
  border: 1px solid ${(props) => props.theme.grey};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StInput = styled.input``;

const StAddBtn = styled.button`
  width: 100px;
  height: 42px;
  background: ${(props) => props.theme.keyBlue};
  border-radius: 12px;
  color: #fff;
  border: none;
`;

const StSettingWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 99;
  transition: visibility 0.3s ease-in-out;
  visibility: hidden;
  &.off {
    visibility: hidden;
    transition-delay: 0.5s ease-in-out;
  }
  &.on {
    visibility: visible;
  }
`;
const StSettingBox = styled.div`
  width: 400px;
  height: 100vh;
  position: absolute;
  background: ${(props) => props.theme.bgColor};
  right: 0;
  top: 0;
  transition: transform 0.3s ease-out;
  transform: translateX(500px);
  transition-delay: 0.5s ease-in-out;
  z-index: 10;
  &.on {
    transition-delay: 0.5s ease-in-out;
    transform: translateX(0);
  }
  &.off {
    transform: translateX(500px);
  }
`;

const StSettingBg = styled.div`
  background: rgba(18, 18, 18, 0.4);
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  width: 100%;
  min-height: 100vh;
  &.on {
    opacity: 1;
  }
  &.off {
    transition-delay: 1s ease-in-out;
    opacity: 0;
  }
`;
const StSettingTop = styled.div`
  position: relative;
  height: 100px;
  padding: 0 50px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor}; ;
`;
const StSettingTitle = styled.h4`
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 100px;
`;
const StIoClose = styled(Close)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: all 0.3s;
  stroke: ${(props) => props.theme.lightGrey};
  &:hover {
    transform: rotatez(180deg);
  }
`;
const StSettingbottom = styled.div`
  padding-bottom: 50px;
  overflow: auto;
  height: 55%;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollColor};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bgColor};
  }
`;
