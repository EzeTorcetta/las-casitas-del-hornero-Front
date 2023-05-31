import { useState } from "react";
import validacion from "./Validations";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import style from "./FormularioTipoHabitacion.module.css";
import { useSelector } from "react-redux";
import NavBar from "../../Nav/Nav";
import { PedirLocalStorage } from "../../Index";

const FormularioTipoHab = (props) => {
  const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";
  const navigate = useNavigate();
  const User = PedirLocalStorage();
  const { state } = useLocation();
  const idHotelForm = useSelector((state) => state.idHotelForm);
  const id = state?.id_hotel || idHotelForm;
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      CompletaLosCampos: "Please complete all the fields.",
      Aceptar: "Accept",
      ErroresEnlosCampos: "You have errors in the fields",
      HabitacionesExito: "Your rooms were registered successfully!",
      YaRegistraste: "You already registered this type of room.",
      ErrorCargar: "Please try again, there was a problem loading the rooms.",
      RegistraLasHabitaciones: "Register the rooms",
      TipoDeHabitación: "Room type",
      CantidadDePersonas: "Amount of people",
      CantidadDePersonasPorHabitación: "Amount of people per room",
      PrecioPorNoche: "Price per night",
      CantidadDeHabitaciones: "Number of rooms",
      CargaLaFotoDeTuHotel: "Load the photo of your hotel",
      ArrastraLaImg: "drag the image here",
      Registrar: "Register",
      VolverAlInicio: "Back to home",
    },
    es: {
      CompletaLosCampos: "Por favor completa todos los campos.",
      Aceptar: "Aceptar",
      ErroresEnlosCampos: "Tienes errores en los campos",
      HabitacionesExito: "Tus habitaciones se registraron con éxito! ",
      YaRegistraste: "Ya registraste este tipo de habitación.",
      ErrorCargar:
        "Por favor vuelve a intentarlo, ocurrio un problema al cargar las habitaciones.",
      RegistraLasHabitaciones: "Registra las habitaciones",
      TipoDeHabitación: "Tipo de habitación",
      CantidadDePersonas: "Cantidad de personas",
      CantidadDePersonasPorHabitación: "Cantidad de personas por habitación",
      PrecioPorNoche: "Precio por noche",
      CantidadDeHabitaciones: "Cantidad de habitaciones",
      CargaLaFotoDeTuHotel: "Carga la foto de tu hotel",
      ArrastraLaImg: "arrastra la imagen aquí",
      Registrar: "Registrar",
      VolverAlInicio: "Volver al inicio",
    },
  };

  console.log(id);

  const resetTipoHab = {
    people: "",
    price: "",
    name: "",
    image: "",
    stock: "",
    id_user: User.id,
    id_hotel: id,
  };
  const [tipoHab, setTipoHab] = useState(resetTipoHab);
  const [error, setError] = useState({});
  const tipo = {
    1: "Simple",
    2: "Doble",
    3: "Triple",
  };
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);

  // CHANGES IN FORM TIPOHAB

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setTipoHab({ ...tipoHab, [property]: value });
    setError(validacion({ ...tipoHab, [property]: value }));
  };

  // BUTTON SUBMIT

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !tipoHab.people.length ||
      !tipoHab.price.length ||
      !tipoHab.image.length ||
      !tipoHab.stock.length
    )
      return swal({
        text: translations[idioma].CompletaLosCampos,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });

    if (Object.entries(error).length)
      return swal({
        text: translations[idioma].ErroresEnlosCampos,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });

    const { people, price, name, image, stock, id_user } = tipoHab;
    try {
      const res = await axios.post(`${URL_BASE}/roomtypes/${id}`, {
        people: Number(people),
        price: Number.parseFloat(price).toFixed(2),
        name: tipo[people] || "Multiple",
        image,
        stock,
        id_user,
      });

      swal({
        text: translations[idioma].HabitacionesExito,
        icon: "success",
        buttons: translations[idioma].Aceptar,
      });
      navigate("/FormRoomType", {
        state: { id_hotel: state.id_hotel },
        replace: true,
      });
      setTipoHab(resetTipoHab);
    } catch (error) {
      console.log(error);
      if (error.response.data.error === "Room type already exists.") {
        setTipoHab(resetTipoHab);
        return swal({
          text: translations[idioma].YaRegistraste,
          icon: "warning",
          buttons: translations[idioma].Aceptar,
        });
      }
      swal({
        text: translations[idioma].ErrorCargar,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "La_Casita_Del_Hornero");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhe1t8gs0/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    tipoHab.image = file.secure_url;
    setLoading(false);
    setError(validacion({ ...tipoHab, image: tipoHab.image }));
  };

  const deleteImage = async (url) => {
    setLoading(true);
    tipoHab.image = "";
    setLoading(false);
    setError(validacion({ ...tipoHab, image: tipoHab.image }));
  };

  return (
    //
    // FORMULARIO TIPOHABITACION
    <>
      <NavBar />

      <div className="container">
        <form onSubmit={handleSubmit} className={style.form}>
          <h1 className="h3 mb-3 fw-normal">
            {translations[idioma].RegistraLasHabitaciones}:
          </h1>

          {/* CANTIDAD DE PERSONAS */}

          {error.people || !tipoHab.people.length ? (
            <span className={style.error}>{error.people}</span>
          ) : (
            <span className={style.tipoHab}>
              {translations[idioma].TipoDeHabitación}:{" "}
              {tipo[tipoHab.people]?.toUpperCase() || "MULTIPLE"}
            </span>
          )}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="people"
              placeholder={translations[idioma].CantidadDePersonas}
              onChange={handleChange}
              value={tipoHab.people}
              name="people"
            />
            <label>
              {translations[idioma].CantidadDePersonasPorHabitación}.
            </label>
          </div>

          {/* PRECIO DE LA HABITACION */}

          {error.price ? (
            <span className={style.error}>{error.price}</span>
          ) : (
            <span className={style.hidden}>hidden</span>
          )}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder={translations[idioma].PrecioPorNoche}
              onChange={handleChange}
              value={tipoHab.price}
              name="price"
            />
            <label>{translations[idioma].PrecioPorNoche}.</label>
          </div>

          {/* CANTIDAD DE HABITACIONES POR TIPO */}

          {error.stock ? (
            <span className={style.error}>{error.stock}</span>
          ) : (
            <span className={style.hidden}>hidden</span>
          )}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="stock"
              placeholder={translations[idioma].CantidadDeHabitaciones}
              onChange={handleChange}
              value={tipoHab.stock}
              name="stock"
            />
            <label>{translations[idioma].CantidadDeHabitaciones}.</label>
          </div>

          {/* FOTOS DE LA HABITACION */}
          {error.image ? (
            <span className={style.error}>{error.image}</span>
          ) : (
            <span className={style.hidden}>hidden</span>
          )}
          <div>{translations[idioma].CargaLaFotoDeTuHotel}:</div>
          <div>
            <input
              type="file"
              name="image"
              placeholder={translations[idioma].ArrastraLaImg}
              onChange={uploadImage}
            />
            {tipoHab.image.length ? (
              <>
                <img src={tipoHab.image} style={{ width: "300px" }} />
                <button onClick={() => deleteImage(tipoHab.image)}>X</button>
              </>
            ) : (
              <></>
            )}
          </div>

          <button className="w-100 btn btn-lg btn-warning" type="submit">
            {translations[idioma].Registrar}
          </button>

          <NavLink to={"/Home"}>
            <button className="w-100 btn btn-lg btn-warning" type="button">
              {translations[idioma].VolverAlInicio}
            </button>
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default FormularioTipoHab;
