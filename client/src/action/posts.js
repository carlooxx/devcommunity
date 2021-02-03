import { GET_POSTS, POST_ERR, LIKE_UPDATE, DELETE_POST } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: POST_ERR,
    });
  }
};
//Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: LIKE_UPDATE,
      //return postID and userID + postID
      payload: { id, likes: res.data },
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: POST_ERR,
    });
  }
};
//Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: LIKE_UPDATE,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: POST_ERR,
    });
  }
};
//Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post removed", "success"));
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: POST_ERR,
    });
  }
};
