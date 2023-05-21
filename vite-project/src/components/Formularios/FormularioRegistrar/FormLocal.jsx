import { useState } from "react";
import { useDispatch } from "react-redux";
import validacion2 from "./Validation";
import style from "./FormularioUsuario.module.css";
import "./FormularioLocal.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const FormLocal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //---------------ESTADOS-----------------

  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
    repetir: "",
  });

  const [Error, setError] = useState({
    username: "",
    email: "",
    password: "",
    repetir: "",
  });

  const [state, setState] = useState(0);

  const [currentUser, setCurrentUser] = useState({});

  //-------------HANDLERS----------------

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUsuario({ ...usuario, [property]: value });

    setError(validacion2({ ...usuario, [property]: value }, Error));
  };

  const onChange = () => {
    if (usuario.admin === false) {
      setUsuario({ ...usuario, admin: true });
    } else {
      setUsuario({ ...usuario, admin: false });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !usuario.username.length ||
      !usuario.email.length ||
      !usuario.password.length ||
      !usuario.repetir.length
    ) {
      swal({
        text: "Debes completar los campos",
        icon: "warning",
        buttons: "Aceptar",
      });
    } else if (
      Error.username.length > 0 ||
      Error.email.length > 0 ||
      Error.password.length > 0 ||
      Error.repetir.length > 0
    ) {
      swal({
        text: "Tienes Errores en los campos",
        icon: "warning",
        buttons: "Aceptar",
      });
    } else {
      try {
        const { username, password, email } = usuario;
        await axios.post(
          `https://las-casitas-del-hornero-back-deploy.up.railway.app/user`,
          { username, password, email }
        );

        swal({
          text: "Usuarios registrado con exito!!",
          icon: "success",
          buttons: "Aceptar",
        });
        navigate("/");
      } catch (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: "Aceptar",
        });
      }
    }

    if (
      usuario.username === "" ||
      usuario.email === "" ||
      usuario.password === "" ||
      usuario.repetir === ""
    )
      swal({
        text: "Necesitas completar las áreas",
        icon: "warning",
        buttons: "Aceptar",
      });

    if (
      db.find(
        (user) =>
          user.email === usuario.email || user.username === usuario.username
      )
    ) {
      swal({
        text: "El email o usuario ya existe",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
    if (usuario.password !== usuario.repetir) {
      swal({
        text: "La password no coincide",
        icon: "warning",
        buttons: "Aceptar",
      });
    } else {
      {
        window.location.href = "Home";
      }
      swal({
        text: "usuario creado",
        icon: "success",
        buttons: "Aceptar",
      });
    }

    setUsuario({
      username: "",
      email: "",
      password: "",
      repetir: "",
    });
  };

  return (
    <div className="DivContenedorPadre">
      <div className="form-container">
        <div className="DivDeBienvenido">
          <h1 className="h3 mb-3 fw-normal">
            Bienvenido {currentUser.displayName}
          </h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {/*--------------------------------UserName----------------------------------*/}
          <div className="input-group">
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              onChange={handleChange}
              value={usuario.username}
            />
          </div>
          <span className={style.span}>{Error.username}</span>

          {/*--------------------------------Emial----------------------------------*/}

          <div className="input-group">
            <label for="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder=""
              onChange={handleChange}
              value={usuario.email}
            />
          </div>
          <span className={style.span}>{Error.email}</span>

          {/*--------------------------------Password----------------------------------*/}

          <div className="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              onChange={handleChange}
              value={usuario.password}
            />
          </div>
          <span className={style.span}>{Error.password}</span>

          {/*--------------------------------Password----------------------------------*/}

          <div className="input-group">
            <label for="Repetirpassword">Repetir Password</label>
            <input
              type="password"
              name="repetir"
              id="repetir"
              placeholder=""
              onChange={handleChange}
              value={usuario.repetir}
            />
          </div>
          <span className={style.span}>{Error.repetir}</span>
          <button className="sign" type="submit">
            Registrar
          </button>
          <Link to="/">
            <button type="button" className="w-100 btn btn-lg btn-warning">
              Volver
            </button>
          </Link>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default FormLocal;
