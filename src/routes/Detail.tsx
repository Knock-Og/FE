import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { POST } from "api";
import { Layout, DetailBoard, ModifyBoard } from "components";
import { PostDetail } from "types";

const Detail = () => {
  const params = useParams();

  const { data: post } = useQuery<PostDetail>("getPost", () =>
    POST.getPost(parseInt(params.postId as string))
  );

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
