import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MdMoreVert } from "react-icons/md";
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
  const [newComment, setNewComment] = useState<AddComment>({
    comment: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editCommentId, setEditCommentId] = useState(0);
  const [modalOpen, setModalopen] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { data: comments } = useQuery<Comments[]>("getComments", () =>
    COMMENT.getComments(postId)
  );

  const { mutate: addComment } = useMutation(COMMENT.addComment, {
    onSuccess: () => queryClient.invalidateQueries("getComments"),
  });
  const { mutate: putComment } = useMutation(COMMENT.putComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("getComments");
      setIsEdit(false);
    },
  });
  const { mutate: deleleComment } = useMutation(COMMENT.delComment, {
    onSuccess: () => queryClient.invalidateQueries("getComments"),
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment({ ...newComment, comment: e.target.value });
  };

  const handleClickSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewComment({ comment: "" });
    if (isEdit) {
      return putComment({
        postId,
        commentId: editCommentId,
        comment: newComment.comment,
      });
    }
    return addComment({ postId, comment: newComment });
  };

  const handleClickEditLi = (existComment: string, commentId: number) => {
    setModalopen(null);
    setEditCommentId(commentId);
    setIsEdit(true);
    setNewComment({ comment: existComment });
  };

  const modalBtn = (id: number) => setModalopen(id);

  const closeModal = () => setModalopen(null);

  const delBtn = (commentId: number) => deleleComment({ postId, commentId });

  return (
    <StSettingWrap className={open ? "on" : "off"}>
      <StSettingBox
        onClick={(e) => e.stopPropagation()}
        className={open ? "on" : "off"}
      >
        <StSettingTop>
          <StSettingTitle>댓글</StSettingTitle>
          {setOpen && <StIoClose onClick={() => setOpen("")} />}
        </StSettingTop>
        <StCardContainer>
          {comments?.map((comment) => {
            return (
              <StCard key={comment.id}>
                <StTop>
                  <StCardName>{comment.memberName}</StCardName>
                  <StCardTime>
                    {new Date(comment.createdAt)
                      .toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, ".")}

                    <MdMoreVert onClick={() => modalBtn(comment.id)} />
                    {modalOpen === comment.id && (
                      <StModal>
                        <StModalLi onClick={() => delBtn(comment.id)}>
                          삭제
                        </StModalLi>
                        <StModalLi
                          onClick={() =>
                            handleClickEditLi(comment.comment, comment.id)
                          }
                        >
                          수정
                        </StModalLi>
                        <StModalLi onClick={() => closeModal()}>닫기</StModalLi>
                      </StModal>
                    )}
                  </StCardTime>
                </StTop>
                <StCardComment>{comment.comment}</StCardComment>
              </StCard>
            );
          })}
        </StCardContainer>
        <StSettingbottom>
          <StTextWrap onSubmit={handleClickSubmitBtn}>
            <StText
              placeholder="댓글을 입력해주세요"
              onChange={handleChangeTitle}
              value={newComment.comment}
            />
            <StSubmitBtn>{isEdit ? "수정완료" : "작성완료"}</StSubmitBtn>
          </StTextWrap>
        </StSettingbottom>
      </StSettingBox>

      {setOpen && (
        <StSettingBg
          onClick={() => setOpen("")}
          className={open ? "on" : "off"}
        />
      )}
    </StSettingWrap>
  );
};

export default CommentBoard;

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
const StCardContainer = styled.div`
  width: 100%;
  height: calc(100vh - 350px);
  overflow-y: scroll;
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
const StCard = styled.div`
  border-radius: 5px;
  background: ${(props) => props.theme.bgGrey};
  padding: 30px;
  width: 332px;
  margin: 20px auto 0;
`;

const StSettingbottom = styled.div`
  height: 250px;
  background: ${(props) => props.theme.bgColor};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.borderColor}; ;
`;
const StTextWrap = styled.form`
  width: 332px;
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
`;
const StText = styled.textarea`
  width: 100%;
  margin: 0 auto;
  outline: 0;
  border: 0;
  height: 120px !important;
  padding: 20px 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  resize: none;
`;

const StSubmitBtn = styled.button`
  width: 100px;
  height: 50px;
  background: rgb(0, 127, 255);
  border-radius: 12px;
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;
const StTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
`;
const StCardName = styled.em`
  display: block;
  font-weight: 700;
  font-size: 1.125rem;
`;
const StCardTime = styled.p`
  font-weight: 500;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  > svg {
    font-size: 1.1rem;
    cursor: pointer;
  }
`;
const StCardComment = styled.p`
  font-weight: 500;
  line-height: 20px;
  font-size: 0.875rem;
  word-break: break-all;
`;

const StModal = styled.div`
  width: 100px;
  position: absolute;
  background: ${(props) => props.theme.bgColor};
  right: 0;
  top: 30px;
  z-index: 1;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 3px 3px 12px;
`;
const StModalLi = styled.button`
  width: 100%;
  background: transparent;
  height: 40px;
  line-height: 40px;
  border: 0;
  outline: 0;
  text-align: left;
  padding: 0 10px;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.keyBlue};
    background: ${(props) => props.theme.bgLightBlue};
  }
`;
