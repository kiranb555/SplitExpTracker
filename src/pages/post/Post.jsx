import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { ID } = useParams();

  console.log({ ID });
  return <div>post</div>;
};

export default Post;
