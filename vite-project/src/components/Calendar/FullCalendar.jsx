import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
registerLocale("es", es);
import { useState } from "react";
import style from "./FullCalendar.module.css";
import { useDispatch } from "react-redux";
import { GetTrolley } from "../../redux/Actions/Actions";

function Calendario({ id }) {
  //*---------------Dispatch:
  const dispatch = useDispatch();
  //*--------------------------------Fechas State:
  const [stateCheckIn, setStateCheckIn] = useState(new Date());
  const [stateCheckInString, setStateCheckInString] = useState("");
  const [stateCheckOut, setStateCheckOut] = useState(new Date());
  const [stateCheckOutString, setStateCheckOutString] = useState("");
  //*--------------------------------------------------------------------*//

  const SubirDisponibilidad = (idUser) => {
    console.log(idUser, stateCheckInString, stateCheckOutString);
    dispatch(GetTrolley(idUser, stateCheckInString, stateCheckOutString));
  };

  //*---------------------------------------Calendarios Funciones :

  //?-----------------------------------------------CheckIn:

  const onChangeCheckIn = (state) => {
    const checkInDate = new Date(state);
    const checkOutDate = new Date(stateCheckOut);
    if (checkInDate.getTime() <= checkOutDate.getTime()) {
      const array = state.toString().split(" ");
      const fecha = [];
      fecha.push(array[3]);
      switch (array[1]) {
        case "Jan":
          fecha.push("1".padStart(2, "0"));
          break;
        case "Feb":
          fecha.push("2".padStart(2, "0"));
          break;
        case "Mar":
          fecha.push("3".padStart(2, "0"));
          break;
        case "Apr":
          fecha.push("4".padStart(2, "0"));
          break;
        case "May":
          fecha.push("5".padStart(2, "0"));
          break;
        case "Jun":
          fecha.push("6".padStart(2, "0"));
          break;
        case "Jul":
          fecha.push("7".padStart(2, "0"));
          break;
        case "Aug":
          fecha.push("8".padStart(2, "0"));
          break;
        case "Sep":
          fecha.push("9".padStart(2, "0"));
          break;
        case "Oct":
          fecha.push("10");
          break;
        case "Nov":
          fecha.push("11");
          break;
        case "Dec":
          fecha.push("12");
          break;
        default:
          fecha.push("9".padStart(2, "0"));
          break;
      }
      fecha.push(array[2]);
      let stateModificado = fecha.join("-");
      setStateCheckInString(stateModificado);
      setStateCheckIn(state);
      //*------------------------------------Set:
      //setearia algo apra cambiar el carrito
    } else {
      swal({
        text: "no se puede reservar una fecha mayor que el checkOut",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  //?-----------------------------------------CheckOut :
  const onChangeCheckOut = (state) => {
    const checkOutDate = new Date(state);
    const checkInDate = new Date(stateCheckIn);
    if (checkOutDate.getTime() >= checkInDate.getTime()) {
      const array = state.toString().split(" ");
      const fecha = [];
      fecha.push(array[3]);
      switch (array[1]) {
        case "Jan":
          fecha.push("1".padStart(2, "0"));
          break;
        case "Feb":
          fecha.push("2".padStart(2, "0"));
          break;
        case "Mar":
          fecha.push("3".padStart(2, "0"));
          break;
        case "Apr":
          fecha.push("4".padStart(2, "0"));
          break;
        case "May":
          fecha.push("5".padStart(2, "0"));
          break;
        case "Jun":
          fecha.push("6".padStart(2, "0"));
          break;
        case "Jul":
          fecha.push("7".padStart(2, "0"));
          break;
        case "Aug":
          fecha.push("8".padStart(2, "0"));
          break;
        case "Sep":
          fecha.push("9".padStart(2, "0"));
          break;
        case "Oct":
          fecha.push("10");
          break;
        case "Nov":
          fecha.push("11");
          break;
        case "Dec":
          fecha.push("12");
          break;
        default:
          fecha.push("9".padStart(2, "0"));
          break;
      }
      fecha.push(array[2]);
      let stateModificado = fecha.join("-");
      setStateCheckOutString(stateModificado);
      setStateCheckOut(state);
      //*------------------------------------Set:
      //
    } else {
      swal({
        text: "La Fecha CheckOut No debe ser menor al CheckIn",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  //------------------------------------------------------//
  return (
    <>
      <div className={style.divTheTrolley}>
        <div className={style.Checks}>
          <label>CheckIn :</label>
          <DatePicker
            selected={stateCheckIn}
            onChange={onChangeCheckIn}
            locale="es"
            className={style.pickers}
            dateFormat="dd 'de' MMMM 'de' yyyy"
          />
          <label>CheckOut :</label>
          <DatePicker
            selected={stateCheckOut}
            onChange={onChangeCheckOut}
            locale="es"
            className={style.pickers}
            dateFormat="dd 'de' MMMM 'de' yyyy"
          />
          <button onClick={() => SubirDisponibilidad(id)}>
            Ver Disponibilidad
          </button>
        </div>
      </div>
    </>
  );
}

export default Calendario;
