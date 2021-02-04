import {
  GET_POSTS,
  POST_ERR,
  LIKE_UPDATE,
  DELETE_POST,
  CREATE_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
//Get all posts
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
//Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
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
    await axios.delete(`/api/posts/${id}`);
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

//Create post
export const createPost = (text) => async (dispatch) => {
  try {
    const res = await axios.post("/api/posts", text);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post created", "success"));
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
//Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment created", "success"));
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
//Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment removed", "success"));
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
