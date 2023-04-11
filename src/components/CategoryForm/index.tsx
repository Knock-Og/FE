import styled from "styled-components";
import ModalPortal from "api/portal";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CATEGORY } from "api";
import { CategoryItem } from "types";
const CategoryForm = () => {
  const queryClient = useQueryClient();
  //카테고리 추가
  const [categoryName, setCategoryName] = useState("");
  const categoryMutation = useMutation("categoryadd", CATEGORY.categoryAdd, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("getCategories");
        return response.data;
      }
    },
    onError: (response) => {
      if (response) {
        queryClient.invalidateQueries("getCategories");
        alert("카테고리추가를 실패했습니다!");
      }
    },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const modalBtn = () => {
    setModalOpen(!modalOpen);
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
  const categorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (categoryName.trim() === "") return alert("카테고리명을 적어주세요!");
    e.preventDefault();
    modalBtn();
    categoryMutation.mutate({ categoryName });
  };

  //카테고리 수정
  const [categoryPutName, setCategoryPutName] = useState("");
  const [categoryPutID, setCategoryPutID] = useState(Number);

  const [modalPutOpen, setModalPutOpen] = useState(false);
  const modalPutBtn = () => {
    setModalPutOpen(!modalPutOpen);
  };
  useEffect(() => {
    if (modalPutOpen) {
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
  }, [modalPutOpen]);
  const categoryPutMutation = useMutation("categoryput", CATEGORY.categoryPut, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("getCategories");
        console.log("성공햇습니다.");
        return response.data;
      }
    },
    onError: (response) => {
      if (response) {
        queryClient.invalidateQueries("getCategories");
        alert("카테고리변경을 실패했습니다.");
      }
    },
  });
  const categoryPutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (categoryPutName.trim() === "") return alert("카테고리명을 적어주세요");
    e.preventDefault();
    modalPutBtn();
    categoryPutMutation.mutate({
      categoryName: categoryPutName,
      id: categoryPutID,
    });
  };
  //카테고리 삭제
  const categoryDelMutation = useMutation("categorydel", CATEGORY.categoryDel, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("getCategories");
        console.log("성공햇습니다.");
        return response.data;
      }
    },
    onError: (response) => {
      if (response) {
        queryClient.invalidateQueries("getCategories");
        alert("카테고리삭제을 실패했습니다.");
      }
    },
  });
  const categoryDel = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      categoryDelMutation.mutate({ id });
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };
  const { isLoading, isError, data } = useQuery(
    "getCategories",
    CATEGORY.getCategories
  );
  if (isLoading) return <h1>"성공했습니다.</h1>;
  if (isError) return <h1>"실패했습니다.!"</h1>;

  return (
    <>
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
      <ModalPortal>
        {modalOpen && (
          <StCategoryAdd>
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
                  stroke="#C5C5C5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.8927 11.4419L27.5594 28.1086"
                  stroke="#C5C5C5"
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
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <StCommonButton>추가</StCommonButton>
              </StCategory>
            </StCategoryForm>
            <StSignBg onClick={modalBtn} />
          </StCategoryAdd>
        )}
      </ModalPortal>

      {/* //수정하기 */}
      <ModalPortal>
        {modalPutOpen && (
          <StCategoryAdd>
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
                  stroke="#C5C5C5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.8927 11.4419L27.5594 28.1086"
                  stroke="#C5C5C5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </StIoClose>
              <StCategoryTitle onClick={modalPutBtn}>
                카테고리 수정
              </StCategoryTitle>
              <StCategory>
                <StCategoryInput
                  type="text"
                  value={categoryPutName}
                  placeholder="수정할 카테고리 명"
                  onChange={(e) => setCategoryPutName(e.target.value)}
                />
                <StCommonButton>수정</StCommonButton>
              </StCategory>
            </StCategoryForm>
            <StSignBg onClick={modalPutBtn} />
          </StCategoryAdd>
        )}
      </ModalPortal>
    </>
  );
};
export default CategoryForm;

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
  padding-left: 28px;
  &::before {
    width: 16px;
    height: 16px;
    background: #007fff;
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
  color: #007fff;
`;

const StContent = styled.div``;
const StContentTop = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #f3f3f3;
  border-radius: 5px;
`;
const StName = styled.p`
  text-align: left;
  padding-left: 4.83%;
  font-weight: 700;
  font-size: 1.125rem;
  width: 75%;
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
const StButtonCommon = `
  text-align: center;
  width: 130px;
  height: 26px;
  background: #fff;
  font-size: 0.875rem;
  border-radius: 50px;  
  cursor: pointer;

`;
const StChangeBtn = styled.button`
  border: 2px solid #007fff;
  color: #007fff;
  ${StButtonCommon}
`;
const StDelBtn = styled.button`
  border: 2px solid #aeaeae;
  color: #aeaeae;
  ${StButtonCommon}
`;
const StChange = styled.p`
  width: 25%;
  text-align: center;
  display: flex;
  gap: 10px;
  align-items: center;
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

//모달부분
const StCategoryAdd = styled.div`
  width: 100%;
`;
const StSignBg = styled.div`
  width: 100%;
  height: 100000px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, 0.4);
`;
const StCategoryForm = styled.form`
  width: 500px;
  background: #fff;
  z-index: 1;
  border-radius: 10px;
  padding: 70px 68px 80px;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  height: 250px;
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
  border-bottom: 1px solid #000;
  &::placeholder {
    color: #bdbdbd;
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
  background: #007fff;
  color: #fff;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const StIoClose = styled.svg`
  font-size: 22px;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: rotatez(180deg);
  }
`;
