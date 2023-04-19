import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import { POST } from "api";
import { PostDetailTab, Alert } from "components";
import { ActiveState, PostDetail } from "types";
import { errorState, isDarkState } from "store/atoms";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const DetailBoard = (post: PostDetail) => {
  const [activeTab, setActiveTab] = useState<ActiveState>({
    comment: false,
    log: false,
    bookmark: false,
  });

  const setError = useSetRecoilState(errorState);
  const isDark = useRecoilValue(isDarkState);

  const navigate = useNavigate();

  const { mutate: delPost } = useMutation(POST.delPost);

  const handleClickTab = (name: string) => {
    const initTabState = { comment: false, log: false, bookmark: false };
    setActiveTab({ ...initTabState, [name]: true });
  };

  const handleClickEditRouteBtn = () => {
    if (post.editingStatus === "true") {
      return setError("현재 다른 사용자가 편집중입니다. 잠시만 기다려주세요.");
    }
    navigate(`/post/${post.id}/modify`);
  };

  const handdleClickDelBtn = () => {
    // eslint-disable-next-line
    const isDel = confirm("삭제하시겠습니까?");

    if (isDel) {
      if (post.editingStatus === "true") {
        return setError(
          "현재 다른 사용자가 편집중입니다. 잠시만 기다려주세요."
        );
      }
      delPost(post.id);
      navigate("/mypage");
    }
  };

  return (
    <>
      <Alert />
      <StContainer>
        <StTop>
          <StLeft>
            <StkeyWordWrap>
              {post.keywords.map((item) => {
                return <StkeyWordP key={item}>#{item}</StkeyWordP>;
              })}
            </StkeyWordWrap>
            <StTitle>{post.title}</StTitle>
            <StOhterUl>
              <StOhterLi>
                <StOhterSpan>작성자</StOhterSpan> {post.memberName}
              </StOhterLi>

              <StOhterLi>
                <StOhterSpan>작성일</StOhterSpan>
                {new Date(post.createdAt)
                  .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\//g, ".")}
              </StOhterLi>
              <StOhterLi>
                <StOhterSpan>읽기권한</StOhterSpan> {post.readablePosition}
              </StOhterLi>
              <StOhterLi>
                <StOhterSpan>수정권한</StOhterSpan> {post.modifyPermission}
              </StOhterLi>
            </StOhterUl>
          </StLeft>
          <StRight>
            <StNum>{post.postViews}</StNum>
            <StText>조회수</StText>
          </StRight>
        </StTop>

        <ViewerWrap className={isDark ? "dark" : "light"}>
          <Viewer initialValue={post.content} />
        </ViewerWrap>

        <StBtnWrap>
          <StDelBtn onClick={handdleClickDelBtn}>삭제하기</StDelBtn>
          <StEditRouteBtn onClick={handleClickEditRouteBtn}>
            수정하기
          </StEditRouteBtn>
        </StBtnWrap>
      </StContainer>

      <PostDetailTab
        activeTab={activeTab}
        handleClickTab={handleClickTab}
        postId={post.id}
        folders={post.folders}
      />
    </>
  );
};

export default DetailBoard;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StTop = styled.div`
  width: 100%;
  border-radius: 15px;
  background: ${(props) => props.theme.bgGrey};
  padding: 50px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
`;
const StLeft = styled.div`
  width: 90%;
  border-right: 1px solid ${(props) => props.theme.borderColor};
  padding-right: 50px;
`;
const StRight = styled.div`
  width: 10%;
  text-align: center;
`;
const StNum = styled.em`
  color: ${(props) => props.theme.redLightColor};
  font-size: 2.5rem;
  font-weight: 700;
`;
const StText = styled.p`
  font-weight: 500;
  margin-top: 12px;
`;

const StTitle = styled.h4`
  line-height: 45px;
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 20px;
`;
const StOhterUl = styled.ul`
  display: flex;
  gap: 32px;
`;
const StOhterLi = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  &::after {
    position: absolute;
    right: -16px;
    border-radius: 10px;
    width: 3px;
    height: 3px;
    content: "";
    background: ${(props) => props.theme.bgGreyE};
  }
  &:last-child::after {
    content: none;
  }
`;
const StOhterSpan = styled.span`
  font-weight: 600;
`;
const ViewerWrap = styled.div`
  padding: 0px 50px 50px;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &.dark {
    .toastui-editor-contents p {
      color: #fff !important;
    }
    .toastui-editor-contents span {
      color: #fff !important;
    }
    .toastui-editor-contents strong {
      color: #fff !important;
    }
    .toastui-editor-contents ol > li::before {
      color: #fff !important;
    }
  }
  &.light {
  }
`;

const StkeyWordWrap = styled.div`
  display: flex;
  gap: 10px;
`;
const StkeyWordP = styled.p`
  color: ${(props) => props.theme.textBlue};
  word-break: break-word;
  margin-bottom: 10px;
`;

const StBtnWrap = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
`;
const StEditRouteBtn = styled.button`
  width: 120px;
  height: 50px;
  background: ${(props) => props.theme.bgBlue};
  border-radius: 10px;
  color: ${(props) => props.theme.textwhite};
  border: none;
  outline: 0;
  cursor: pointer;
`;

const StDelBtn = styled.button`
  width: 120px;
  height: 50px;
  background: ${(props) => props.theme.bgwhite};
  border-radius: 10px;
  color: ${(props) => props.theme.textBlue};
  border: 1px solid ${(props) => props.theme.delBtn};
  margin-right: 15px;
  outline: 0;
  cursor: pointer;
`;
