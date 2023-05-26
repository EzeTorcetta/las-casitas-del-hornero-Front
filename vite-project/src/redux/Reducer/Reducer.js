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
  USER_LOGOUT,
  GET_ALL_PROVINCES,
  GET_LOCALITY,
  GET_DEPARTMENT,
  SERVICES,
  ALL_PARTNER_HOTELS,
  NEW_REVIEW,
  GET_BOOKYNG,
  GET_USERS,
  CHANGE_ROL,
  PUT_AMOUNT_TROLLEY,
  UP_DATE_TROLLEY,
  ID_HOTEL_FORM,
  GET_CURRENCY_BASE,
  GET_CURRENCY_RATE,
  SET_THEME,
} from "../Actions";

//?----------------- REDUCER ------------------------------------
const InicialState = {
  Trolley: [],
  ObjetoTrolley: {},
  Hotels: {},
  User: { email: "", id: 0, rol: 0, username: "" },
  HotelsCopi: [],
  DetailHotel: {},
  FavHotels: [],
  idUser: {},
  TypeRoom: [],
  Provinces: [],
  Department: [],
  Locality: [],
  Services: [],
  PartnerHotels: [],
  Booking: [],
  Users: [],
  Filters: {
    provinces: "",
    department: "",
    locality: "",
    services: [],
    rating: "",
    order: "",
    page: 1,
    name: "",
  },
  Reviews: 0,
  idHotelForm: "",
  currencyExchange: {},
  theme: 'light',
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
    case NEW_REVIEW:
      return {
        ...state,
        Reviews: +1,
      };
    case USER:
      return {
        ...state,
        User: actions.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        User: { email: "", id: 0, rol: 0, username: "" },
      };
    case GET_TROLLEY:
      return {
        ...state,
        Trolley: actions.payload,
      };
    case DELETE_TROLLEY:
      return {
        ...state,
        Trolley: state.Trolley.filter(
          (tro) => tro.id !== actions.payload
        ),
      };
    case DELETE_ALL_TROLLEY:
      return {
        ...state,
        Trolley: actions.payload,
      };
    case PUT_AMOUNT_TROLLEY:
      return {
        ...state,
        ObjetoTrolley: actions.payload,
      };

    case GET_ALL_PROVINCES:
      return {
        ...state,
        Provinces: actions.payload,
      };
    case GET_DEPARTMENT:
      return {
        ...state,
        Department: actions.payload,
      };
    case GET_LOCALITY:
      return {
        ...state,
        Locality: actions.payload,
      };
    case SERVICES:
      return {
        ...state,
        Services: actions.payload,
      };
    case ALL_PARTNER_HOTELS:
      return {
        ...state,
        PartnerHotels: actions.payload,
      };
    case GET_BOOKYNG:
      return {
        ...state,
        Booking: actions.payload,
      };
    case GET_USERS:
      return {
        ...state,
        Users: actions.payload,
      };
    case CHANGE_ROL:
      return {
        ...state,
      };
    case UP_DATE_TROLLEY:
      return {
        ...state,
        Trolley: actions.payload,
      };
    case ID_HOTEL_FORM:
      return {
        ...state,
        idHotelForm: actions.payload,
      };
    case GET_CURRENCY_BASE:
      return {
        ...state,
        currencyExchange: {
          ...state.currencyExchange,
          base: actions.payload,
        },
      };
    case GET_CURRENCY_RATE:
      return {
        ...state,
        currencyExchange: {
          ...state.currencyExchange,
          rate: actions.payload,
        },
      };
    case SET_THEME:
      return {
        ...state,
        theme: actions.payload,
      }
    default:
      return { ...state };
  }
};
