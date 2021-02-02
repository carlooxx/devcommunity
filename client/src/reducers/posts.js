import { GET_POSTS, POST_ERR } from "../action/types";

const initState = {
  posts: [],
  post: null,
  isLoading: true,
  error: {},
};

const posts = (state = initState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case POST_ERR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default posts;
