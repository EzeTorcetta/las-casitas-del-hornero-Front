import "./sign-in.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetUser } from "../../../redux/Actions/Actions";
import validacion from "./Validations";
import style from "./FormularioIngresa.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GuardarLocalStorage } from "../../Index";
import { BotonAuthGoogle } from "../../Index";
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
            `https://las-casitas-del-hornero-back-deploy.up.railway.app/user`,
            usuario
        );

        GuardarLocalStorage(response.data);
        dispatch(GetUser(response.data));

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
    <>
      <div class="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div class="login">
          <form onSubmit={handleSubmit} class="form">
            <h1 className="h3 mb-3 fw-normal">Ingresa</h1>

            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleChange}
              value={usuario.email}
              name="email"
            />
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handleChange}
              value={usuario.password}
              name="password"
            />

            <div className={style.divErrores}>
              <div className={style.divErrorPassword}>
                <h4 className={style.label}>--Error de la password:</h4>
                <p className={style.span}>
                  {!Error.password
                    ? "No hay errores en este campo."
                    : Error.password}
                </p>
              </div>

              <div className={style.divErrorEmail}>
                <h4 className={style.label}>--Error del Email:</h4>
                <p className={style.span}>
                  {!Error.email ? "No hay errores en este campo." : Error.email}
                </p>
              </div>
            </div>

            <button className={style.buton} type="submit">
              Ingresar
            </button>
          </form>
          <BotonAuthGoogle />
        </div>
      </div>
    </>
  );
};

export default FormularioIngresa;
