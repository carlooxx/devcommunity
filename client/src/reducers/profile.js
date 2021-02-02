import {
  GET_PROFILE,
  PROFILE_ERR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "../action/types";
const initState = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: true,
  err: {},
};

const profile = (state = initState, action) => {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        isLoading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        isLoading: false,
      };
    case PROFILE_ERR:
      return {
        ...state,
        isLoading: false,
        user: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        isLoading: false,
      };
    default:
      return state;
  }
};

export default profile;
