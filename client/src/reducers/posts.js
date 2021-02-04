import {
  GET_POSTS,
  POST_ERR,
  LIKE_UPDATE,
  DELETE_POST,
  CREATE_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
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
    case GET_POST:
      return {
        ...state,
        post: action.payload,
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
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        isLoading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        },
        isLoading: false,
      };
    default:
      return state;
  }
};

export default posts;
