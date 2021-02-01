import { GET_PROFILE, PROFILE_ERR } from "./types";
import axios from "axios";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: err.response.statusText },
    });
  }
};
