import styled from "styled-components";
import { SignUpForm } from "components";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MainArr } from "assets";
import { ADMIN } from "api";
import { SignItem } from "types";
const AdminForm = () => {
  interface OpenState {
    [key: string]: boolean;
  }

  interface PositionState {
    [key: string]: string;
  }

  const positionList = [
    { id: 0, position: "MEMBER" },
    { id: 1, position: "MANAGER" },
    { id: 2, position: "OWNER" },
  ];

  const [isOpen, setIsOpen] = useState<OpenState>();
  const [modalOpen, setModalOpen] = useState(false);
  const [position, setPosition] = useState<PositionState>();
  const [changeItemId, setChangeItemId] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery("member", ADMIN.member);

  const positionMutation = useMutation("position", ADMIN.position, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("member");
      }
    },
    onError: (response) => {
      if (response) {
        queryClient.invalidateQueries("member");
      }
    },
  });

  const modalBtn = () => setModalOpen(false);

  const positionChange = (itemId: number, changePosition: string) => {
    setChangeItemId(itemId);
    setPosition({ ...position, [`${itemId}`]: changePosition });
    setIsOpen({ ...isOpen, [`${itemId}`]: false });
    setSelectedOption(changePosition);
  };

  const positionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (position && selectedOption) {
      positionMutation.mutate({
        position: position[changeItemId],
        id: changeItemId,
        email: data?.data.find((item: any) => item.id === changeItemId)
          ?.email as string,
      });
    }
  };
  const memberDelMutation = useMutation("memberdel", ADMIN.memberDel, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("member");

        return response.data;
      }
    },
  });

  const memberDel = (id: number, email: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      memberDelMutation.mutate({ id, email });
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [modalOpen]);

  const resetIsOpen = () => {
    const openState = data?.data.reduce((acc: OpenState, v: SignItem) => {
      return { ...acc, [`${v.id}`]: false };
    }, {});
    setIsOpen(openState);
  };

  useEffect(() => {
    resetIsOpen();

    const positionState = data?.data.reduce(
      (acc: PositionState, v: SignItem) => {
        return { ...acc, [`${v.id}`]: "MEMBER" };
      },
      {}
    );
    setPosition(positionState);
    // eslint-disable-next-line
  }, [data]);

  if (isLoading) return <h1>"성공했습니다.!"</h1>;
  if (isError) return <h1>"실패했습니다.!"</h1>;

  return (
    <StAdminWrap>
      <StTop>
        <StTitle>
          사용자관리
          <StUser>
            전체사용자 <StUserSpan>{data?.data.length} </StUserSpan>명
          </StUser>
        </StTitle>
        <StButton onClick={() => setModalOpen(true)}>인원추가 +</StButton>
      </StTop>
      <StContent>
        <StContentTop>
          <StTopList>이름</StTopList>
          <StTopList>이메일</StTopList>
          <StTopList>전화번호</StTopList>
          <StTopList>현재직급</StTopList>
          <StTopList>직급변경</StTopList>
          <StTopList>변경</StTopList>
        </StContentTop>
        {data?.data.map((item: SignItem) => {
          return (
            <StContentBottom key={item.id}>
              <StBottomList>{item.memberName}</StBottomList>
              <StBottomList>{item.email}</StBottomList>
              <StBottomList>{item.phoneNum}</StBottomList>
              <StBottomList>{item.position}</StBottomList>
              <StOpsion onSubmit={positionSubmit}>
                <StBottomListSel>
                  <StSelWarp>
                    <StSeletLabel
                      onClick={() => {
                        if (isOpen) {
                          resetIsOpen();
                          setIsOpen({
                            ...isOpen,
                            [`${item.id}`]: !isOpen[`${item.id}`],
                          });
                        }
                      }}
                    >
                      {position && position[item.id]}
                      <MenuArr />
                    </StSeletLabel>
                    {isOpen && isOpen[`${item.id}`] && (
                      <StSeletUl>
                        {positionList.map((position) => (
                          <StSeletLi
                            key={`${item.id}-${position.id}`}
                            onClick={() =>
                              positionChange(item.id, position.position)
                            }
                          >
                            {position.position}
                          </StSeletLi>
                        ))}
                      </StSeletUl>
                    )}
                  </StSelWarp>
                </StBottomListSel>
                <StBottomListBtn>
                  <StChangeBtn type="submit">직급수정</StChangeBtn>
                  <StDelBtn
                    type="button"
                    onClick={() => {
                      memberDel(item.id, item.email);
                    }}
                  >
                    인원삭제
                  </StDelBtn>
                </StBottomListBtn>
              </StOpsion>
            </StContentBottom>
          );
        })}
      </StContent>
      <SignUpForm onClose={modalBtn} modalOpen={modalOpen} />
    </StAdminWrap>
  );
};
export default AdminForm;

const StAdminWrap = styled.div`
  width: calc(100% - 20.21%);
  margin-left: 20.21%;
  padding: 95px 5.74%;
`;
const StTop = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const StTitle = styled.h3`
  display: flex;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.016em;
  align-items: center;
`;
const StUser = styled.p`
  margin-left: 45px;
  font-weight: 800;
  font-size: 1.125rem;
  letter-spacing: 0.016em;
  position: relative;
  padding-left: 26px;

  &::before {
    width: 16px;
    height: 16px;
    background: ${(props) => props.theme.keyBlue};
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border-radius: 50%;
  }
`;
const StUserSpan = styled.span`
  color: ${(props) => props.theme.keyBlue};
  font-weight: 800;
`;

const StContent = styled.div``;

const StContentTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  border-radius: 5px;
  background: ${(props) => props.theme.veryLightGrey};
  text-align: center;
`;
const StButton = styled.button`
  width: 140px;
  height: 50px;
  font-size: 0.875rem;
  background: ${(props) => props.theme.keyBlue};
  color: ${(props) => props.theme.bgColor};
  border: 0;
  cursor: pointer;
  border-radius: 50px;
`;

const StTopList = styled.p`
  width: 16.66%;
  font-weight: 700;
  font-size: 1.125rem;
`;

const StContentBottom = styled.div`
  width: 100%;
  height: 80px;
  align-items: center;
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 5px;
  display: flex;
  margin-top: 25px;
`;
const StBottomList = styled.p`
  width: 16.66%;
  font-weight: 500;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  margin: 0 auto;
  line-height: 1.3;
`;
const StOpsion = styled.form`
  width: 33.32%;
  display: flex;
`;
const StBottomListSel = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StSelWarp = styled.div`
  position: relative;
  width: 120px;
`;
const StSeletLabel = styled.p`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 2px 1px;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  margin: 0 auto;
  line-height: 40px;
  font-weight: 500;
  padding: 0 12px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MenuArr = styled(MainArr)`
  fill: ${(props) => props.theme.lightGrey};
`;
const StSeletUl = styled.ul`
  position: absolute;
  bottom: -120px;
  left: 0;
  background: ${(props) => props.theme.bgColor};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 2px 1px;
  z-index: 1;
  width: 100%;
`;
const StSeletLi = styled.li`
  line-height: 40px;
  padding: 0 12px;
  font-size: 0.75rem;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.lightBlue};
    color: ${(props) => props.theme.keyBlue};
  }
`;

const StBottomListBtn = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StChangeBtn = styled.button`
  text-align: center;
  width: 90px;
  height: 38px;
  border: 1px solid ${(props) => props.theme.keyBlue};
  color: ${(props) => props.theme.keyBlue};
  background: transparent;
  font-size: 0.875rem;
  border-radius: 50px;
  cursor: pointer;
`;

const StDelBtn = styled.button`
  border: 1px solid ${(props) => props.theme.redColor};
  color: ${(props) => props.theme.redColor};
  margin-left: 10px;
  text-align: center;
  width: 90px;
  height: 38px;
  background: transparent;
  font-size: 0.875rem;
  border-radius: 50px;
  cursor: pointer;
`;
