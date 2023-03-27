import styled from "styled-components";
import ModalPortal from "api/portal";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ADMINCATEGORI } from "api";
import { categoryItem } from "types";

const CategoryForm = () => {
  const queryClient = useQueryClient();
  //카테고리 추가
  const [categoryName, setCategoryName] = useState("");
  const categoryMutation = useMutation(
    "categoryadd",
    ADMINCATEGORI.categoryAdd,
    {
      onSuccess: (response) => {
        if (response) {
          queryClient.invalidateQueries("category");
          console.log("성공햇습니다.");
        }
      },
      onError: (response) => {
        if (response) {
          queryClient.invalidateQueries("category");
          console.log("실패햇습니다.");
        }
      },
    }
  );
  const categorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (categoryName.trim() === "") return alert("카테고리명을 적어주세요");
    e.preventDefault();
    categoryMutation.mutate({ categoryName });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const modalBtn = () => {
    setModalOpen(!modalOpen);
  };

  //카테고리 수정
  const [categoryPutName, setCategoryPutName] = useState("");
  const [categoryPutID, setCategoryPutID] = useState(Number);
  const [modalPutOpen, setModalPutOpen] = useState(false);
  const categoryPutMutation = useMutation(
    "categoryput",
    ADMINCATEGORI.categoryPut,
    {
      onSuccess: (response) => {
        if (response) {
          queryClient.invalidateQueries("category");
          console.log("성공햇습니다.");
        }
      },
      onError: (response) => {
        if (response) {
          queryClient.invalidateQueries("category");
          console.log("실패햇습니다.");
        }
      },
    }
  );
  const categoryPutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (categoryPutName.trim() === "") return alert("카테고리명을 적어주세요");
    e.preventDefault();
    categoryPutMutation.mutate({
      categoryName:categoryPutName,
      id: categoryPutID,
    });
  };
  //카테고리 삭제
  const categoryDelMutation = useMutation(
    "categorydel",
    ADMINCATEGORI.categoryDel,
    {
      onSuccess: (response) => {
        if (response) {
          queryClient.invalidateQueries("category");
          console.log("성공햇습니다.");
        }
      },
      onError: (response) => {
        if (response) {
          queryClient.invalidateQueries("category");
          console.log("실패햇습니다.");
        }
      },
    }
  );
  const categoryDel = (id:number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      categoryDelMutation.mutate({id});
      alert("삭제되었습니다.");
    } 
  };
  const { isLoading, isError, data } = useQuery(
    "categories",
    ADMINCATEGORI.categories
  );
  if (isLoading) return <h1>"성공했습니다.!"</h1>;
  if (isError) return <h1>"실패했습니다.!"</h1>;
    //console.log(data);
  return (
    <>
      <StAdminWrap>
        <StTop>
          <StTitle>
            Category
            <StUser>
              총 <span>{data?.data.length}</span>개
            </StUser>
          </StTitle>
          <button onClick={() => modalBtn()}>카테고리추가</button>
        </StTop>
        <StContent>
          <StContentTop>
            <StName>카테고리 명</StName>
          </StContentTop>

          {data?.data.map((item: categoryItem) => {
            return (
              <StContentBottom key={item.id}>
                <StCategory>{item.categoryName}</StCategory>
                <button
                  onClick={() => {
                    categoryDel(item.id);
                  }}
                >
                  삭제
                </button>
                <button
                  onClick={() => {
                    setModalPutOpen(true);
                    setCategoryPutID(item.id);
                  }}
                >
                  수정
                </button>
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
              <StCategoryTitle>카테고리</StCategoryTitle>
              <StCategoryInput
                type="text"
                value={categoryName}
                placeholder="카테고리명을 적어주세요"
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <StButton>추가하기</StButton>
            </StCategoryForm>
          </StCategoryAdd>
        )}
      </ModalPortal>

      {/* //수정하기 */}
      <ModalPortal>
        {modalPutOpen && (
          <StCategoryAdd>
            <StCategoryForm onSubmit={categoryPutSubmit}>
              <StCategoryTitle>카테고리</StCategoryTitle>
              <StCategoryInput
                type="text"
                value={categoryPutName}
                placeholder="카테고리명을 적어주세요"
                onChange={(e) => setCategoryPutName(e.target.value)}
              />
              <StButton>수정하기</StButton>
            </StCategoryForm>
          </StCategoryAdd>
        )}
      </ModalPortal>
    </>
  );
};
export default CategoryForm


const StAdminWrap = styled.div`
  width: calc(100%- 15.63%);
  padding: 85px 5.56% 0;
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
  > span {
    color: #007fff;
  }
`;
const StContent = styled.div``;
const StContentTop = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #f3f3f3;
  border-radius: 10px;
`;
const StName = styled.p`
  width: 100%;
  padding-left: 15px;
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
const StCategory = styled.p`
  width: 80%;
  padding-left: 15px;
`;
const StCategoryAdd = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.6);
`;
const StCategoryForm = styled.form`
  width: 500px;
  background: #fff;
  padding: 60px;
`;
const StCategoryTitle = styled.h3`
  font-size: 35px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 40px;
  text-align: center;
`;
const StCategoryInput = styled.input`
  width: 100%;
  height: 50px;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ececec;
  &::placeholder {
    color: #bdbdbd;
  }
  margin-bottom: 5px;
`;
const StButton = styled.button`
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #000;
  color: #fff;
  cursor: pointer;
`;