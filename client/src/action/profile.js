import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
} from "./types";
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
//Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
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
//Get profile
export const getProfile = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
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
//Get github username
export const getGithub = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
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
//Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/experience", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience added", "success"));
    history.push("/dashboard");
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
//Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/education", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education added", "success"));
    history.push("/dashboard");
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
//Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience removed", "success"));
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

//Delete Experience
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education removed", "success"));
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
//Delete account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile");
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert("Account permanantly deleted"));
    } catch (err) {
      const errors = err.response.data;
      if (errors) {
        dispatch(setAlert(errors, "danger"));
      }
      dispatch({
        type: PROFILE_ERR,
      });
    }
  }
};
