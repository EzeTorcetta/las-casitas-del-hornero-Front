import {
  ALL_HOTELS,
  ALL_FAVORITES_HOTELS,
  DETAIL_CLEAR_HOTEL,
  DETAIL_HOTEL,
} from "../Actions-index/index";
import axios from "axios";

export const FuncionAllHotel = () => {
  return async (dispatch) => {
    const response = await axios.get("/Hotel");
    dispatch({ type: ALL_HOTELS, payload: response.data });
  };
};

export const FuncionAllFavoritesHotel = () => {
  return async (dispatch) => {
    const response = await axios.get("/Favorito");
    dispatch({ type: ALL_FAVORITES_HOTELS, payload: response.data });
  };
};

export const FuncionDetailHotel = () => {
  return async (dispatch) => {
    const response = await axios.get("/Detail");
    dispatch({ type: DETAIL_HOTEL, payload: response.data });
  };
};

export const FuncionClearDetail = () => {
  return { type: DETAIL_CLEAR_HOTEL }; // cuando se desmonte el detail , el objeto se vacia.
};
