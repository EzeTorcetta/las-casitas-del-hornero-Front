//?---------------------------- IMPORTS --------------------------------
import {
  GET_ALL_HOTELS,
  POST_FILTERS,
  TYPE_ROOM,
  SEARCH_HOTELS,
  ALL_FAVORITES_HOTELS,
  DELETE_FAVORITE_HOTEL,
  DETAIL_HOTEL,
  DETAIL_CLEAR_HOTEL,
  IDUSER,
  USER,
} from "../Actions";
import axios from "axios";
import swal from "sweetalert";

//?----------------- ACTIONS ------------------------------------
//* ----------------- GET ALL HOTELS ------------------------------------
const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";
export const FuncionSelectFilter = (filters) => {
  let URL = `${URL_BASE}/hotels`;
  const { provinces, services, rating, order, page } = filters;

  URL = URL + `?page=${page}`;
  return async (dispatch) => {
    try {
      if (Number(rating) !== 0) {
        URL = URL + `&rating=${Number(rating)}`;
      }
      if (provinces.length) {
        URL = URL + `&provinces=${encodeURIComponent(provinces)}`;
      }
      if (order.length) {
        URL = URL + `&order=${order}`;
      }
      if (services.length) {
        services.map(
          (ser) => (URL = URL + `&services=${encodeURIComponent(ser)}`)
        );
      }

      const response = await axios.get(URL);

      /*  swal({
        text: "Card eliminada con exito!!.",
        icon: "success",
        buttons: "Aceptar",
      });
    } catch (error) {
      swal({
        title: "Alert",
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });*/

      dispatch({ type: GET_ALL_HOTELS, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- POST FILTERS ------------------------------------
export const PostFilters = (filters) => {
  return async (dispatch) => {
    dispatch({ type: POST_FILTERS, payload: filters });
  };
};

// export const FuncionAllHotel = (page = 1) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`https://las-casitas-del-hornero-back.up.railway.app/hotels?page=${page}`);
//       console.log(response.data);
//       dispatch({ type: ALL_HOTELS, payload: response.data });
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };
// };

//* ----------------- TYPE ROOMS ------------------------------------
export const FuncionTypeRoomTypes = (idHotel) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/roomTypes/${idHotel}`);
      dispatch({ type: TYPE_ROOM, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- SEARCH ------------------------------------
export const FuncionSearch = (nameHotel) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/hotels?name=${nameHotel}`);
      dispatch({ type: SEARCH_HOTELS, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- ALL FAVORITES HOTELS ------------------------------------
export const FuncionAllFavoritesHotel = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/favorites/${idUser}`);
      dispatch({ type: ALL_FAVORITES_HOTELS, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- POST FAVORITE HOTEL ------------------------------------
export const PostFavoriteHotel = (idUser, idHotel) => {
  return async () => {
    try {
      const response = await axios.post(
        `${URL_BASE}/favorites/${idUser}/${idHotel}`
      );
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- DELETE FAVORITE HOTEL ------------------------------------
export const DeleteFavoriteHotel = (idUser, idHotel) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${URL_BASE}/favorites/${idUser}/${idHotel}`
      );
      dispatch({ type: DELETE_FAVORITE_HOTEL, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- DETAIL HOTELS ------------------------------------
export const FuncionDetailHotel = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/hotels/${id}`);
      dispatch({ type: DETAIL_HOTEL, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- DETAIL HOTELS ------------------------------------
export const FuncionClearDetail = () => {
  return { type: DETAIL_CLEAR_HOTEL }; // cuando se desmonte el detail , el objeto se vacia.
};

//* ----------------- ID USER ------------------------------------
export const FuncionIDUser = (idUser) => {
  return { type: IDUSER, payload: idUser }; // cuando se desmonte el detail , el objeto se vacia.
};

export const GetUser = (User) => {
  console.log(User);
  return {
    type: USER,
    payload: User,
  };
};
