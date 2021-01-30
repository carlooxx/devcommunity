import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";
import axios from "axios";
import { setAlert } from "../action/alert";

//Load user / set token into header
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users", { name, email, password });
    const { token } = res.data;
    localStorage.setItem("token", token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    localStorage.removeItem("token");
    dispatch({
      type: REGISTER_FAILED,
    });
  }
};
