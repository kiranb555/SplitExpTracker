import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";

const Posts = () => {
  const match = useRouteMatch();
  return (
    <div>
      posts
      <Link to={`${match.url}/${1}`}>
        <Button>post</Button>
      </Link>
    </div>
  );
};

export default Posts;
