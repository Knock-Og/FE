import styled from "styled-components";
import ModalPortal from "api/portal";
import { SignUpForm } from "components";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ADMIN } from "api";
import { SignItem } from "types";
const AdminForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBtn = () => {
    setModalOpen(!modalOpen);
  };
  const queryClient = useQueryClient();
  const positionMutation = useMutation(ADMIN.position, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("position");
      }
    },
    onError: (response) => {
      if (response) {
        queryClient.invalidateQueries("position");
      }
    },
  });
  //데이터전송
  const [position, setPosition] = useState("");
  const [positionID, setPositionID] = useState(Number);
  const positionHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ) => {
    setPosition(e.target.value);
    setPositionID(itemId);
  };

  const positionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (position.trim() === "") return alert("변경할 직급을 선택해주세요!");

    positionMutation.mutate({ position, positionID });
  };
  const { isLoading, isError, data } = useQuery("member", ADMIN.member);
  if (isLoading) return <h1>"성공했습니다.!"</h1>;
  if (isError) return <h1>"실패했습니다.!"</h1>;

  return (
    <>
      <StAdminWrap>
        <StTop>
          <StTitle>
            사용자관리
            <StUser>
              전체사용자 <StUserSpan>{data?.data.length}</StUserSpan>명
            </StUser>
          </StTitle>
          <button onClick={() => modalBtn()}>인원추가</button>
        </StTop>
        <StContent>
          <StContentTop>
            <StName>이름</StName>
            <Stemail>이메일</Stemail>
            <StPosition>현재직급</StPosition>
            <Stpositionchange>직급변경</Stpositionchange>
            <StChange>직급수정</StChange>
          </StContentTop>

          {data?.data.map((item: SignItem) => {
            return (
              <StContentform onSubmit={positionSubmit} key={item.id}>
                <StContentBottom>
                  <StName>{item.memberName}</StName>
                  <Stemail>{item.email}</Stemail>
                  <StPosition>{item.position}</StPosition>
                  <StPositionchangeWrap>
                    <StPositionchangeDiv>
                      <StPositionInput
                        type="radio"
                        id={`Member${item.id}`}
                        name="position"
                        value="MEMBER"
                        key={item.id}
                        onChange={(e) => positionHandler(e, item.id)}
                      />
                      <StPositionLabel htmlFor={`Member${item.id}`}>
                        Member
                      </StPositionLabel>
                    </StPositionchangeDiv>
                    <StPositionchangeDiv>
                      <StPositionInput
                        type="radio"
                        id={`Manager${item.id}`}
                        name="position"
                        value="MANAGER"
                        onChange={(e) => positionHandler(e, item.id)}
                      />
                      <StPositionLabel htmlFor={`Manager${item.id}`}>
                        Manager
                      </StPositionLabel>
                    </StPositionchangeDiv>
                    <StPositionchangeDiv>
                      <StPositionInput
                        type="radio"
                        id={`Owner${item.id}`}
                        name="position"
                        value="OWNER"
                        onChange={(e) => positionHandler(e, item.id)}
                      />
                      <StPositionLabel htmlFor={`Owner${item.id}`}>
                        Owner
                      </StPositionLabel>
                    </StPositionchangeDiv>
                  </StPositionchangeWrap>
                  <StChange>
                    <StChangeBtn>직급수정</StChangeBtn>
                  </StChange>
                </StContentBottom>
              </StContentform>
            );
          })}
        </StContent>
      </StAdminWrap>
      {modalOpen && (
        <ModalPortal>
          <SignUpForm />
        </ModalPortal>
      )}
    </>
  );
};
export default AdminForm;

const StAdminWrap = styled.div`
  width: calc(100% - 15.63%);
  padding: 85px 6.37% 0;
  height: 100vh;
  box-sizing: border-box;
`;
const StTop = styled.div`
  margin-bottom: 38px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;
const StTitle = styled.h3`
  display: flex;
  font-size: 2.5rem;
  line-height: 1;
  align-items: flex-end;
`;
const StUser = styled.p`
  font-size: 1rem;
  margin-left: 40px;
`;
const StUserSpan = styled.span`
  color: #007fff;
`;
const StContent = styled.div``;
const StContentform = styled.form``;
const StContentTop = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #f3f3f3;
  border-radius: 10px;
`;
const StName = styled.p`
  width: 12.87%;
  padding-left: 15px;
`;
const Stemail = styled.p`
  width: 21.44%;
  padding-left: 15px;
`;
const StPosition = styled.p`
  width: 14.3%;
  padding-left: 15px;
`;
const Stpositionchange = styled.p`
  width: 35.38%;
  padding-left: 15px;
`;
const StChange = styled.p`
  width: 16.01%;
  text-align: center;
`;
const StContentBottom = styled.div`
  width: 100%;
  height: 80px;
  line-height: 80px;
  border: 1px solid #dce1e3;
  border-radius: 10px;
  display: flex;
  margin-top: 30px;
`;
const StPositionchangeWrap = styled.div`
  display: flex;
  width: 35.38%;
  padding-left: 15px;
`;
const StChangeBtn = styled.button`
  text-align: center;
`;

const StPositionchangeDiv = styled.div`
  margin-right: 40px;
  &:last-child {
    margin-right: 0;
  }
`;
const StPositionInput = styled.input`
  display: none;
`;
const StPositionLabel = styled.label`
  padding-left: 25px;
  position: relative;
  input[type="radio"] + &::before {
    background: #e7e9f1;
    width: 17px;
    height: 17px;
    content: "";
    left: 0px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border-radius: 50%;
  }
  input[type="radio"] + &::after {
    background: #ccd5df;
    width: 9px;
    height: 9px;
    content: "";
    left: 4px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border-radius: 50%;
  }
  input[type="radio"]:checked + &::before {
    background: #b3c8ff;
    width: 17px;
    height: 17px;
    content: "";
    left: 0px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border-radius: 50%;
  }
  input[type="radio"]:checked + &::after {
    background: #007fff;
    width: 9px;
    height: 9px;
    content: "";
    left: 4px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border-radius: 50%;
  }
`;
