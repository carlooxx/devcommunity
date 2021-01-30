import { REGISTER_SUCCESS, REGISTER_FAILED } from "./types";
import axios from "axios";
import { setAlert } from "../action/alert";

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
