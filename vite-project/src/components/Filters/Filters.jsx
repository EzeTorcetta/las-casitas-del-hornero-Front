//?---------------------------- IMPORTS --------------------------------
// import axios from "axios";
//react
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
import "./Filters.css";

//?----------------- COMPONENTE FILTER ------------------------------------
const Filter = () => {
  const dispatch = useDispatch();
  const { Filters, Services, Provinces, Department, Locality } =
    useSelector((state) => state);
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

  const raiting = [1, 2, 3, 4, 5];

  const onChangeProvinces = async (event) => {
    setFilter({
      ...stateFilter,
      provinces: event.target.value,
    });
    setProvinceId(
      event.target.options[event.target.selectedIndex].getAttribute(
        "id"
      )
    );
  };

  const onChangeDeparment = async (event) => {
    setFilter({
      ...stateFilter,
      department: event.target.value,
    });
    setDepartmentId(
      event.target.options[event.target.selectedIndex].getAttribute(
        "id"
      )
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
      })
    );
  };

  return (
    <div>
      
      
    <form name="filterForm" className={ theme === 'light' ? 'filterform' : 'formdark'}>
    <input
        type="text"
        name="text"
        className={theme === 'light' ? 'inputSearch' : 'inputSearch-dark'}
        placeholder="Buscar un Hotel . . ."
        onChange={onChangeName}
      />
      <select onChange={onChangeProvinces} className={theme === 'light' ? 'select' : 'select-dark'}>
        <option hidden>Filtro Por Provincia</option>
        {Provinces.map((pro) => (
          <option id={pro.id} value={pro.nombre} key={pro.id}>
            {pro.nombre}
        </option>
        ))}
      </select>
      
      {provinceId.length ? (
        <>
          <select
            onChange={onChangeDeparment}
            className='select'>
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
          <select
            onChange={onChangeLocality}
            className='select'>
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
        <select onChange={onChangeRating} className={theme === 'light' ? 'select' : 'select-dark'}>
          <option hidden>Filtro Por raiting</option>
          {raiting.map((rant, index) => (
          <option value={rant} key={index}>
            {rant}
          </option>
        ))}
      </select>
      <select onChange={onChangeOrder} className={theme === 'light' ? 'select' : 'select-dark'}>
          <option hidden>Ordenar por</option>
          <option value="VALORATIONDESC">Mayor Valoracion</option>
          <option value="VALORATIONASC">Menor Valoracion</option>
          <option value="NAMEASC">Nombre A-Z</option>
          <option value="NAMEDESC">Nombre Z-A</option>
          <option value="RATINGDESC">Mas Estrellas</option>
          <option value="RATINGASC">Menos Estrellas</option>
        </select>
          <table className={theme === 'light' ? 'filter-table' : 'filter-table-dark'}>
            {Services.map((Ser) => (
              <tbody key={Ser.id}>
                <tr>
                  <td>{Ser.name}</td>
                  <td>
                    <label className='checkbox_btn'>
                      <label htmlFor="checkbox"></label>
                      <input
                        className='inputServices'
                        onChange={() => onChangeServices(Ser.name)}
                        value={Ser.name}
                        type="checkbox"
                        id="checkbox"></input>
                      <span className='checkmark'></span>
                    </label>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

      <div>
        <button onClick={FuncionFilter} className='filtrar-button'>
          Filtrar
        </button>
        <button onClick={FuncionCleanFilter} className='filtrar-button'>
          AllHotels
        </button>
      </div>
    </form>
    </div>
  );
};

export default Filter;
