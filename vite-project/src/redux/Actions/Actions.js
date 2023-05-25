//?---------------------------- IMPORTS --------------------------------
import {
  GET_ALL_HOTELS,
  GET_ALL_PROVINCES,
  GET_LOCALITY,
  GET_DEPARTMENT,
  POST_FILTERS,
  TYPE_ROOM,
  SEARCH_HOTELS,
  ALL_FAVORITES_HOTELS,
  DETAIL_HOTEL,
  DETAIL_CLEAR_HOTEL,
  USER,
  GET_TROLLEY,
  DELETE_ALL_TROLLEY,
  DELETE_TROLLEY,
  USER_LOGOUT,
  SERVICES,
  ALL_PARTNER_HOTELS,
  NEW_REVIEW,
  GET_BOOKYNG,
  GET_USERS,
  CHANGE_ROL,
  UP_DATE_TROLLEY,
  PUT_AMOUNT_TROLLEY,
  ID_HOTEL_FORM,
} from "../Actions";
import axios from "axios";
import swal from "sweetalert";

//?----------------- ACTIONS ------------------------------------

//* ----------------- GET ALL HOTELS ------------------------------------
const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";
export const FuncionSelectFilter = (filters) => {
  let URL = `${URL_BASE}/hotels`;
  const {
    provinces,
    services,
    rating,
    order,
    page,
    department,
    locality,
    name,
    checkIn,
    checkOut,
  } = filters;

  URL = URL + `?page=${page}`;
  return async (dispatch) => {
    try {
      if (Number(rating) !== 0) {
        URL = URL + `&rating=${Number(rating)}`;
      }
      if (provinces.length) {
        URL = URL + `&province=${encodeURIComponent(provinces)}`;
      }
      if (department.length) {
        URL = URL + `&department=${encodeURIComponent(department)}`;
      }
      if (locality.length) {
        URL = URL + `&locality=${encodeURIComponent(locality)}`;
      }
      if (order.length) {
        URL = URL + `&order=${order}`;
      }
      if (name.length) {
        URL = URL + `&name=${name}`;
      }

      //*----------------------------------------Fechas:

      //http://localhost:3001/hotels?page=1&services=Pileta&checkIn=2023-05-27&checkOut=2023-05-28

      if (checkOut.length) {
        URL = URL + `&checkIn=${checkIn}`;
      }
      if (checkIn.length) {
        URL = URL + `&checkOut=${checkOut}`;
      }

      //*------------------------------------------------------*//

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
//
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
export const FuncionSearch = (nameHotel, page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/hotels?page=${page}&name=${nameHotel}`
      );
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

//*------------------------------TROLLEY------------------------------*//
// trolley es ===> carrito manga de giles!!😐

export const GetTrolley = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/cart/${idUser}`);

      dispatch({ type: GET_TROLLEY, payload: response.data });
    } catch (error) {
      // swal({
      //   text: error.response.data.error,
      //   icon: "warning",
      //   buttons: "Aceptar",
      // });
    }
  };
};

//*-----------Delete del carrito (todo lo que hay en el carrito).

export const DeleteAllTrolley = (idUser) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL_BASE}/cart/${idUser}`);

      dispatch({ type: DELETE_ALL_TROLLEY, payload: [] });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*-----------Delete del carrito (un solo carrito).
// cartRouter.delete("/:id_user/:id_roomtype", deleteCartHandler);

export const DeleteTrolley = (idUser, idTypeRoom) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL_BASE}/cart/${idUser}/${idTypeRoom}`);

      dispatch({ type: DELETE_TROLLEY, payload: idTypeRoom });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

export const putAmountTrolley = (value, idUser, id_Roomtype) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${URL_BASE}/cart/${idUser}/${id_Roomtype}?putAmount=${value}`
      );
      dispatch({
        type: PUT_AMOUNT_TROLLEY,
        payload: { id: id_Roomtype, amount: response.data },
      });
      console.log(response.data);
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*---------------------Post del Trolley.

export const UpdateTrolley = (ArrayNuevoTrolley) => {
  return { type: UP_DATE_TROLLEY, payload: ArrayNuevoTrolley };
};
//* ----------------- DETAIL HOTELS ------------------------------------
export const FuncionClearDetail = () => {
  return { type: DETAIL_CLEAR_HOTEL }; // cuando se desmonte el detail , el objeto se vacia.
};

//* ----------------- ID USER ------------------------------------

export const GetUser = (User) => {
  return {
    type: USER,
    payload: User,
  };
};

//* ----------------------- LOG OUT -----------------------------

export const LogOut = () => {
  return { type: USER_LOGOUT };
};

//* ----------------------- GET PROVINCES -----------------------------

export const getProvinces = () => {
  return async function (dispatch) {
    const response = await axios.get(`${URL_BASE}/locations`);
    dispatch({ type: GET_ALL_PROVINCES, payload: response.data });
  };
};

//* ----------------------- GET DEPARTMENT -----------------------------

export const getDepartment = (id_province) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${URL_BASE}/locations?id_province=${id_province}`
    );
    dispatch({ type: GET_DEPARTMENT, payload: response.data });
  };
};

//* ----------------------- GET LOCALITY -----------------------------

export const getLocality = (id_departament) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${URL_BASE}/locations?id_department=${id_departament}`
    );
    dispatch({ type: GET_LOCALITY, payload: response.data });
  };
};

//* ----------------------- GET SERVICES -----------------------------

export const getServices = () => {
  return async function (dispatch) {
    const response = await axios.get(`${URL_BASE}/services`);
    dispatch({ type: SERVICES, payload: response.data });
  };
};

//* ----------------- ALL PARTNER HOTELS ------------------------------------
export const FuncionAllPartnerHotel = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/hotels?id_user=${idUser}`);
      dispatch({ type: ALL_PARTNER_HOTELS, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- ALL NEW REVIEW ------------------------------------
export const NewReview = () => {
  return (dispatch) => {
    dispatch({ type: NEW_REVIEW });
  };
};

//* ----------------- GET BOOKYNG ------------------------------------
export const getBooking = (id, rol) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${URL_BASE}/booking?id_user=${id}&rol=${rol}`
    );
    dispatch({ type: GET_BOOKYNG, payload: response.data });
  };
};

//* ----------------- GET USERS ------------------------------------
export const getUsers = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`${URL_BASE}/user/${id}`);
    dispatch({ type: GET_USERS, payload: response.data });
  };
};

//* ----------------- CHANGE ROL ------------------------------------
export const changeRol = (data) => {
  return async function (dispatch) {
    const response = await axios.put(`${URL_BASE}/user`, data);
    dispatch({ type: CHANGE_ROL, payload: response.data });
  };
};

//* ----------------- ID HOTEL FORM ------------------------------------
export const idHotelForm = (id) => {
  return async function (dispatch) {
    dispatch({ type: ID_HOTEL_FORM, payload: id });
  };
};
