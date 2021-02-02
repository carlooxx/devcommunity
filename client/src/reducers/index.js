import { combineReducers } from "redux";
import alert from "./alert";
import authReducer from "./auth";
import profile from "./profile";
import posts from "./posts";

export default combineReducers({
  alert,
  authReducer,
  profile,
  posts,
});
