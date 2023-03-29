import { getCookie } from "api/cookies";
import axios from "axios";
import { BookmarksBoard, CommentsBoard, LogBoard } from "components";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function DetailBoard() {
  const { id } = useParams();
  const [selected, setSelected] = useState(null);

  //버튼 클릭시 해당 컴포넌트 렌더링
  const handleClickButton = (e) => {
    const { name } = e.target;
    setSelected(name);
  };

  const buttonSelector = [
    { id: 1, name: "comments", content: "댓글" },
    { id: 2, name: "log", content: "로그" },
    { id: 3, name: "bookmarks", content: "즐겨찾기" },
  ];

  const selectComponent = {
    comments: <CommentsBoard />,
    log: <LogBoard />,
    bookmarks: <BookmarksBoard />,
  };

  //데이터 가져오기
  const accessToken = getCookie("access_token");
  const config = (accessToken) => {
    return { Authorization: `Bearer ${accessToken}` };
  };

  const { isLoading, isError, data } = useQuery(["getPost"], () =>
    getDetail(id)
  );

  const getDetail = async (id) => {
    return await axios.get(`http://43.201.3.8:8080/post/${id}`, {
      headers: config(accessToken),
    });
  };

  const deleteDetail = async (id) => {
    return await axios.delete(`http://43.201.3.8:8080/post/${id}`, {
      headers: config(accessToken),
    });
  };

  const PostData = data?.data;
  console.log("PostData", PostData);

  const navigate = useNavigate();

  const navToEditButton = () => {
    navigate("/modify", {
      state: { PostData },
    });
  };

  const deletePostHandler = () => {
    deleteDetail(id);
    navigate("/search");
  };

  return (
    <StWrapper>
      <StDetailContainer>
        <StDetailTitle>{PostData?.title}</StDetailTitle>
        <StDetailContent>{PostData?.content}</StDetailContent>
        <button onClick={navToEditButton}>수정하기</button>
        <button onClick={deletePostHandler}>삭제하기</button>
      </StDetailContainer>

      <StCardContainer>
        <StCardBox>
          {buttonSelector.map((data) => {
            return (
              <StButton
                onClick={handleClickButton}
                name={data.name}
                key={data.id}
              >
                {data.content}
              </StButton>
            );
          })}
        </StCardBox>
        {selected && <div>{selectComponent[selected]}</div>}
      </StCardContainer>
    </StWrapper>
  );
}

export default DetailBoard;

const StWrapper = styled.div`
  display: flex;
  flex-direction: rows;
  height: 100vh;
`;

const StDetailContainer = styled.div`
  width: 70%;
  height: 100%;
`;
const StCardContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const StCardBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const StButton = styled.button`
  width: 50px;
  height: 50px;
`;

const StDetailTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
`;

const StDetailContent = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;
