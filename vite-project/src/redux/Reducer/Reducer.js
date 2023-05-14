const InicialState = {
  Hotels: [],
  HotelsCopi: [],
  DetailHotel: {},
  FavHotels: [],
  idUser: {},
  usuarios: [
    { username: "jose123", correo: "jose@henry.com", contraseña: "abc123" },
    { username: "martin123", correo: "martin@henry.com", contraseña: "fgh456" },
  ],
  TypeRoom: [],
};

export const rootReducer = (state = InicialState, actions) => {
  switch (actions.type) {
    case "ALL_HOTELS":
      return {
        ...state,
        Hotels: actions.payload,
        HotelsCopi: actions.payload,
      };

    case "DETAIL_HOTEL":
      return {
        ...state,
        DetailHotel: actions.payload,
      };

    case "DETAIL_CLEAR_HOTEL":
      return {
        ...state,
        DetailHotel: {},
      };

    case "ALL_FAVORITES_HOTELS":
      return {
        ...state,
        FavHotels: actions.payload,
      };

    // case "LOGIN_USER":
    //   return {
    //     ...state,
    //     idUser: actions.payload,
    //   };

    // case "USER_LOGIN":
    //   return {
    //     ...state,
    //     idUser: actions.payload,
    //   };

    case "SEARCH_HOTELS":
      return {
        ...state,
        Hotels: actions.payload,
      };
    case "TYPE_ROOM":
      return {
        ...state,
        TypeRoom: actions.payload,
      };

    case "SELECT_PROVINCE":
      return {
        ...state,
        Hotels: actions.payload,
      };

    case "SELECT_RATING":
      return {
        ...state,
        Hotels: [...state.HotelsCopi, ...actions.payload],
      };

    case "ALL_SERVICE":
      return {
        ...state,
        Hotels: actions.payload,
      };

    default:
      return { ...state };
  }
};
