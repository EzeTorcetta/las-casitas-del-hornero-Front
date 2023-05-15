import {
  ALL_HOTELS,
  ALL_FAVORITES_HOTELS,
  // POST_FAVORITE_HOTEL,
  DELETE_FAVORITE_HOTEL,
  DETAIL_CLEAR_HOTEL,
  DETAIL_HOTEL,
  SEARCH_HOTELS,
  IDUSER,
  TYPE_ROOM,
  SELECT_PROVINCE,
  SELECT_RATING,
  ALL_SERVICE,
} from "../Actions-index/index";
import axios from "axios";

// export const FuncionSelectService = (Service) => {
// console.log(Service);
// return async (dispatch) => {
//   try {
//     const response = await axios.get(
//       `https://las-casitas-del-hornero-back.up.railway.app/hotels?services=${Service}`
//     );
//     dispatch({ type: ALL_SERVICE, payload: response.data });
//   } catch (error) {
//     alert(error.response.data.error);
//   }
// };
// };

// export const FuncionSelectProvince = (Province) => {
//   console.log(Province);
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `https://las-casitas-del-hornero-back.up.railway.app/hotels?provinces=${Province}`
//       );
//       dispatch({ type: SELECT_PROVINCE, payload: response.data });
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };
// };

// export const FuncionSelectranting = (filtros, paginas) => {
//   const URL = "https://las-casitas-del-hornero-back.up.railway.app/hotels";
//   const { Provincias, servicios, ranting, order } = filtros;
//   console.log(order);

//   console.log(servicios);
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `${URL}?page=${paginas}&rating=${ranting}&provinces=${Provincias}&services=${servicios}&order=${order}`
//       );

//       // const response = await axios.get(
//       //   `${URL}?rating=${ranting}&&provinces=${Provincias}&&services=${servicios}`
//       // );
//       console.log(response.data);
//       dispatch({ type: SELECT_RATING, payload: response.data });
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };
// };

export const FuncionSelectranting = (filtros, page) => {
  let URL = "https://las-casitas-del-hornero-back.up.railway.app/hotels";
  const { Provincias, servicios, rating, order } = filtros;
  console.log(filtros);
  console.log(Number(rating));

  /*https://las-casitas-del-hornero-back.up.railway.app/hotels?page=1&provinces=SAN%20JUAN*/

  URL = URL + `?page=${page}`;

  return async (dispatch) => {
    try {
      if (Number(rating) !== 0) {
        URL = URL + `&rating=${Number(rating)}`;
      }
      if (Provincias.length) {
        URL = URL + `&provinces=${encodeURIComponent(Provincias)}`;
      }
      if (order.length) {
        URL = URL + `&order=${order}`;
      }
      if (servicios.length) {
        servicios.map((ser) => (URL = URL + `&services=${encodeURIComponent(ser)}`));
      }
      console.log(URL);

      const response = await axios.get(URL);

      dispatch({ type: SELECT_RATING, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionAllHotel = (page = 1) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://las-casitas-del-hornero-back.up.railway.app/hotels?page=${page}`);
      console.log(response.data);
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
      const response = await axios.get(`https://las-casitas-del-hornero-back.up.railway.app/roomTypes/${idHotel}`);
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
      const response = await axios.get(`https://las-casitas-del-hornero-back.up.railway.app/hotels?name=${nameHotel}`);
      console.log(response.data);
      dispatch({ type: SEARCH_HOTELS, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionAllFavoritesHotel = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://las-casitas-del-hornero-back.up.railway.app/favorites/${idUser}`);
      dispatch({ type: ALL_FAVORITES_HOTELS, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const PostFavoriteHotel = (idUser, idHotel) => {
  console.log(idUser, idHotel);
  return async () => {
    try {
      const response = await axios.post(`http://las-casitas-del-hornero-back.up.railway.app/favorites/${idUser}/${idHotel}`);
      alert(response.data);
      console.log(idUser, idHotel, response);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
};

export const DeleteFavoriteHotel = (idUser, idHotel) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`http://las-casitas-del-hornero-back.up.railway.app/favorites/${idUser}/${idHotel}`);
      dispatch({ type: DELETE_FAVORITE_HOTEL, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionDetailHotel = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://las-casitas-del-hornero-back.up.railway.app/hotels/${id}`);
      dispatch({ type: DETAIL_HOTEL, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const FuncionClearDetail = () => {
  return { type: DETAIL_CLEAR_HOTEL }; // cuando se desmonte el detail , el objeto se vacia.
};

export const FuncionIDUser = (idUser) => {
  return { type: IDUSER, payload: idUser }; // cuando se desmonte el detail , el objeto se vacia.
};
