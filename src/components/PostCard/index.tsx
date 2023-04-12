import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { Post } from "types";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { getCookie } from "api/cookies";

const PostCard = (post: Post) => {
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const navigate = useNavigate();

  const handleClickPostCard = () => {
    // let temp;
    // const fetchSse = async () => {
    //   try {
    //     temp = await new EventSource(
    //       `${process.env.REACT_APP_SERVER_URL}connect/${post.id}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${getCookie("access_token")}`,
    //         },
    //         withCredentials: true,
    //       }
    //     );

    //     temp.onopen = () => console.log("is connected !");
    //     temp.onmessage = (event) => console.log(JSON.parse(event.data));
    //   } catch (err) {}
    // };

    // fetchSse();
    navigate(`/post/${post.id}`);
  };

  // useEffect(() => {
  //   if (eventSource) {
  //     console.log("render!");
  //     eventSource.onopen = () => console.log("is connected !");

  //     eventSource.onmessage = (event) => {
  //       console.log(JSON.parse(event.data));
  //     };
  //   }

  //   return () => {
  //     if (eventSource) {
  //       console.log("render bye bye!");
  //       eventSource.close();
  //     }
  //   };
  // }, [eventSource]);

  return (
    <StPostCardBox onClick={handleClickPostCard}>
      <StTitle>
        {post.title.length > 100 ? post.title.slice(0, 99) + "..." : post.title}
      </StTitle>
      <StContent>
        {post.content.length > 100
          ? post.content.replace(/<[^>]*>?/g, "").slice(0, 99) + "..."
          : post.content.replace(/<[^>]*>?/g, "")}
      </StContent>
      <StPostCardFooter>
        <StFooterleft>
          {post.keywords.map((keyword) => (
            <StKeyWord key={keyword}>#{keyword}</StKeyWord>
          ))}
        </StFooterleft>
        <StFooterRight>
          <StFooterItem>{
          new Date(post.modifiedAt)
              .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\//g, ".")}</StFooterItem>
          <StFooterItem>
            댓글 <StFooterItemSpan>{post.commentCount}</StFooterItemSpan>개
          </StFooterItem>
          <StFooterItem>
            조회수 <StFooterItemSpan>{post.postViews}</StFooterItemSpan>개
          </StFooterItem>
        </StFooterRight>

        {post.editingStatus === "true" && <CircularProgress size={13} />}
      </StPostCardFooter>
    </StPostCardBox>
  );
};

export default PostCard;

const StPostCardBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 45px 45px;
  border: 1px solid ${(props) => props.theme.greyBorder};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 4px 0px;
  border-radius: 10px;
  margin-bottom:30px;
  cursor: pointer;
  background: ${(props) => props.theme.bgColor};
  transition: all 0.3s;
  &:hover {
    background: ${(props) => props.theme.bgLightBlue};
    box-shadow: none;
  }
`;

const StTitle = styled.h4`
  font-weight: 800;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin:0px 0 20px;
`;

const StContent = styled.p`
  line-height: 1.5;
  overflow: hidden;
  max-height: 77px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const StPostCardFooter = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
`;

const StFooterleft = styled.div`
  display:flex;
  gap:10px;
  width:60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const StKeyWord = styled.span`
  color: ${(props) => props.theme.keyBlue};
  font-weight: 500;
`;
const StFooterRight = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
 
`;
const StFooterItem = styled.p`
  display: flex;
  align-items: center;
  font-weight: 600;
`;
const StFooterItemSpan = styled.span`
  color: ${(props) => props.theme.keyBlue};
  display: block;
  margin: 0 2px 0 5px;
`;