import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineEye,
} from "react-icons/ai";
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
      <StKeyWordsWrapper>
        {post.keywords.map((keyword) => (
          <StKeyWord key={keyword}>{keyword}</StKeyWord>
        ))}
      </StKeyWordsWrapper>
      <StTitle>
        {post.title.length > 100 ? post.title.slice(0, 99) + "..." : post.title}
      </StTitle>
      <StContent>
        {post.content.length > 100
          ? post.content.replace(/<[^>]*>?/g, "").slice(0, 99) + "..."
          : post.content.replace(/<[^>]*>?/g, "")}
      </StContent>
      <StPostCardFooter>
        <StFooterItem>
          <AiOutlineClockCircle />
          {post.modifiedAt.slice(0, 10)}
        </StFooterItem>
        <StFooterItem>
          <AiOutlineComment />
          {post.commentCount}
        </StFooterItem>
        <StFooterItem>
          <AiOutlineEye />
          {post.postViews}
        </StFooterItem>
        {post.editingStatus === "true" && <CircularProgress size={13} />}
      </StPostCardFooter>
    </StPostCardBox>
  );
};

export default PostCard;

const StPostCardBox = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  border: 1px solid ${(props) => props.theme.grey};
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.14);
  border-radius: 24px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const StKeyWordsWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const StKeyWord = styled.div`
  background-color: ${(props) => props.theme.keyBlue};
  color: #fff;
  width: 82px;
  height: 32px;
  border-radius: 24px;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
`;

const StTitle = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 38px;
  color: ${(props) => props.theme.darkGrey};
`;

const StContent = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 160%;
  color: ${(props) => props.theme.darkGrey};
`;

const StPostCardFooter = styled.div`
  display: flex;
  gap: 10px;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.darkGrey};
`;

const StFooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
