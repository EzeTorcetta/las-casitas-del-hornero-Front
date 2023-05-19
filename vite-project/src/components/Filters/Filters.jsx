//?---------------------------- IMPORTS --------------------------------
// import axios from "axios";
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionSelectFilter, PostFilters, getDepartment, getProvinces, getServices } from "../../redux/Actions/Actions";
//css
import style from "./Filters.module.css";

//?----------------- COMPONENTE FILTER ------------------------------------
const Filter = () => {
  const dispatch = useDispatch();
  const { Filters, Provinces, Services } = useSelector((state) => state);
  const [stateFilter, setFilter] = useState(Filters);
  const [province, setProvince] = useState('');
  const [department, setDepartment] = useState('');

  useEffect( ()=>{
    dispatch(getProvinces());
    dispatch(getServices());
  },[dispatch])
  
  const raiting = [1, 2, 3, 4, 5];

  const onChangeProvinces = async (event) => {
    console.log(event.target.value)
    setProvince(event.target.value)
    setFilter({
      ...stateFilter,
      provinces: event.target.value,
    });
    // dispatch(getDepartment(event.target.value))
  };

  // const onChangeDeparment = async (event) => {
  //   setDepartment(event.target)
  //   setFilter({
  //     ...stateFilter,
  //     department: event.target.value,
  //   });
  // };

  // const onChangeLocality = async (event) => {
  //   setFilter({
  //     ...stateFilter,
  //     locality: event.target.value,
  //   });
  // };

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
      department:"",
      locality:"",
      services: [],
      rating: "",
      order: "",
      page: 1,
    });

    dispatch(
      PostFilters({
        provinces: "",
        department:"",
        locality:"",
        services: [],
        rating: "",
        order: "",
        page: 1,
      })
    );

    dispatch(
      FuncionSelectFilter({
        provinces: "",
        department:"",
        locality:"",
        services: [],
        rating: "",
        order: "",
        page: 1,
      })
    );
  };

  return (
    <form name="filterForm" className={style.form}>
      <select onChange={onChangeProvinces} className={style.select}>
        <option hidden>Filtro Por Provincia</option>
        {Provinces.map((pro) => (
          <option value={pro.nombre} key={pro.id}>
            {pro.nombre}
          </option>
        ))}
      </select>


      {/* {province?(<>
        <select onChange={onChangeDeparment} className={style.select}>
        <option hidden>Filtro Por Departamento</option>
        {Department.map((pro) => (
          <option value={pro.nombre} key={pro.id}>
            {pro.nombre}
          </option>
        ))}
      </select>
      </>):(<></>)}

      {department?(<>
        <select onChange={onChangeLocality} className={style.select}>
        <option hidden>Filtro Por Localidad</option>
        {Provinces.map((pro) => (
          <option value={pro.nombre} key={pro.id}>
            {pro.nombre}
          </option>
        ))}
      </select>
      </>):(<></>)} */}




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
        <option value="VALORATIONDESC">Mayor Valoracion</option>
        <option value="VALORATIONASC">Menor Valoracion</option>
        <option value="NAMEASC">Nombre A-Z</option>
        <option value="NAMEDESC">Nombre Z-A</option>
        <option value="RATINGDESC">Mas Estrellas</option>
        <option value="RATINGASC">Menos Estrellas</option>
      </select>
      <table className={style.table}>
        {Services.map((Ser) => (
          <tbody key={Ser.id}>
            <tr className={style.tr}>
              <td className={style.td}>{Ser.name}</td>
              <td className={style.td}>
                <label className={style.checkbox_btn}>
                  <label htmlFor="checkbox"></label>
                  <input
                    onChange={() => onChangeServices(Ser.id)}
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
          AllHotels
        </button>
      </div>
    </form>
  );
};

export default Filter;
