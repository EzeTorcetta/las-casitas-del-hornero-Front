import { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import validacion from "./Validations";
import style from "./FormularioHotel.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Maps from "../../MapForm/Map";
import { PedirLocalStorage } from "../../Index";
import { idHotelForm } from "../../../redux/Actions/Actions";

const initialLocation = {
  provinces: [],
  departments: [],
  localities: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PROVINCES":
      return {
        ...state,
        provinces: action.payload,
      };
    case "GET_DEPARTMENTS":
      return {
        ...state,
        departments: action.payload,
      };
    case "GET_LOCALITIES":
      return {
        ...state,
        localities: action.payload,
      };
    default:
      return { ...state };
  }
};

const FormularioHotel = () => {
  const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";

  let User = PedirLocalStorage();
  const navigate = useNavigate();
  const [location, dispatch] = useReducer(reducer, initialLocation);
  const [services, setServices] = useState([]);
  const [fotos, setFotos] = useState({});
  const [geoposition, setGeoposition] = useState({
    location: ["-34.603718", "-58.381639"],
    name: "Tu hotel",
  });
  const resetHotel = {
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    valoration: "",
    rating: "",
    province: "",
    department: "",
    locality: "",
    services: [],
    image: [],
    location: [],
  };
  const [hotel, setHotel] = useState(resetHotel);
  const [error, setError] = useState({});

  // ACTIONS

  const getProvinces = async () => {
    try {
      const response = await axios.get(`${URL_BASE}/locations/`);
      dispatch({ type: "GET_PROVINCES", payload: response.data });
    } catch (error) {
      swal({
        text: "Ocurrio un problema al cargar las Provincias.",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  const getDepartments = async (id_province) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/locations?id_province=${id_province}`
      );
      dispatch({ type: "GET_DEPARTMENTS", payload: response.data });
    } catch (error) {
      swal({
        text: "Ocurrio un problema al cargar los Departamentos.",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  const getLocalities = async (id_department) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/locations?id_department=${id_department}`
      );
      dispatch({ type: "GET_LOCALITIES", payload: response.data });
    } catch (error) {
      swal({
        text: "Ocurrio un problema al cargar las Localidades.",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  const getServices = async () => {
    try {
      const response = await axios.get(`${URL_BASE}/services/`);
      setServices(response.data);
    } catch (error) {
      swal({
        text: "Ocurrio un problema al cargar los servicios.",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  // CHANGES IN SELECTS

  const onChangeProvinces = (event) => {
    const nombre = event.target.value.toUpperCase();
    setHotel({ ...hotel, province: nombre });
    setError(validacion({ ...hotel, province: nombre }));
    const id_province = event.target.selectedOptions[0].id;
    getDepartments(id_province);
  };

  const onChangeDepartments = (event) => {
    const nombre = event.target.value.toUpperCase();
    setHotel({ ...hotel, department: nombre });
    setError(validacion({ ...hotel, department: nombre }));
    const id_department = event.target.selectedOptions[0].id;
    getLocalities(id_department);
  };

  const onChangeLocalities = (event) => {
    const nombre = event.target.value.toUpperCase();
    setHotel({ ...hotel, locality: nombre });
    setError(validacion({ ...hotel, locality: nombre }));
  };

  // CHANGES IN SERVICES

  const onChangeServices = (event) => {
    const checked = event.target.checked;
    const id = Number(event.target.id);
    if (checked) {
      setHotel({ ...hotel, services: [...hotel.services, id] });
      setError(validacion({ ...hotel, services: [...hotel.services, id] }));
    } else {
      const removed = hotel.services.filter((service) => service !== id);
      setHotel({ ...hotel, services: [...removed] });
      setError(validacion({ ...hotel, services: [...removed] }));
    }
  };

  // CHANGES IN IMAGE

  const onChangeImage = (event) => {
    const value = event.target.value;
    setHotel({ ...hotel, image: [value] });
    setError(validacion({ ...hotel, image: value }));
  };

  // CHANGES IN HOTEL

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setHotel({ ...hotel, [property]: value });
    setError(validacion({ ...hotel, [property]: value }));
  };

  // USEEFFECT INITIAL

  useEffect(() => {
    !services.length && getServices();
    !location.provinces.length && dispatch(getProvinces());
    hotel.location = geoposition.location;
  }, [geoposition]);

  // BUTTON SUBMIT

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !hotel.name.length ||
      !hotel.email.length ||
      !hotel.phoneNumber.length ||
      !hotel.valoration.length ||
      !hotel.rating.length ||
      !hotel.province.length ||
      !hotel.department.length ||
      !hotel.locality.length ||
      !hotel.services.length ||
      !hotel.image.length ||
      !hotel.location.length
    )
      return swal({
        text: "Por favor completa todos los campos.",
        icon: "warning",
        buttons: "Aceptar",
      });

    if (Object.entries(error).length)
      return swal({
        text: "Tienes errores en los campos",
        icon: "warning",
        buttons: "Aceptar",
      });

    const {
      name,
      email,
      phoneNumber,
      description,
      valoration,
      rating,
      province,
      department,
      locality,
      services,
      image,
      location,
    } = hotel;
    console.log(hotel);
    try {
      const { data } = await axios.post(`${URL_BASE}/hotels/${User.id}`, {
        name,
        email,
        phoneNumber,
        description,
        valoration: Number(valoration),
        rating: Number(rating),
        province,
        department,
        locality,
        services,
        image,
        location,
      });

      await axios.get(
        `http://localhost:3001/email/CreacionDeHotel/${User.gmail}?name=${User.name}`
      );

      swal({
        text: "Tu hotel se registro con éxito!",
        icon: "success",
        buttons: "Aceptar",
      });
      dispatch(idHotelForm(data.id));
      navigate("/FormRoomType", {
        state: { id_hotel: data.id },
        replace: true,
      });
    } catch (error) {
      swal({
        text: "Por favor vuelve a intentarlo, ocurrio un problema al cargar tu hotel.",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  // RETURN COMPONENT FORMULARIO HOTEL

  return (
    //
    // FORMULARIO HOTEL

    <div className="container">
      <form onSubmit={handleSubmit} className={style.form}>
        <h1 className="h3 mb-3 fw-normal">Registra tu hotel!</h1>

        {/* NOMBRE DEL HOTEL */}

        {error.name ? (
          <span className={style.error}>{error.name}</span>
        ) : (
          <span className={style.hidden}>hidden</span>
        )}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nombre del hotel."
            onChange={handleChange}
            value={hotel.name}
            name="name"
          />
          <label>Nombre del hotel.</label>
        </div>

        {/* EMAIL PARA LA GESTION DEL HOTEL */}

        {error.email ? (
          <span className={style.error}>{error.email}</span>
        ) : (
          <span className={style.hidden}>hidden</span>
        )}
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email de notificación."
            onChange={handleChange}
            value={hotel.email}
            name="email"
          />
          <label>Email de notificación.</label>
        </div>

        {/* TELEFONO DE CONTACTO */}

        {error.phoneNumber ? (
          <span className={style.error}>{error.phoneNumber}</span>
        ) : (
          <span className={style.hidden}>hidden</span>
        )}
        <div className="form-floating">
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            placeholder="Número telefónico."
            onChange={handleChange}
            value={hotel.phoneNumber}
            name="phoneNumber"
          />
          <label>Número telefónico.</label>
        </div>

        {/* UNA DESCRIPCION OPCIONAL */}

        <span className={style.hidden}>hidden</span>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Una descriptión opcional."
            onChange={handleChange}
            value={hotel.description}
            name="description"
          />
          <label>Una descriptión opcional.</label>
        </div>

        {/* VALORACION DEL HOTEL */}

        {error.valoration ? (
          <span className={style.error}>{error.valoration}</span>
        ) : (
          <span className={style.hidden}>hidden</span>
        )}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="valoration"
            placeholder="Valoración del hotel."
            onChange={handleChange}
            value={hotel.valoration}
            name="valoration"
          />
          <label>Valoración del hotel.</label>
        </div>

        {/* CLASIFICACION DEL HOTEL */}

        {error.rating ? (
          <span className={style.error}>{error.rating}</span>
        ) : (
          <span className={style.hidden}>hidden</span>
        )}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="rating"
            placeholder="Clasificación del hotel."
            onChange={handleChange}
            value={hotel.rating}
            name="rating"
          />
          <label>Clasificación del hotel.</label>
        </div>

        {/* LOCATION DONDE SE UBICA EL HOTEL*/}

        <div>Selecciona la Provincia donde se encuentra tu hotel:</div>
        <select onChange={onChangeProvinces} className={style.select}>
          {location.provinces?.map(({ nombre, id }) => (
            <option value={nombre} key={id} id={id}>
              {nombre}
            </option>
          ))}
        </select>
        {location.departments.length ? (
          <div>
            <div>Selecciona el Departamento donde se encuentra tu hotel:</div>
            <select onChange={onChangeDepartments} className={style.select}>
              {location.departments?.map(({ nombre, id }) => (
                <option value={nombre} key={id} id={id}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <></>
        )}
        {location.localities.length ? (
          <div>
            <div>Selecciona la Localidad donde se encuentra tu hotel:</div>
            <select onChange={onChangeLocalities} className={style.select}>
              {location.localities?.map(({ nombre, id }) => (
                <option value={nombre} key={id} id={id}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <></>
        )}

        {/* SERVICIOS QUE TENDRA EL HOTEL */}

        {error.services ? (
          <span className={style.error}>{error.services}</span>
        ) : (
          <span className={style.hidden}>hidden</span>
        )}
        <div>Selecciona los servicios que tiene tu hotel:</div>
        <span onChange={onChangeServices} className={style.checkContainer}>
          {services?.map((service) => (
            <div key={service.id} className={style.checkbox}>
              <label className={style.container}>
                <input
                  type="checkbox"
                  id={service.id}
                  value={service.name}
                  onChange={onChangeServices}
                />
                <div className={style.checkmark}></div>
              </label>
              <span className={style.nameService}>{service.name}</span>
            </div>
          ))}
        </span>

        {/* FOTOS DEL HOTEL */}

        {error.image ? (
          <span className={style.error}>{error.image}</span>
        ) : (
          <span className={style.hidden}>hidden</span>
        )}
        <div>Carga la foto de tu hotel:</div>
        {/* <Cloudinary setImage={setFotos} path="hotels" /> */}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="URL de la foto."
            onChange={onChangeImage}
            value={hotel.image}
            name="image"
          />
          <label>URL de la foto.</label>
        </div>

        {/* GEOLOCALIZACION DEL HOTEL */}

        <div>Cambia la ubicación donde se encuentra tu hotel:</div>
        <Maps location={geoposition} setLocation={setGeoposition} />

        <button className="w-100 btn btn-lg btn-warning" type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default FormularioHotel;
