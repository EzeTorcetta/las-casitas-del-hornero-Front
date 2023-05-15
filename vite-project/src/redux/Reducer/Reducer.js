import {
  ALL_HOTELS,
  ALL_SERVICE,
  ALL_FAVORITES_HOTELS,
  POST_FILTERS,
  DELETE_FAVORITE_HOTEL,
  DETAIL_HOTEL,
  DETAIL_CLEAR_HOTEL,
  IDUSER,
  SEARCH_HOTELS,
  TYPE_ROOM,
  SELECT_PROVINCE,
  SELECT_RATING,
} from "../Actions-index/index";

const InicialState = {
  Hotels: {},
  HotelsCopi: [],
  DetailHotel: {},
  FavHotels: [],
  idUser: 0,
  TypeRoom: [],
  Filtros: {
    Provincias: "",
    servicios: [],
    rating: "",
    order: "",
    page: 1,
  },
};

export const rootReducer = (state = InicialState, actions) => {
  switch (actions.type) {
    case ALL_HOTELS:
      return {
        ...state,
        Hotels: actions.payload,
        HotelsCopi: actions.payload,
      };

    case POST_FILTERS:
      return {
        ...state,
        Filtros: actions.payload,
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

    case ALL_FAVORITES_HOTELS:
      return {
        ...state,
        FavHotels: actions.payload,
      };

    case IDUSER:
      return {
        ...state,
        idUser: actions.payload,
      };

    case SEARCH_HOTELS:
      return {
        ...state,
        Hotels: actions.payload,
      };
    case TYPE_ROOM:
      return {
        ...state,
        TypeRoom: actions.payload,
      };

    case SELECT_PROVINCE:
      return {
        ...state,
        Hotels: actions.payload,
      };

    case SELECT_RATING:
      return {
        ...state,
        Hotels: actions.payload,
        HotelsCopi: actions.payload,
        // Hotels: { ...state.Hotels, allHotels: actions.payload },
      };

    case ALL_SERVICE:
      return {
        ...state,
        Hotels: { ...state.Hotels, allHotels: actions.payload },
        // Hotels: actions.payload,
      };

    default:
      return { ...state };
  }
};
