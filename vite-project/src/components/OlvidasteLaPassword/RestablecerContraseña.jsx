import { useState } from "react";
import "./OlvidasteLaPassword.css";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { PedirEmailLocalStorage } from "../Index";

const RestablecerContraseña = () => {
  const navigate = useNavigate();
  const [statePassword, setPassword] = useState({
    password: "",
    passwordRepetir: "",
  });
  const [Error, setPasswordError] = useState({
    password: "",
    passwordRepetir: "",
  });

  //*----------------------validacion

  const ValidacionDePassword = (state, Error) => {
    const Errores = { ...Error };

    if (!state.password.length) {
      Errores.password = "Campo Requerido";
    } else if (
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(state.password)
    ) {
      Errores.password = "";
    } else {
      Errores.password = `La Contraseña debe tener 
        al menos una letra en Mayuscula
        , Minusculas y numeros.`;
    }

    if (!state.passwordRepetir.length) {
      Errores.passwordRepetir = "Campo Requerido";
    } else if (
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(state.passwordRepetir)
    ) {
      Errores.passwordRepetir = "";
    } else {
      Errores.passwordRepetir = `Contraseña Invalida`;
    }

    return Errores;
  };

  //*----------------------Cambios de estados:
  const OnchangePassword = (event) => {
    console.log(event.target);
    const propery = event.target.name;
    const value = event.target.value;

    setPasswordError(
      ValidacionDePassword({ ...statePassword, [propery]: value }, Error)
    );
    setPassword({ ...statePassword, [propery]: value });
  };

  //*------------------------Funciones de los botones:

  const FuncionCambioContraseña = async () => {
    try {
      if (
        statePassword.password.length === 0 ||
        statePassword.passwordRepetir.length === 0
      ) {
        swal({
          text: "Debes completar los campos",
          icon: "warning",
          buttons: "Aceptar",
        });
      } else if (
        Error.password.length !== 0 ||
        Error.passwordRepetir.length !== 0
      ) {
        swal({
          text: "Tienes errores en los campos",
          icon: "warning",
          buttons: "Aceptar",
        });
      } else {
        // Aca voy hacer el axios.put(para actualizar las contraseñas)
        const email = PedirEmailLocalStorage();
        const { password } = statePassword;

        console.log(email, password);

        await axios.put(
          `https://las-casitas-del-hornero-back-deploy.up.railway.app/user/password`,
          {
            email,
            password,
          }
        );
        navigate("/");
        swal({
          text: "Cambio de Contraseña Exitoso",
          icon: "success",
          buttons: "Aceptar",
        });
      }
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  const FuncionBotonSesion = () => {
    navigate("/");
  };

  return (
    <>
      <div className="card_Padre_Supremo_sayayin">
        <div className="card_Padre_Supremo">
          <div className="card">
            <div className="div_Span_Title">
              <span className="card__title">MI CONTRASEÑA</span>
            </div>
            <div className="card__form">
              <div className="container_email">
                <label htmlFor="password">Nueva Contraseña:</label>
                <input
                  name="password"
                  placeholder="Ingresa tu Contraseña."
                  type="password"
                  onChange={OnchangePassword}
                />
                <div className="DivSpanPassword">
                  <span className="spanError">{Error.password}</span>
                </div>
                <br />
                <label htmlFor="passwordRepetir">Repetir Contraseña:</label>
                <input
                  name="passwordRepetir"
                  placeholder="Ingresa tu Contraseña."
                  type="password"
                  onChange={OnchangePassword}
                />
                <span className="spanError">{Error.passwordRepetir}</span>
              </div>
              <button onClick={FuncionBotonSesion} className="boton-volver">
                Volver
              </button>
              <button
                onClick={FuncionCambioContraseña}
                className="boton-siguiente"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestablecerContraseña;
