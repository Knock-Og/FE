import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { POST } from "api";
import { Layout, ModifyBoard } from "components";
import { PostDetail } from "types";

const Modify = () => {
  const [post, setPost] = useState<PostDetail>();
  const params = useParams();

  const { mutate: getPost } = useMutation(POST.getPost, {
    onSuccess: (res) => setPost(res.data as PostDetail),
  });

  useEffect(() => {
    getPost(parseInt(params.postId as string));
    //eslint-disable-next-line
  }, []);

  return <Layout>{post && <ModifyBoard {...post} />}</Layout>;
};

export default Modify;
