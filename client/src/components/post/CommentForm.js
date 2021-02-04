import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../action/posts";
import CommentItem from "./CommentItem";

const CommentForm = ({ post, post: { _id } }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(_id, { text }));
    setText("");
  };
  return (
    <Fragment>
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={(e) => onSubmit(e)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

export default CommentForm;
