import { GET_ALL_INFO_REQUEST, GET_ALL_INFO_SUCCESS } from "../constants/infoConstances";
import axios from 'axios'

export const getAllInfo = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_INFO_REQUEST });
  
      const { data } = await axios.get("https://video-api-dot-dj-virtual-spaces.el.r.appspot.com");
      console.log(data)
  
      dispatch({
        type: GET_ALL_INFO_SUCCESS,
        payload: data.videosData,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_INFO_SUCCESS,
        payload: error.response.data.message,
      });
    }
  };