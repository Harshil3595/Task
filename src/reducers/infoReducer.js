import {
  GET_ALL_INFO_REQUEST,
  GET_ALL_INFO_SUCCESS,
  GET_ALL_INFO_FAIL,
} from "../constants/infoConstances";
export const infoReducer = (state = { info: [] }, action) => {
  switch (action.type) {
    case GET_ALL_INFO_REQUEST:
      return {
        loading: false,
        info: action.payload,
      };
    case GET_ALL_INFO_SUCCESS:
      return {
        loading: false,
        info: action.payload,
      };
    case GET_ALL_INFO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
