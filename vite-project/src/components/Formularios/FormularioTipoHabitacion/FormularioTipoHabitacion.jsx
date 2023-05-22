import { useState } from "react";
import validacion from "./Validations";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import style from "./FormularioTipoHabitacion.module.css";
import { useSelector } from "react-redux";

const FormularioTipoHab = (props) => {
  const URL_BASE =
    "https://las-casitas-del-hornero-back-deploy.up.railway.app";
  const navigate = useNavigate();
  const { state } = useLocation();
  const idHotelForm = useSelector((state) => state.idHotelForm);
  const id = state?.id_hotel || idHotelForm;
  const resetTipoHab = {
    people: "",
    price: "",
    name: "",
    image: "",
    stock: "",
  };
  const [tipoHab, setTipoHab] = useState(resetTipoHab);
  const [error, setError] = useState({});
  const tipo = {
    1: "Simple",
    2: "Doble",
    3: "Triple",
  };

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

    const { people, price, name, image, stock } = tipoHab;
    try {
      await axios.post(`${URL_BASE}/roomtypes/${id}`, {
        people: Number(people),
        price: Number.parseFloat(price).toFixed(2),
        name: tipo[people] || "Multiple",
        image,
        stock,
      });
      swal({
        text: "Tus habitaciones se registraron con éxito! ",
        icon: "success",
        buttons: "Aceptar",
      });
      navigate("/FormRoomType", {
        state: { id_hotel: state.id_hotel },
        replace: true,
      });
      setTipoHab(resetTipoHab);
    } catch (error) {
      if (error.response.data.error === "Room type already exists.") {
        setTipoHab(resetTipoHab);
        return swal({
          text: "Ya registraste este tipo de habitación.",
          icon: "warning",
          buttons: "Aceptar",
        });
      }
      swal({
        text: "Por favor vuelve a intentarlo, ocurrio un problema al cargar las habitaciones.",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  return (
    //
    // FORMULARIO TIPOHABITACION

    <div className="container">
      <form onSubmit={handleSubmit} className={style.form}>
        <h1 className="h3 mb-3 fw-normal">
          Registra las habitaciones:
        </h1>

        {/* CANTIDAD DE PERSONAS */}

        {error.people || !tipoHab.people.length ? (
          <span className={style.error}>{error.people}</span>
        ) : (
          <span className={style.tipoHab}>
            Tipo de habitación:{" "}
            {tipo[tipoHab.people]?.toUpperCase() || "MULTIPLE"}
          </span>
        )}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="people"
            placeholder="Cantidad de personas."
            onChange={handleChange}
            value={tipoHab.people}
            name="people"
          />
          <label>Cantidad de personas por habitación.</label>
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
            placeholder="Precio por noche."
            onChange={handleChange}
            value={tipoHab.price}
            name="price"
          />
          <label>Precio por noche.</label>
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
            placeholder="Cantidad de habitaciones."
            onChange={handleChange}
            value={tipoHab.stock}
            name="stock"
          />
          <label>Cantidad de habitaciones.</label>
        </div>

        {/* FOTOS DE LA HABITACION */}

        {error.image ? (
          <span className={style.error}>{error.image}</span>
        ) : (
          <span className={style.hidden}>hidden</span>
        )}
        <div>Carga la foto de tu habitación:</div>
        {/* <Cloudinary setImage={setFotos} path="hotels" /> */}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="URL de la foto."
            onChange={handleChange}
            value={tipoHab.image}
            name="image"
          />
          <label>URL de la foto.</label>
        </div>
        <span className={style.hidden}>hidden</span>
        <button
          className="w-100 btn btn-lg btn-warning"
          type="submit">
          Registrar
        </button>
        <span className={style.hidden}>hidden</span>
        <NavLink to={"/Home"}>
          <button
            className="w-100 btn btn-lg btn-warning"
            type="button">
            Finalizar
          </button>
        </NavLink>
      </form>
    </div>
  );
};

export default FormularioTipoHab;
