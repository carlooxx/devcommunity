import { GET_PROFILE, PROFILE_ERR, CLEAR_PROFILE } from "../action/types";
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
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    case PROFILE_ERR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
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
