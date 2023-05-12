import { useState } from "react";
import SeleccionHuespedes from "./SeleccionHuesped";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datePicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import styles from "./Search.module.css";
import { useDispatch } from "react-redux";
import MyCalendar from "./Calendario";
import { FuncionSearch } from "../../redux/Actions/Actions";
registerLocale("es", es);

const Search = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(new Date("2023", "05", "09"));
  const [SearchAll, setSearchAll] = useState({
    InputText: "",
    Calendario: "",
    Huespedes: 0,
    Habitaciones: 0,
  });

  // Podria crear un estado que sea un objeto y guarde la informacion del calendario , huspedes y lo que hay en el input
  // Que al hacer onClick en buscar envie eso en un dispatch y me busque a los hoteles disponibles.

  const onChange = (state) => {
    setState(state);
    setSearchAll({ ...SearchAll, Calendario: state });
  };

  const onChangeText = (event) => {
    setSearchAll({ ...SearchAll, InputText: event.target.value });
  };

  const FuncionSearchAll = () => {
    // Aca envio el estado SearchAll y se lo mando a un dispatch , para luego enviar esa infor por body a una ruta.
    dispatch(FuncionSearch(SearchAll)); // al hacer click en el boton busca en la base de datos.
  };

  return (
    <div className={styles.div}>
      <input
        type="text"
        name="text"
        placeholder="Buscar una Provincia"
        onChange={onChangeText}
      />

      <DatePicker
        selected={state}
        onChange={onChange}
        locale="es"
        className="pickers"
        dateFormat="dd 'de' MMMM 'de' yyyy"
      />

      <SeleccionHuespedes setSearchAll={setSearchAll} SearchAll={SearchAll} />

      <button className={styles.fancy} onClick={FuncionSearchAll}>
        Buscar
      </button>
    </div>
  );
};

export default Search;
