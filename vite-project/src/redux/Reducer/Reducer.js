//?---------------------------- IMPORTS --------------------------------
import {
  GET_ALL_HOTELS,
  POST_FILTERS,
  TYPE_ROOM,
  SEARCH_HOTELS,
  ALL_FAVORITES_HOTELS,
  DETAIL_HOTEL,
  DETAIL_CLEAR_HOTEL,
  USER,
  GET_TROLLEY,
  DELETE_TROLLEY,
  DELETE_ALL_TROLLEY,
} from "../Actions";

//?----------------- REDUCER ------------------------------------
const InicialState = {
  Trolley: [],
  Hotels: {},
  User: { email: "", id: 0, rol: 0, username: "" },
  HotelsCopi: [],
  DetailHotel: {},
  FavHotels: [],
  idUser: {},
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

    case USER:
      console.log(actions.payload);
      return {
        ...state,
        User: actions.payload,
      };
    case GET_TROLLEY:
      return {
        ...state,
        Trolley: actions.payload,
      };

    case DELETE_TROLLEY:
      return {
        ...state,
        Trolley: actions.payload,
      };
    case DELETE_ALL_TROLLEY:
      return {
        ...state,
        Trolley: actions.payload,
      };

    default:
      return { ...state };
  }
};
