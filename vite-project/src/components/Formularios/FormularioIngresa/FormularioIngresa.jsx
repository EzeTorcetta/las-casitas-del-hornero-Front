import "./sign-in.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionIDUser } from "../../../redux/Actions/Actions";
import validacion from "./Validations";
import style from "./FormularioIngresa.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const FormularioIngresa = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const [Error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUsuario({ ...usuario, [property]: value });
    setError(validacion({ ...usuario, [property]: value }, Error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (usuario.email === "" || usuario.password === "") {
      swal({
        text: "Debes completar todos los campos",
        icon: "warning",
        buttons: "Aceptar",
      });
    } else if (Error.password.length > 0 || Error.email.length > 0) {
      swal({
        text: "Tienes errores en los campos",
        icon: "warning",
        buttons: "Aceptar",
      });
    } else {
      try {
        const response = await axios.post(
          `https://las-casitas-del-hornero-back.up.railway.app/user`,
          usuario
        );
        console.log(response.data.id);
        const idUser1 = response.data.id;
        dispatch(FuncionIDUser(idUser1));
        swal({
          text: " Inicio de sesion con exito!!",
          icon: "success",
          buttons: "Aceptar",
        });
        navigate("/Home");
      } catch (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: "Aceptar",
        });
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Ingresa</h1>

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
        {/* 
        <div className="checkbox">
          <input
            className="box"
            type="checkbox"
            value="remember-me"
            indeterminate
          />

          <label>Recordar</label>
        </div> */}

        <button className="w-100 btn btn-lg btn-warning" type="submit">
          Ingresar
        </button>
      </form>

      {/* <a href="$"> Olvidé mi password </a> */}
    </div>
  );
};

export default FormularioIngresa;
