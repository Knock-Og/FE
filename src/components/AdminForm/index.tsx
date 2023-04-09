import styled from "styled-components";
import ModalPortal from "api/portal";
import { SignUpForm } from "components";
import { useState,useEffect} from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
// import Reactpage from "react-js-pagination"
import { ADMIN } from "api";
import { SignItem } from "types";
const AdminForm = () => {
  interface OpenState {
    [key:string]:boolean
  }

  interface PositionState {
    [key:string]:string
  }

  const positionList = [
    { id: 0, position: "MEMBER" },
    { id: 1, position: "MANAGER" },
    { id: 2, position: "OWNER" },
  ];

  const [isOpen, setIsOpen] = useState<OpenState>();
  const [modalOpen, setModalOpen] = useState(false);
  const [position, setPosition] = useState<PositionState>();
  const [positionID, setPositionID] = useState(Number);
  const [changeItemId,setChangeItemId] = useState<number>(0);
  
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

  const positionChange = (posId: number, itemId:number,changePosition: string) => {
    setChangeItemId(itemId);
    setPositionID(posId);
    setPosition({...position,[`${itemId}`]:changePosition});
    setIsOpen({...isOpen,[`${itemId}`]:false});
  };

  const positionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(position){
      positionMutation.mutate({
        item: position[changeItemId],
        id: changeItemId,
      });
      
    }
  };
  console.log(position);
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

  useEffect(()=>{
    const openState = data?.data.reduce((acc:OpenState,v:SignItem)=>{
      return {...acc,[`${v.id}`]:false}
    },{})
    setIsOpen(openState)

    const positionState = data?.data.reduce((acc:PositionState,v:SignItem)=>{
      return {...acc,[`${v.id}`]:"Member"}
    },{})
    setPosition(positionState)

  },[data])

  if (isLoading) return <h1>"성공했습니다.!"</h1>;
  if (isError) return <h1>"실패했습니다.!"</h1>;

  return (
    <>
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
                        onClick={() =>
                          isOpen &&
                          setIsOpen({
                            ...isOpen,
                            [`${item.id}`]: !isOpen[`${item.id}`],
                          })
                        }
                      >
                        {position && position[item.id]}
                      </StSeletLabel>
                      {isOpen && isOpen[`${item.id}`] && (
                        <StSeletUl>
                          {positionList.map((position) => (
                            <StSeletLi
                              key={`${item.id}-${position.id}`}
                              onClick={() =>
                                positionChange(
                                  position.id,
                                  item.id,
                                  position.position
                                )
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
                    <StDelBtn type="button">인원삭제</StDelBtn>
                  </StBottomListBtn>
                </StOpsion>
              </StContentBottom>
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
  font-size: 1rem;
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
`;
const StOpsion = styled.form`
  width: 33.32%;
  display:flex;
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
  padding-left: 12px;
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
  cursor: pointer;
  &:hover {
    background: #f5faff;
    color: #007fff;
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

const StDelBtn = styled(StChangeBtn)`
  border: 1px solid ${(props) => props.theme.redColor};
  color: ${(props) => props.theme.redColor};
  margin-left:10px;
`;










// const PaginationWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 35px;
//   .pagination {
//     display: flex;
//     align-items: center;
//   }
//   .pagination li {
//     display: flex;
//     align-items: center;
//     width: 30px;
//     height: 30px;
//     justify-content: center;
//   }
//   .pagination li a {
//     font-size: 1.125rem;
//     font-weight: 700;
//     color: ${(props) => props.theme.lightGrey};
//   }
//   .pagination li.active a {
//     color: ${(props) => props.theme.keyBlue};
//     text-decoration-line: underline;
//   }
// `;

// const PrevButton = styled.button`
//   background-image: url(${left_arr});
//   background-size: contain;
//   width: 18px;
//   height: 18px;
//   border: none;
//   cursor: pointer;
//   background-color: transparent;
  
// `;

// const NextButton = styled.button`
//   background-image: url(${right_arr});
//   background-size: contain;
//   border: none;
//   width: 18px;
//   height: 18px;
//   background-color: transparent;
//   cursor: pointer;
// `;