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

//?----------------- REDUCER ------------------------------------
const InicialState = {
  Hotels: {},
  User: { email: "", id: 0, rol: 0, username: "" },
  HotelsCopi: [],
  DetailHotel: {},
  FavHotels: [],
  idUser: 0,
  TypeRoom: [],
  Filters: {
    provinces: "",
    services: [],
    rating: "",
    order: "",
    page: 1,
  },
};

export const rootReducer = (state = InicialState, actions) => {
  switch (actions.type) {
    case GET_ALL_HOTELS:
      return {
        ...state,
        Hotels: actions.payload,
        HotelsCopi: actions.payload,
        // Hotels: { ...state.Hotels, allHotels: actions.payload },
      };

    case POST_FILTERS:
      return {
        ...state,
        Filters: actions.payload,
      };

    case TYPE_ROOM:
      return {
        ...state,
        TypeRoom: actions.payload,
      };

    //

    case SEARCH_HOTELS:
      return {
        ...state,
        Hotels: actions.payload,
      };

    case ALL_FAVORITES_HOTELS:
      return {
        ...state,
        FavHotels: actions.payload,
      };

    case DETAIL_HOTEL:
      return {
        ...state,
        DetailHotel: actions.payload,
      };

    case DETAIL_CLEAR_HOTEL:
      return {
        ...state,
        DetailHotel: {},
      };

    case IDUSER:
      return {
        ...state,
        idUser: actions.payload,
      };
    case USER:
      console.log(actions.payload);
      return {
        ...state,
        User: actions.payload,
      };
    default:
      return { ...state };
  }
};
