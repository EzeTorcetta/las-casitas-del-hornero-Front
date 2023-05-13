import hotels from "../../data";
import { ALL_HOTELS, ALL_FAVORITES_HOTELS, DETAIL_CLEAR_HOTEL, DETAIL_HOTEL, LOGIN_USER, SEARCH_HOTELS } from "../Actions-index/index";
import axios from "axios";

export const FuncionAllHotel = () => {
  return async (dispatch) => {
    try {
      // const response = await axios.get("/Hotel");
      dispatch({ type: ALL_HOTELS, payload: hotels });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionSearch = (searchAll) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/onsearch`, searchAll);
      dispatch({ type: SEARCH_HOTELS, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionAllFavoritesHotel = (idUser) => {
  return async (dispatch) => {
    try {
      // const response = await axios.get(`/Favorito?idUser=${idUser}`);
      dispatch({ type: ALL_FAVORITES_HOTELS, payload: hotels });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionDetailHotel = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/Detail/${id}`);
      dispatch({ type: DETAIL_HOTEL, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionClearDetail = () => {
  return { type: DETAIL_CLEAR_HOTEL }; // cuando se desmonte el detail , el objeto se vacia.
};

export const Login = (name, username, password) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/login?name=${name}&username=${username}&password=${password}`);
      if (response.data.access === true) {
        dispatch({ type: LOGIN_USER, payload: response.data.dataValues.id });
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const UserLogin = (InfoUser) => {
  return async function () {
    try {
      await axios.post(`/login`, InfoUser);
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
