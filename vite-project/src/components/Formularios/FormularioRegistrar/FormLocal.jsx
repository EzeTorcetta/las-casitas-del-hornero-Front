import { useState } from "react";
import { useDispatch } from "react-redux";
import validacion2 from "./Validation";
import style from "./FormularioUsuario.module.css";
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
      alert("Debes completar los campos");
    } else if (
      Error.username.length > 0 ||
      Error.email.length > 0 ||
      Error.password.length > 0 ||
      Error.repetir.length > 0
    ) {
      alert("Tienes errores en los campos");
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
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Bienvenido {currentUser.displayName}</h1>
          <p>Para terminar el proceso, elige un nombre de usuario</p>
  
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleChange}
              value={usuario.username}
              name="username"
            />
            <span className={style.span}>{Error.username}</span>
            <label>Username</label>
          </div>
  
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleChange}
              value={usuario.email}
              name="email"
            />
            <span className={style.span}>{Error.email}</span>
            <label>Email</label>
          </div>
  
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handleChange}
              value={usuario.password}
              name="password"
            />
            <span className={style.span}>{Error.password}</span>
            <label>password</label>
          </div>
  
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handleChange}
              value={usuario.repetir}
              name="repetir"
            />
            <span className={style.span}>{Error.repetir}</span>
            <label>Repetir password</label>
          </div>  
          <button className="w-100 btn btn-lg btn-warning" type="submit">
            Registrar
          </button>
          <Link to="/">
            <button type="button" className="w-100 btn btn-lg btn-warning">
              Volver
            </button>
          </Link>
        </form>
        {/* <a href="$"> Olvidé mi password </a> */}
      </div>
      );
    
};

export default FormLocal;
