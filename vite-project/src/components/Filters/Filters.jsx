//?---------------------------- IMPORTS --------------------------------
// import axios from "axios";
//react
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionSelectFilter, PostFilters } from "../../redux/Actions/Actions";
//css
import style from "./Filters.module.css";

//?----------------- COMPONENTE FILTER ------------------------------------
const Filter = () => {
  const dispatch = useDispatch();
  const { Filters } = useSelector((state) => state);
  const [stateFilter, setFilter] = useState(Filters);

  const provinces = [
    "BUENOS AIRES",
    "CATAMARCA",
    "CHACO",
    "CHUBUT",
    "CORDOBA",
    "CORRIENTES",
    "ENTRE RIOS",
    "FORMOSA",
    "JUJUY",
    "LA PAMPA",
    "LA RIOJA",
    "MENDOZA",
    "MISIONES",
    "NEUQUEN",
    "RIO NEGRO",
    "SALTA",
    "SAN JUAN",
    "SAN LUIS",
    "SANTA CRUZ",
    "SANTA FE",
    "SANTIAGO DEL ESTERO",
    "TIERRA DEL FUEGO",
    "TUCUMAN",
  ];

  const raiting = [1, 2, 3, 4, 5];

  const services = [
    "Desayuno gratis",
    "Pileta",
    "Gimnasio",
    "Hotel frente a la playa",
    "Wi-Fi",
    "Estacionamiento",
    "Aire acondicionado",
    "Restaurante",
    "Mascotas permitidas",
    "Familias",
    "Bañera de hidromasaje",
    "Spa",
    "Acceso silla de ruedas",
    "Ascensor",
  ];

  const onChangeProvinces = async (event) => {
    setFilter({
      ...stateFilter,
      provinces: event.target.value,
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
    setFilter({
      provinces: "",
      services: [],
      rating: "",
      order: "",
      page: 1,
    });

    dispatch(
      PostFilters({
        provinces: "",
        services: [],
        rating: "",
        order: "",
        page: 1,
      })
    );

    dispatch(
      FuncionSelectFilter({
        provinces: "",
        services: [],
        rating: "",
        order: "",
        page: 1,
      })
    );
  };

  return (
    <form name="filterForm">
      <select onChange={onChangeProvinces} className={style.select}>
        <option hidden>Filtro Por Provincia</option>
        {provinces.map((pro, index) => (
          <option value={pro} key={index}>
            {pro}
          </option>
        ))}
      </select>
      <select onChange={onChangeRating} className={style.select}>
        <option hidden>Filtro Por raiting</option>
        {raiting.map((rant, index) => (
          <option value={rant} key={index}>
            {rant}
          </option>
        ))}
      </select>
      <select onChange={onChangeOrder} className={style.select}>
        <option hidden>Ordenar por</option>
        <option value="NAMEASC">Nombre A-Z</option>
        <option value="NAMEDESC">Nombre Z-A</option>
        <option value="RATINGDESC">Mas Estrellas</option>
        <option value="RATINGASC">Menos Estrellas</option>
      </select>
      <table className={style.table}>
        {services.map((Ser, index) => (
          <tbody key={index}>
            <tr className={style.tr}>
              <td className={style.td}>{Ser}</td>
              <td className={style.td}>
                <label className={style.checkbox_btn}>
                  <label htmlFor="checkbox"></label>
                  <input onChange={() => onChangeServices(Ser)} value={Ser} type="checkbox" id="checkbox"></input>
                  <span className={style.checkmark}></span>
                </label>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <button onClick={FuncionFilter} className={style.button}>
        Filtrar
      </button>
      <button onClick={FuncionCleanFilter} className={style.button}>
        AllHotels
      </button>
    </form>
  );
};

export default Filter;
