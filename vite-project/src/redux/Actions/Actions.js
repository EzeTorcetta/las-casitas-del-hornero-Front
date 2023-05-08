import { ALL_HOTELS } from '../Actions-index';

export const getHoteles = () => {
  return function (dispatch) {
    fetch('No se que poner aca')
      .then((response) => response.json())
      .then((hoteles) => {
        dispatch({
          type: ALL_HOTELS,
          payload: hoteles,
        });
      })
      .catch((err) => {
        alert('Los hoteles no se cargaron. ' + err);
      });
  };
};
