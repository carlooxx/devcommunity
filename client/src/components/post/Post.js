import React, { Fragment, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../action/posts";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";

const Post = () => {
  const post = useSelector((state) => state.posts.post);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [dispatch, match.params.id]);

  return isLoading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn btn-light">
        Back To Posts
      </Link>
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to="/profile">
            <img class="round-img" src={post.avatar} alt="" />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">{post.text}</p>
        </div>
      </div>
      <CommentForm post={post} />
    </Fragment>
  );
};

export default Post;
