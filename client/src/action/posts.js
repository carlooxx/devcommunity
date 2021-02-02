import { GET_POSTS, POST_ERR } from "./types";
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
