import { useState } from "react";
import SeleccionHuespedes from "./SeleccionHuesped";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datePicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import styles from "./Search.module.css";
registerLocale("es", es);

const Search = () => {
  const [state, setState] = useState(new Date("2023", "05", "09"));

  const onChange = (state) => {
    setState(state);
  };

  const FuncionAlert = (state) => {
    alert(state);
  };

  return (
    <div className={styles.div}>
      <input
        type="text"
        className={styles.input}
        placeholder="Buscar una Provincia"
      />
      <DatePicker
        selected={state}
        onChange={onChange}
        locale="es"
        className="pickers"
        dateFormat="dd 'de' MMMM 'de' yyyy"
      />

      <SeleccionHuespedes />

      <button onClick={() => FuncionAlert(state)}>Buscar</button>
    </div>
  );
};

export default Search;
