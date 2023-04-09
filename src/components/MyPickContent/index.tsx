import styled from "styled-components";
import { MYPAGE } from "api";
import { useQuery } from "react-query";
import { Post } from "types";
const MyPostContent = ()=>{
    const { isLoading, isError, data } = useQuery<Post[]>(
      "getMyPosts",
      MYPAGE.getMyPosts
    );
    if (isLoading) return <h1>로딩중...</h1>
    if (isError) return <h1>로딩중...</h1>;
    console.log(data);
      return (
        <StPostContent>
          {/* {data.map((item) => {
            return (
              <StPostTop>
                <StLeft>
                  <StPostPick>
                    <StSvg>
                      <path d="M6 0L7.6995 3.6204L11.5 4.20452L8.75 7.02103L9.399 11L6 9.1204L2.601 11L3.25 7.02103L0.5 4.20452L4.3005 3.6204L6 0Z" />
                    </StSvg>
                  </StPostPick>
                  <StTitle></StTitle>
                </StLeft>
                <StRight>
                  <StName></StName>
                  <StDay></StDay>
                </StRight>
              </StPostTop>
            );
          })} */}
        </StPostContent>
      );
}
export default MyPostContent


const StPostContent = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.greyLight};
`;
const StPostTop = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.greyLight};
  padding:10px 30px 10px 15px;
  display:flex;
  align-items: center;
  justify-content: space-between;
`;
const StLeft = styled.div``;
const StPostPick = styled.div`
  border: 1px solid ${(props) => props.theme.lightGrey};
  width:24px;
  height:24px;
  border-radius: 24px;
  display:flex;
  align-items: center;
  justify-content: center;
`;
const StSvg = styled.svg`
  fill: ${(props) => props.theme.lightGrey};
  width:12px;
  height:12px;
`;
const StTitle = styled.em`
  display: block;
  font-weight: 500;
  margin-left: 1.09%;
`;
const StRight = styled.div``;
const StName = styled.p`
  font-weight: 500;
  margin-right: 3.63%;
`;
const StDay = styled.p`
  font-weight: 500;
`;