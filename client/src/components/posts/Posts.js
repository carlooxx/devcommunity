import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../action/posts";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = () => {
  const isLoading = useSelector((state) => state.posts.isLoading);
  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      {/* <PostForm /> */}
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default Posts;
