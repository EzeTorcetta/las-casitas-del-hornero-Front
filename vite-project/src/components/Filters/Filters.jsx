//?---------------------------- IMPORTS --------------------------------
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
registerLocale("es", es);
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FuncionSelectFilter,
  PostFilters,
  getDepartment,
  getLocality,
  getProvinces,
  getServices,
} from "../../redux/Actions/Actions";
//css
import style from "./Filters.module.css";

//?----------------- COMPONENTE FILTER ------------------------------------
const Filter = () => {
  const dispatch = useDispatch();
  const { Filters, Services, Provinces, Department, Locality } = useSelector(
    (state) => state
  );
  //*-----------------------------------------------------Fechas:
  const [stateCheckIn, setStateCheckIn] = useState(
    new Date("2023", "01", "01")
  );
  const [stateCheckInString, setStateCheckInString] = useState("");
  const [stateCheckOut, setStateCheckOut] = useState(
    new Date("2023", "05", "09")
  );
  const [stateCheckOutString, setStateCheckOutString] = useState("");

  //*-----------------------------------------------------------------*//

  const [stateFilter, setFilter] = useState(Filters);
  const [provinceId, setProvinceId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(getProvinces());
    dispatch(getServices());
    if (provinceId.length) dispatch(getDepartment(provinceId));
    if (departmentId.length) dispatch(getLocality(departmentId));
  }, [dispatch, provinceId, departmentId]);

  //*---------------------------------------Calendarios Funciones :

  //?-----------------------------------------------CheckIn:

  const onChangeCheckIn = (state) => {
    //validar que el checkIn no sea mayor que la fecha checkout antes de setear el estado:
    // validar que tanto el mes como el dia o año no sean mayores a los del checkOut

    const checkInDate = new Date(state);
    const checkOutDate = new Date(stateCheckOut);

    if (checkInDate.getTime() <= checkOutDate.getTime()) {
      const array = state.toString().split(" ");
      console.log(array);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      let acumulador = [];
      for (let i = 0; i <= 3; i++) {
        if (i === 3) {
          acumulador.unshift(array[i]);
        } else if (i === 2) {
          acumulador.unshift(array[i]);
        } else if (i === 1) {
          let numero = monthNames.indexOf(array[i]) + 1;

          if (numero >= 10) {
            acumulador.push(numero.toString());
          } else {
            acumulador.push("0" + numero.toString());
          }
        }
      }
      let stateModificado = acumulador.join("-");
      setStateCheckInString(stateModificado);
      setStateCheckIn(state);

      //*------------------------------------Set:
      setFilter({ ...stateFilter, checkIn: stateModificado });
    } else {
      alert("no se puede reservar una fecha mayor que el checkOut");
    }
  };
  console.log(stateCheckInString);

  //?-----------------------------------------CheckOut :
  const onChangeCheckOut = (state) => {
    const checkOutDate = new Date(state);
    const checkInDate = new Date(stateCheckIn);

    if (checkOutDate.getTime() >= checkInDate.getTime()) {
      const array = state.toString().split(" ");
      console.log(array);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      let acumulador = [];
      for (let i = 0; i <= 3; i++) {
        if (i === 3) {
          acumulador.unshift(array[i]);
        } else if (i === 2) {
          acumulador.unshift(array[i]);
        } else if (i === 1) {
          let numero = monthNames.indexOf(array[i]) + 1;

          if (numero >= 10) {
            acumulador.push(numero.toString());
          } else {
            acumulador.push("0" + numero.toString());
          }
        }
      }
      let stateModificado = acumulador.join("-");
      setStateCheckOutString(stateModificado);
      setStateCheckOut(state);
      //*------------------------------------Set:
      setFilter({ ...stateFilter, checkOut: stateModificado });
    } else {
      alert("La Fecha CheckOut No debe ser menor al CheckIn");
    }
  };
  console.log(stateCheckOutString);

  //------------------------------------------------------//

  const raiting = [1, 2, 3, 4, 5];
  const onChangeProvinces = async (event) => {
    setFilter({
      ...stateFilter,
      provinces: event.target.value,
    });
    setProvinceId(
      event.target.options[event.target.selectedIndex].getAttribute("id")
    );
  };

  const onChangeDeparment = async (event) => {
    setFilter({
      ...stateFilter,
      department: event.target.value,
    });
    setDepartmentId(
      event.target.options[event.target.selectedIndex].getAttribute("id")
    );
  };

  const onChangeLocality = async (event) => {
    setFilter({
      ...stateFilter,
      locality: event.target.value,
    });
  };

  const onChangeRating = async (event) => {
    setFilter({ ...stateFilter, rating: event.target.value });
  };

  const onChangeServices = (ser) => {
    if (stateFilter.services.includes(ser)) {
      // basicamente pregunte si ya lo incluye que lo filtre y lo saque sino
      // Remove the service from the filter
      setFilter({
        ...stateFilter,
        services: stateFilter.services.filter((s) => s !== ser),
      });
    } else {
      // sino que me permita setearlo
      // Add the service to the filter
      setFilter({
        ...stateFilter,
        services: [...stateFilter.services, ser],
      });
    }
  };

  const onChangeName = (event) => {
    setFilter({ ...stateFilter, name: event.target.value });
  };

  const onChangeOrder = (event) => {
    setFilter({ ...stateFilter, order: event.target.value });
  };

  // FILTRAR
  const FuncionFilter = (event) => {
    event.preventDefault();
    dispatch(PostFilters(stateFilter)); // Para modificar el estado global
    dispatch(FuncionSelectFilter(stateFilter, 1)); // Para el get a la DB
  };

  // CLEAN FILTROS
  const FuncionCleanFilter = (event) => {
    event.preventDefault();
    document.forms["filterForm"].reset();
    setProvinceId("");
    setDepartmentId("");
    setFilter({
      provinces: "",
      department: "",
      locality: "",
      services: [],
      rating: "",
      order: "",
      page: 1,
      name: "",
      checkIn: "",
      checkOut: "",
    });

    dispatch(
      PostFilters({
        provinces: "",
        department: "",
        locality: "",
        services: [],
        rating: "",
        order: "",
        page: 1,
        name: "",
        checkIn: "",
        checkOut: "",
      })
    );

    dispatch(
      FuncionSelectFilter({
        provinces: "",
        department: "",
        locality: "",
        services: [],
        rating: "",
        order: "",
        page: 1,
        name: "",
        checkIn: "",
        checkOut: "",
      })
    );
  };

  return (
    <div>


      <form name="filterForm" className={theme === 'light' ? style.form : style.formdark}>
        <input
          type="text"
          name="text"
          className={theme === 'light' ? style.inputSearch : style.inputSearch - dark}
          placeholder="Buscar un Hotel . . ."
          onChange={onChangeName}
        />
        <select onChange={onChangeProvinces} className={theme === 'light' ? style.select : style.select - dark}>
          <option hidden>Filtro Por Provincia</option>
          {Provinces.map((pro) => (
            <option id={pro.id} value={pro.nombre} key={pro.id}>
              {pro.nombre}
            </option>
          ))}
        </select>

        {provinceId.length ? (
          <>
            <select onChange={onChangeDeparment} className={style.select}>
              <option hidden>Filtro Por Departamento</option>
              {Department.map((dep) => (
                <option id={dep.id} value={dep.nombre}>
                  {dep.nombre}
                </option>
              ))}
            </select>
          </>
        ) : (
          <></>
        )}
        {departmentId.length ? (
          <>
            <select onChange={onChangeLocality} className={style.select}>
              <option hidden>Filtro Por Localidad</option>
              {Locality.map((loc) => (
                <option id={loc.id} value={loc.nombre}>
                  {loc.nombre}
                </option>
              ))}
            </select>
          </>
        ) : (
          <></>
        )}
        <select onChange={onChangeRating} className={theme === 'light' ? style.select : style.select - dark}>
          <option hidden>Filtro Por raiting</option>
          {raiting.map((rant, index) => (
            <option value={rant} key={index}>
              {rant}
            </option>
          ))}
        </select>
        <select onChange={onChangeOrder} className={style.select}>
          <option hidden>Ordenar por</option>
          <option value="VALORATIONDESC">Mayor Valoracion</option>
          <option value="VALORATIONASC">Menor Valoracion</option>
          <option value="NAMEASC">Nombre A-Z</option>
          <option value="NAMEDESC">Nombre Z-A</option>
          <option value="RATINGDESC">Mas Estrellas</option>
          <option value="RATINGASC">Menos Estrellas</option>
        </select>
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
        </div>

        <table className={style.table}>
          {Services.map((Ser) => (
            <tbody key={Ser.id}>
              <tr className={style.tr}>
                <td className={style.td}>{Ser.name}</td>
                <td className={style.td}>
                  <label className={style.checkbox_btn}>
                    <label htmlFor="checkbox"></label>
                    <input
                      className={style.inputServices}
                      onChange={() => onChangeServices(Ser.name)}
                      value={Ser.name}
                      type="checkbox"
                      id="checkbox"
                    ></input>
                    <span className={style.checkmark}></span>
                  </label>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div>
          <button onClick={FuncionFilter} className={style.button}>
            Filtrar
          </button>
          <button onClick={FuncionCleanFilter} className={style.button}>
            Limpiar filtros
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
