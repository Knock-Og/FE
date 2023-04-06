import { PostId } from "types";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { POST, LOG } from "api";
import { Layout, DetailBoard, ModifyBoard } from "components";
import { Logs, PostDetail } from "types";

function index({ postId }: PostId) {
  // Error : useQuery 사용하려면 컴포넌트 대문자로 시작해야함  => 예외처리 코드
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: log } = useQuery<Logs[]>("getLog", () => LOG.getLog(postId));

  console.log(log);
  return (
    <>
      <input type="text" placeholder="검색어를 입력해주세요" />
    </>
  );
}

export default index;
