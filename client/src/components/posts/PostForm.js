import React, { useState } from "react";
import { createPost } from "../../action/posts";
import { useDispatch } from "react-redux";

const PostForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ text }));
    setText("");
  };
  return (
    <div className="post-form" onSubmit={(e) => onSubmit(e)}>
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
