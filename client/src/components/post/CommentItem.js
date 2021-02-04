import React from "react";
import { Link } from "react-router-dom";
import formateDate from "../../util/formateDate";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../action/posts";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, date, user },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to="/profile">
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">Posted on {formateDate(date)}</p>
        {!auth.isLoading && user === auth.user._id && (
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => dispatch(deleteComment(postId, _id))}
          >
            <i class="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
