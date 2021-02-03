import {
  GET_POSTS,
  POST_ERR,
  LIKE_UPDATE,
  DELETE_POST,
  CREATE_POST,
} from "../action/types";

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
    case LIKE_UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        isLoading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
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
