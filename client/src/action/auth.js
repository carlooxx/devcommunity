import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "./types";
import axios from "axios";
import { setAlert } from "../action/alert";
import tokenHeaderSet from "../util/tokenHeaderSet";

//Load user / set token into header
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    tokenHeaderSet(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
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
    dispatch(loadUser());
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

// //Login User
export const login = ({ email, password }) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth", { email, password });
    const { token } = res.data;
    localStorage.setItem("token", token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    localStorage.removeItem("token");
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};
