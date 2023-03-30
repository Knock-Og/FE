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
    setModalOpen(false);
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
  
  // console.log(data)
  return (
    <>
      <StAdminWrap>
        <StTop>
          <StTitle>
            사용자관리
            <StUser>
              전체사용자 <StUserSpan>{/* {data?.data.length} */}</StUserSpan>명
            </StUser>
          </StTitle>
          <StButton onClick={() => setModalOpen(true)}>인원추가 +</StButton>
        </StTop>
        <StContent>
          <StContentTop>
            <StName>이름</StName>
            <Stemail>이메일</Stemail>
            <StNumber>전화번호</StNumber>
            <StPosition>직급</StPosition>
            <Stpositionchange>직급변경</Stpositionchange>
            <StChange>직급수정</StChange>
          </StContentTop>
           {data?.data.map((item: SignItem) => {
            return (
              <StContentform onSubmit={positionSubmit} key={item.id}>
                <StContentBottom>
                  <StNameBottom>{item.memberName}</StNameBottom>
                  <StemailBottom>{item.email}</StemailBottom>
                  <StNumberBottom>{item.phoneNum}</StNumberBottom>
                  <StPositionBottom>{item.position}</StPositionBottom>
                  <StPositionchangeWrap>
                    <StPositionchangeDiv>
                      <StPositionInput
                        type="radio"
                        id={`Member${item.id}`}
                        name="position"
                        value="MEMBER"
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
          <SignUpForm onClose={modalBtn} modalOpen={modalOpen} />
        </ModalPortal>
      )}
    </>
  );
};
export default AdminForm;

const StAdminWrap = styled.div`
  width: calc(100% - 20.21%);
  margin-left: 20.21%;
  padding: 95px 3.7%;
`;
const StTop = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;
const StTitle = styled.h3`
  display: flex;
  font-size: 2rem;
  font-weight: 800;
  font-size: 32px;
  letter-spacing: 0.016em;
  align-items: center;
`;
const StUser = styled.p`
  font-size: 1rem;
  margin-left: 47px;
  font-weight: 800;
  font-size: 1.125rem;
  letter-spacing: 0.016em;
  color: #121212;
  position: relative;
  padding-left:28px;
  &::before {
    width: 16px;
    height: 16px;
    background: #007fff;
    content:'';
    position:absolute;
    left:0;
    top:0;
    bottom:0;
    margin:auto 0;
    border-radius: 50%;
  }
`;
const StUserSpan = styled.span`
  color: #007fff;
`;
const StButton = styled.button`
  height: 40px;
  width: 140px;
  font-size: 0.875rem;
  background: #007fff;
  color: #fff;
  border: 0;
  cursor: pointer;
  border-radius: 10px;
`;

const StChangeBtn = styled.button`
  text-align: center;
  width: 82px;
  height: 26px;
  border: 2px solid #007fff;
  color: #007fff;
  background: #fff;
  font-size: 0.875rem;
  border-radius: 50px;
`;
const StContent = styled.div``;
const StContentform = styled.form``;
const StContentTop = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #f9f9f9;
  border-radius: 10px;
`;
const Stcommonstyle = `
  text-align:center;
  font-weight: 700;
  font-size: 1.125rem;
`;
const StcommonBottomstyle = `
    text-overflow: ellipsis;
  overflow: hidden;
  text-align:center;
  white-space: nowrap;
  font-weight: 500;
font-size: 1rem;
`;

const StChange = styled.p`
  width: 12.84%;
  text-align: center;
`;

const StName = styled.p`
  width: 10.98%;
  ${Stcommonstyle}
`;
const Stemail = styled.p`
  width: 18.3%;
  ${Stcommonstyle}
`;
const StNumber = styled.p`
  width: 13.18%;
  ${Stcommonstyle}
`;
const StPosition = styled.p`
  width: 16.11%;
  ${Stcommonstyle}
`;

const StNameBottom = styled.p`
  width: 10.98%;
  ${StcommonBottomstyle}
`;
const StemailBottom = styled.p`
  width: 18.3%;
  ${StcommonBottomstyle}
`;
const StNumberBottom = styled.p`
  width: 13.18%;
  ${StcommonBottomstyle}
`;
const StPositionBottom = styled.p`
  width: 16.11%;
  ${StcommonBottomstyle}
`;

const Stpositionchange = styled.p`
  width: 31.48%;
  ${Stcommonstyle}
  text-align: left;
`;



const StContentBottom = styled.div`
  width: 100%;
  height: 80px;
  border: 1px solid #c5c5c5;
  border-radius: 10px;
  display: flex;
  line-height: 80px;
  margin-top: 20px;
`;

const StPositionchangeWrap = styled.div`
  display: flex;
  width: 31.48%;
  gap: 4.3%;
`;

const StPositionchangeDiv = styled.div``
const StPositionInput = styled.input`
  display: none;
`;

const StPositonCommon =`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border-radius: 50%;
  content: "";
`;
const StPositonBeforeCommon = `
  width: 14px;
  height: 14px;
  left: 0px;
  background: #c5c5c5;
`;

const StPositonAfterCommon = `
  width: 8px;
  height: 8px;
  left: 3px;
`;
const StPositionLabel = styled.label`
  padding-left: 20px;
  position: relative;
  font-size: 1rem;
  font-weight:500;
  input[type="radio"] + &::before {
    ${StPositonBeforeCommon}
    ${StPositonCommon}
  }
  input[type="radio"] + &::after {
    background: #aeaeae;
    ${StPositonAfterCommon}
    ${StPositonCommon}
  }
  input[type="radio"]:checked + &::before {
    
    ${StPositonBeforeCommon}
    ${StPositonCommon}
  }
  input[type="radio"]:checked + &::after {
    background: #007fff;
    ${StPositonAfterCommon}
    ${StPositonCommon}
  }
`;