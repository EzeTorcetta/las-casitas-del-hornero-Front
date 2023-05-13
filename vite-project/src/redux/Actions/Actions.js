import {
  ALL_HOTELS,
  ALL_FAVORITES_HOTELS,
  DETAIL_CLEAR_HOTEL,
  DETAIL_HOTEL,
  LOGIN_USER,
  SEARCH_HOTELS,
  USER_LOGIN,
} from "../Actions-index/index";
import axios from "axios";

// usuarios: /users
// hoteles: /hotels
// tipos de habitaciones: /roomTypes
// servicios: /services
// favoritos: /favorites

export const FuncionServices = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://las-casitas-del-hornero-back.up.railway.app/services");
      dispatch({ type: ALL_SERVICE, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionAllHotel = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://las-casitas-del-hornero-back.up.railway.app/hotels");
      dispatch({ type: ALL_HOTELS, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionTypeRoomTypes = (idHotel) => {
  console.log(idHotel);
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://las-casitas-del-hornero-back.up.railway.app/roomTypes/${idHotel}`);
      dispatch({ type: TYPE_ROOM, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionSearch = (nameHotel) => {
  console.log(nameHotel);

  return async (dispatch) => {
    try {
      const response = await axios.get(`http://las-casitas-del-hornero-back.up.railway.app/hotels?name=${nameHotel}`);
      console.log(response.data);
      dispatch({ type: SEARCH_HOTELS, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionAllFavoritesHotel = (idHotel, idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://las-casitas-del-hornero-back.up.railway.app/favorites?id=${idHotel}&idUser=${idUser}`);
      dispatch({ type: ALL_FAVORITES_HOTELS, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionDetailHotel = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://las-casitas-del-hornero-back.up.railway.app/hotels/${id}`);
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
      const response = await axios.get(`http://las-casitas-del-hornero-back.up.railway.app/users?name=${name}&username=${username}&password=${password}`);
      if (response.data.access === true) {
        dispatch({ type: LOGIN_USER, payload: response.data.dataValues.id });
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};


export const UserLogin =  (usuario) => {
  return async (dispatch) => {
    try {
      await axios.post(`http://las-casitas-del-hornero-back.up.railway.app/users`, InfoUser);
    } catch (error) {
      alert(error.response.data.error);
    }
  }
};
