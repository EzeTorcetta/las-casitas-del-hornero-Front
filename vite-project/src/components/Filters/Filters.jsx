//?---------------------------- IMPORTS --------------------------------
// import axios from "axios";
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionSelectFilter, PostFilters, getDepartment, getLocality, getProvinces, getServices } from "../../redux/Actions/Actions";
//css
import style from "./Filters.module.css";

//?----------------- COMPONENTE FILTER ------------------------------------
const Filter = () => {
  const dispatch = useDispatch();
  const { Filters, Services, Provinces, Department, Locality } = useSelector((state) => state);
  const [stateFilter, setFilter] = useState(Filters);
  const [provinceId, setProvinceId] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  useEffect( ()=>{
    dispatch(getProvinces());
    dispatch(getServices());
    if(provinceId.length)dispatch(getDepartment(provinceId))
    if(departmentId.length)dispatch(getLocality(departmentId))
  },[dispatch,provinceId,departmentId])
  
  const raiting = [1, 2, 3, 4, 5];

  
  const onChangeProvinces = async (event) => {
    setFilter({
      ...stateFilter,
      provinces: event.target.value,
    });
    setProvinceId(event.target.options[event.target.selectedIndex].getAttribute('id'))
  };

   const onChangeDeparment = async (event) => {
    setFilter({
      ...stateFilter,
      department: event.target.value,
    });
    setDepartmentId(event.target.options[event.target.selectedIndex].getAttribute('id'))
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
    setProvinceId('')
    setDepartmentId('')
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
          <option id={pro.id} value={pro.nombre} key={pro.id}>
            {pro.nombre}
          </option>
        ))}
      </select> 

      {provinceId.length?(<>
        <select onChange={onChangeDeparment} className={style.select}>
        <option hidden>Filtro Por Departamento</option>
        {Department.map((dep) => (
          <option id={dep.id} value={dep.nombre}>
            {dep.nombre}
          </option>
        ))}
      </select>
      </>):(<></>)}

      {departmentId.length?(<>
        <select onChange={onChangeLocality} className={style.select}>
        <option hidden>Filtro Por Localidad</option>
        {Locality.map((loc) => (
          <option id={loc.id} value={loc.nombre}>
            {loc.nombre}
          </option>
        ))}
      </select>
      </>):(<></>)}

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
