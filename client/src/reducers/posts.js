import { GET_POSTS, POST_ERR, LIKE_UPDATE } from "../action/types";

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
        loading: false,
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
