const InicialState = {
  Hotels: [],
  DetailHotel: {},
  FavHotels: [],
  idUser: 0,
};

export const rootReducer = (state = InicialState, actions) => {
  switch (actions.type) {
    case "ALL_HOTELS":
      return {
        ...state,
        Hotels: [...state.Hotels, actions.payload],
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

    case "LOGIN_USER":
      return {
        ...state,
        idUser: actions.payload,
      };

    case "SEARCH_HOTELS":
      return {
        ...state,
        Hotels: actions.payload,
      };

    default:
      return { ...state };
  }
};
