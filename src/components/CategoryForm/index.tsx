import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { CATEGORY } from "api";
import { errorState, successState } from "store/atoms";
import { Alert } from "components";
import { CategoryItem } from "types";

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryPutName, setCategoryPutName] = useState("");
  const [categoryPutID, setCategoryPutID] = useState(Number);
  const [modalPutOpen, setModalPutOpen] = useState(false);

  const setError = useSetRecoilState(errorState);
  const setSuccess = useSetRecoilState(successState);

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery(
    "getCategories",
    CATEGORY.getCategories
  );

  const categoryMutation = useMutation(CATEGORY.categoryAdd, {
    onSuccess: (response) => {
      if (response) {
        if (`${response}`.includes("Error")) {
          return setError(`${response}`);
        }
        setSuccess("카테고리가 추가되었습니다.");
        queryClient.invalidateQueries("getCategories");
        setCategoryName("");
        return response.data;
      }
    },
  });

  const categoryPutMutation = useMutation("categoryput", CATEGORY.categoryPut, {
    onSuccess: (response) => {
      if (response) {
        if (`${response}`.includes("Error")) {
          return setError(`${response}`);
        }
        setSuccess("카테고리가 편집되었습니다.");
        queryClient.invalidateQueries("getCategories");
        setCategoryPutName("");
        return response.data;
      }
    },
  });

  const categoryDelMutation = useMutation(CATEGORY.categoryDel, {
    onSuccess: (response) => {
      if (response) {
        if (`${response}`.includes("Error")) {
          return setError(`${response}`);
        }
        setSuccess("카테고리가 삭제되었습니다.");
        queryClient.invalidateQueries("getCategories");
        return response.data;
      }
    },
  });

  const categoryDel = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      categoryDelMutation.mutate({ id });
    }
  };

  const modalBtn = () => {
    setCategoryName("");
    setModalOpen(!modalOpen);
  };

  const modalPutBtn = () => {
    setCategoryPutName("");
    setModalPutOpen(!modalPutOpen);
  };

  const categorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (categoryName.trim() === "") return setError("카테고리명을 적어주세요!");
    e.preventDefault();
    modalBtn();
    categoryMutation.mutate({ categoryName });
  };

  const categoryPutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (categoryPutName.trim() === "")
      return setError("카테고리명을 적어주세요");
    e.preventDefault();
    modalPutBtn();
    categoryPutMutation.mutate({
      categoryName: categoryPutName,
      id: categoryPutID,
    });
  };

  if (isLoading) return <h1>"성공했습니다.</h1>;
  if (isError) return <h1>"실패했습니다.!"</h1>;

  return (
    <>
      <Alert />
      <StAdminWrap>
        <StTop>
          <StTitle>
            카테고리관리
            <StUser>
              총 <StUserSpan>{data.length}</StUserSpan>개
            </StUser>
          </StTitle>
          <StButton onClick={() => modalBtn()}>카테고리 추가</StButton>
        </StTop>
        <StContent>
          <StContentTop>
            <StName>카테고리명</StName>
          </StContentTop>
          {data.map((item: CategoryItem) => {
            return (
              <StContentBottom key={item.id}>
                <StName>{item.categoryName}</StName>
                <StChange>
                  <StChangeBtn
                    onClick={() => {
                      setModalPutOpen(true);
                      setCategoryPutID(item.id);
                    }}
                  >
                    카테고리 수정
                  </StChangeBtn>
                  <StDelBtn
                    onClick={() => {
                      categoryDel(item.id);
                    }}
                  >
                    카테고리 삭제
                  </StDelBtn>
                </StChange>
              </StContentBottom>
            );
          })}
        </StContent>
      </StAdminWrap>
      {/* //추가하기 */}
      <StCategoryAdd className={modalOpen ? "on" : "off"}>
        <StSignBox className={modalOpen ? "on" : "off"}>
          <StCategoryForm onSubmit={categorySubmit}>
            <StIoClose
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={modalBtn}
            >
              <path
                d="M27.5594 11.4419L10.8927 28.1086"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.8927 11.4419L27.5594 28.1086"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </StIoClose>
            <StCategoryTitle>카테고리 추가</StCategoryTitle>
            <StCategory>
              <StCategoryInput
                type="text"
                value={categoryName}
                placeholder="추가할 카테고리 명"
                maxLength={10}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <StCommonButton>추가</StCommonButton>
            </StCategory>
          </StCategoryForm>
        </StSignBox>
        <StSignBg onClick={modalBtn} className={modalOpen ? "on" : "off"} />
      </StCategoryAdd>

      {/* //수정하기 */}

      <StCategoryAdd className={modalPutOpen ? "on" : "off"}>
        <StSignBox className={modalPutOpen ? "on" : "off"}>
          <StCategoryForm onSubmit={categoryPutSubmit}>
            <StIoClose
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={modalPutBtn}
            >
              <path
                d="M27.5594 11.4419L10.8927 28.1086"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.8927 11.4419L27.5594 28.1086"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </StIoClose>
            <StCategoryTitle>카테고리 수정</StCategoryTitle>
            <StCategory>
              <StCategoryInput
                type="text"
                value={categoryPutName}
                placeholder="수정할 카테고리명"
                onChange={(e) => setCategoryPutName(e.target.value)}
                maxLength={10}
              />
              <StCommonButton>수정</StCommonButton>
            </StCategory>
          </StCategoryForm>
        </StSignBox>
        <StSignBg
          onClick={modalPutBtn}
          className={modalPutOpen ? "on" : "off"}
        />
      </StCategoryAdd>
    </>
  );
};
export default CategoryForm;

const StAdminWrap = styled.div`
  width: calc(100% - 20.21%);
  margin-left: 20.21%;
  padding: 95px 5.74%;
`;

const StTop = styled.div`
  margin-bottom: 20px;
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
    background: ${(props) => props.theme.textBlue};
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
  color: ${(props) => props.theme.textBlue};
  font-weight: 800;
`;

const StContent = styled.div``;
const StContentTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  border-radius: 5px;
  background: ${(props) => props.theme.bgGrey};
  text-align: center;
`;
const StName = styled.p`
  text-align: left;
  padding-left: 4%;
  font-weight: 700;
  font-size: 1.125rem;
  width: 75%;
`;
const StContentBottom = styled.div`
  width: 100%;
  height: 80px;
  align-items: center;
  border: 1px solid ${(props) => props.theme.borderColor};
  background: ${(props) => props.theme.bgwhite};
  border-radius: 5px;
  display: flex;
  margin-top: 18px;
`;

const StChange = styled.p`
  width: 25%;
  text-align: center;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StButton = styled.button`
  width: 140px;
  height: 50px;
  font-size: 0.875rem;
  background: ${(props) => props.theme.bgBlue};
  color: ${(props) => props.theme.textwhite};
  border: 0;
  cursor: pointer;
  border-radius: 50px;
`;

const StChangeBtn = styled.button`
  text-align: center;
  width: 130px;
  height: 38px;
  border: 1px solid ${(props) => props.theme.bgBlue};
  color: ${(props) => props.theme.bgBlue};
  background: transparent;
  font-size: 0.875rem;
  border-radius: 50px;
  cursor: pointer;
`;

const StDelBtn = styled.button`
  border: 1px solid ${(props) => props.theme.textRed};
  color: ${(props) => props.theme.textRed};
  margin-left: 10px;
  text-align: center;
  width: 130px;
  height: 38px;
  background: transparent;
  font-size: 0.875rem;
  border-radius: 50px;
  cursor: pointer;
`;

//모달부분
const StCategoryAdd = styled.div`
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
const StSignBg = styled.div`
  background: rgba(18, 18, 18, 0.4);
  transition: opacity 0.5s ease-in-out;
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

const StSignBox = styled.div`
  width: 500px;
  height: 250px;
  position: absolute;
  background: ${(props) => props.theme.bgwhite};
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  border-radius: 10px;
  margin: auto;
  overflow: hidden;
  transition: transform 0.3s ease-out;
  transform: translateY(100px);
  transition-delay: 0.3s ease-in-out;
  z-index: 10;
  &.on {
    transition-delay: 0.3s ease-in-out;
    transform: translateY(0);
  }
  &.off {
    transform: translateY(100px);
  }
`;

const StCategoryForm = styled.form`
  padding: 70px 75px;
`;

const StCategoryTitle = styled.h3`
  font-weight: 800;
  font-size: 1.25rem;
  margin-bottom: 35px;
  text-align: center;
`;
const StCategoryInput = styled.input`
  width: 100%;
  height: 44px;
  border: 0;
  outline: 0;
  padding-right: 90px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }
`;
const StCategory = styled.div`
  position: relative;
`;
const StCommonButton = styled.button`
  position: absolute;
  width: 84px;
  height: 44px;
  right: 0px;
  top: 0;
  background: ${(props) => props.theme.bgBlue};
  color: ${(props) => props.theme.textwhite};
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const StIoClose = styled.svg`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  stroke: ${(props) => props.theme.borderColor};
`;
