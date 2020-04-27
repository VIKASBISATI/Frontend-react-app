import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  POST_SCREAM
} from "../types";

const initialState = {
  loading: false,
  screams: [],
  scream: {}
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREAMS:
      return {
        ...state,
        loading: false,
        screams: action.payload
      };
    case SET_SCREAM:
      return {
        ...state,
        loading: false,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SUBMIT_COMMENT: 
    return {
      ...state,
      scream: {
        ...state.scream,
        comments:[action.payload,...state.scream.comments]
      }
    }
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case DELETE_SCREAM:
      let currentIndex = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(currentIndex, 1);
      return {
        ...state
      };
    default:
      return state;
  }
};
export default dataReducer;
