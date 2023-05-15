// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FuncionSelectFilter, PostFilters } from "../../redux/Actions/Actions";
import style from "./Filtros.module.css";
import { useState } from "react";

const Filtro = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const { Filtros } = useSelector((state) => state);
  const [stateFiltro, setFiltro] = useState(Filtros);

  const Provincias = [
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

  const Servicios = [
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

  const onChange = async (event) => {
    setFiltro({
      ...stateFiltro,
      Provincias: event.target.value,
    });
  };

  const onChange1 = async (event) => {
    setFiltro({ ...stateFiltro, rating: event.target.value });
  };

  const onChange3 = (ser) => {
    if (stateFiltro.servicios.includes(ser)) {
      // Remove the service from the filter
      setFiltro({
        ...stateFiltro,
        servicios: stateFiltro.servicios.filter((s) => s !== ser),
      });
    } else {
      // Add the service to the filter
      setFiltro({
        ...stateFiltro,
        servicios: [...stateFiltro.servicios, ser],
      });
    }
  };

  const onChangeOrder = (event) => {
    setFiltro({ ...stateFiltro, order: event.target.value });
  };

  // FILTRAR
  const FuncionFiltrar = (event) => {
    event.preventDefault();
    dispatch(PostFilters(stateFiltro)); // Para modificar el estado global
    dispatch(FuncionSelectFilter(stateFiltro, 1)); // Para el get a la DB
  };

  // CLEAN FILTROS
  const FuncionOnclick = (event) => {
    event.preventDefault();
    document.forms["jorge"].reset();
    setFiltro({
      Provincias: "",
      servicios: [],
      rating: "",
      order: "",
      page: 1,
    });

    dispatch(
      PostFilters({
        Provincias: "",
        servicios: [],
        rating: "",
        order: "",
        page: 1,
      })
    );

    dispatch(
      FuncionSelectFilter({
        Provincias: "",
        servicios: [],
        rating: "",
        order: "",
        page: 1,
      })
    );
  };

  return (
    <form name="jorge">
      <select onChange={onChange} className={style.select}>
        <option hidden>Filtro Por Provincia</option>
        {Provincias.map((pro, index) => (
          <option value={pro} key={index}>
            {pro}
          </option>
        ))}
      </select>
      <select onChange={onChange1} className={style.select}>
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
        <option value="RATINGASC">Estrellas mayor</option>
        <option value="RATINGDESC">Estrellas menor</option>
      </select>
      <table className={style.table}>
        {Servicios.map((Ser, index) => (
          <tbody key={index}>
            <tr className={style.tr}>
              <td className={style.td}>{Ser}</td>
              <td className={style.td}>
                <label className={style.checkbox_btn}>
                  <label htmlFor="checkbox"></label>
                  <input onChange={() => onChange3(Ser)} value={Ser} type="checkbox" id="checkbox"></input>
                  <span className={style.checkmark}></span>
                </label>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <button onClick={FuncionFiltrar} className={style.button}>
        Filtrar
      </button>
      <button onClick={FuncionOnclick} className={style.button}>
        AllHotels
      </button>
    </form>
  );
};

export default Filtro;
