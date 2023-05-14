import {
  ALL_HOTELS,
  ALL_FAVORITES_HOTELS,
  DETAIL_CLEAR_HOTEL,
  DETAIL_HOTEL,
  // LOGIN_USER,
  SEARCH_HOTELS,
  // USER_LOGIN,
  TYPE_ROOM,
  SELECT_PROVINCE,
  SELECT_RATING,
  ALL_SERVICE,
} from "../Actions-index/index";
import axios from "axios";

// usuarios: /users
// hoteles: /hotels
// tipos de habitaciones: /roomTypes
// servicios: /services
// favoritos: /favorites

export const FuncionSelectService = (Service) => {
  console.log(Service);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://las-casitas-del-hornero-back.up.railway.app/hotels?services=${Service}`
      );
      dispatch({ type: ALL_SERVICE, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionSelectProvince = (Province) => {
  console.log(Province);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://las-casitas-del-hornero-back.up.railway.app/hotels?provinces=${Province}`
      );
      dispatch({ type: SELECT_PROVINCE, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionSelectranting = (number) => {
  console.log(number);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://las-casitas-del-hornero-back.up.railway.app/hotels?rating=${number}`
      );
      dispatch({ type: SELECT_RATING, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionAllHotel = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://las-casitas-del-hornero-back.up.railway.app/hotels"
      );
      dispatch({ type: ALL_HOTELS, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

// export const FuncionSelectService = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         "https://las-casitas-del-hornero-back.up.railway.app/hotels"
//       );
//       dispatch({ type: SELECT_SERVICE, payload: response.data });
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };
// };

export const FuncionTypeRoomTypes = (idHotel) => {
  console.log(idHotel);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://las-casitas-del-hornero-back.up.railway.app/roomTypes/${idHotel}`
      );
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
      const response = await axios.get(
        `https://las-casitas-del-hornero-back.up.railway.app/hotels?name=${nameHotel}`
      );
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
      const response = await axios.get(
        `http://las-casitas-del-hornero-back.up.railway.app/favorites?id=${idHotel}&idUser=${idUser}`
      );
      dispatch({ type: ALL_FAVORITES_HOTELS, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionDetailHotel = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://las-casitas-del-hornero-back.up.railway.app/hotels/${id}`
      );
      dispatch({ type: DETAIL_HOTEL, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionClearDetail = () => {
  return { type: DETAIL_CLEAR_HOTEL }; // cuando se desmonte el detail , el objeto se vacia.
};

// export const Login = (usuarioRegistro) => {
//   console.log(usuarioRegistro);
//   return async function (dispatch) {
//     try {
//       const response = await axios.post(
//         `https://las-casitas-del-hornero-back.up.railway.app/user`,
//         usuarioRegistro
//       );
//       console.log(response.data);
//       dispatch({ type: USER_LOGIN, payload: response.data.id });
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };
// };

// export const UserLogin = (usuario) => {
//   console.log(usuario);
//   return async () => {
//     try {
//       const response = await axios.post(
//         `https://las-casitas-del-hornero-back.up.railway.app/user`,
//         usuario
//       );
//       console.log(response.data);
//       dispatch({ type: LOGIN_USER, payload: response.data.id });
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };
// };
