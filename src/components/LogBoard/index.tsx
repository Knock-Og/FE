import { useQuery } from "react-query";
import { LOG } from "api";
import { Logs, PostId } from "types";

const LogBoard = ({ postId }: PostId) => {
  const { data: logs } = useQuery<Logs[]>("getLog", () => LOG.getLog(postId));

  console.log(logs);

  return (
    <>
      <input type="text" placeholder="검색어를 입력해주세요" />
    </>
  );
};

export default LogBoard;
