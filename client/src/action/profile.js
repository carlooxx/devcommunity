import { GET_PROFILE, PROFILE_ERR } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
    });
  }
};

//Create or Update Profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await axios.post("/api/profile", formData);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: PROFILE_ERR,
    });
  }
};
