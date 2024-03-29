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

interface CommentDate {
  id: number;
  memberName: string;
  comment: string;
  createdAt: string;
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

  const handleClickPutSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewComment({ comment: "" });
    putComment({
      postId,
      commentId: editCommentId,
      comment: newComment.comment,
    });
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
    <StSettingWrap className={open ? "on" : "off"} onClick={() => closeModal()}>
      <StSettingBox
        onClick={() => closeModal()}
        className={open ? "on" : "off"}
      >
        <StSettingTop>
          <StSettingTitle>댓글</StSettingTitle>
          {setOpen && <StIoClose onClick={() => setOpen("")} />}
        </StSettingTop>
        <StCardContainer>
          {comments
            ?.sort(
              (a: CommentDate, b: CommentDate) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((comment, idx) => {
              return (
                <StCard key={idx}>
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

                      <MdMoreVert
                        onClick={(e) => {
                          modalBtn(comment.id);
                          e.stopPropagation();
                        }}
                      />
                    </StCardTime>
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
                      </StModal>
                    )}
                  </StTop>
                  <StCardComment>{comment.comment}</StCardComment>
                </StCard>
              );
            })}
        </StCardContainer>
        <StSettingbottom>
          {isEdit ? (
            <StTextWrap onSubmit={handleClickPutSubmitBtn}>
              <StTextBox>
                <StText
                  placeholder="댓글을 입력해주세요"
                  onChange={handleChangeTitle}
                  value={newComment.comment}
                  maxLength={299}
                />
                <StTextLength>{newComment.comment.length} / 300</StTextLength>
              </StTextBox>
              <StSubmitBtn>수정완료</StSubmitBtn>
            </StTextWrap>
          ) : (
            <StTextWrap onSubmit={handleClickSubmitBtn}>
              <StTextBox>
                <StText
                  placeholder="댓글을 입력해주세요"
                  onChange={handleChangeTitle}
                  value={newComment.comment}
                  maxLength={299}
                />
                <StTextLength>{newComment.comment.length} / 300</StTextLength>
              </StTextBox>
              <StSubmitBtn>작성완료</StSubmitBtn>
            </StTextWrap>
          )}
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
  background: ${(props) => props.theme.bglightblack};
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
  stroke: ${(props) => props.theme.borderGray};
  &:hover {
    transform: rotatez(180deg);
  }
`;
const StCardContainer = styled.div`
  width: 100%;
  height: calc(100vh - 350px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    background: ${(props) => props.theme.bgToggle};
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollColor};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.bgToggle};
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
  background: ${(props) => props.theme.bglightblack};
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
  height: 90px !important;
  background: transparent;
  padding: 15px 15px;
  overflow: hidden;
  resize: none;
  color: ${(props) => props.theme.textColor};
`;
const StTextBox = styled.div`
  height: 130px;
  border: 1px solid ${(props) => props.theme.borderColor};
  resize: none;
  width: 100%;
`;

const StTextLength = styled.p`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textColor};
  text-align: right;
  margin-top: 10px;
  padding-right: 15px;
`;
const StSubmitBtn = styled.button`
  width: 100px;
  height: 50px;
  background: ${(props) => props.theme.bgBlue};
  border-radius: 5px;
  color: ${(props) => props.theme.textwhite};
  border: none;
  cursor: pointer;
  margin-top: 10px;
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
  width: 130px;
  position: absolute;
  background: ${(props) => props.theme.bglightblack};
  right: 0;
  top: 30px;
  z-index: 1;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 3px 3px 12px;
`;
const StModalLi = styled.button`
  width: 100%;
  background: transparent;
  height: 50px;
  line-height: 50px;
  border: 0;
  outline: 0;
  text-align: left;
  padding: 0 15px;
  font-size: 0.875rem;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  &:hover {
    background: ${(props) => props.theme.bgLightBlue};
    color: ${(props) => props.theme.textBlue};
  }
`;
