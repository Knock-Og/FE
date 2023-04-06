import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { POST, LOG } from "api";
import { Layout, DetailBoard, ModifyBoard } from "components";
import { Logs, PostDetail } from "types";

const Detail = () => {
  const params = useParams();

  const { data: post } = useQuery<PostDetail>("getPost", () =>
    POST.getPost(parseInt(params.postId as string))
  );
  // console.log(post);

  // const { data: log } = useQuery<Logs[]>("getLog", () =>
  //   LOG.getLog(parseInt(params.postId as string))
  // );

  return (
    <Layout>
      {post ? (
        post.editingStatus === "true" ? (
          <>
            <DetailBoard {...post} />
          </>
        ) : (
          <ModifyBoard {...post} />
        )
      ) : null}
    </Layout>
  );
};

export default Detail;
