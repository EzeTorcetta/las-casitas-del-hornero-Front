import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import "./OlvidasteLaPassword.css";
import { GuardarDatosParaCambiarPassword } from "../Index";
import { useNavigate } from "react-router-dom";

const OlvidasteLaPassword = () => {
  const Navigate = useNavigate();
  const [stateInput, setStateInput] = useState("");
  const [Errors, setErrors] = useState("");

  const ValidacionDelEmail = (stateInput) => {
    let Error = "";
    if (!stateInput.length) {
      Error = "Campo Requerido";
    } else if (stateInput.length > 35) {
      Error = "El email no debe superar los 35 caracteres...";
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(stateInput)) {
      Error = "";
    } else {
      Error = "Email invalido";
    }

    console.log(Error);
    return Error;
  };

  const OnchangeEmail = (event) => {
    console.log(event.target.value);
    setStateInput(event.target.value);
    setErrors(ValidacionDelEmail(event.target.value));
  };

  //*----------------------------------FuncionOnclick:

  const FuncionOnclick = async () => {
    try {
      if (stateInput.length === 0) {
        swal({
          text: "Debes completar el campo",
          icon: "warning",
          buttons: "Aceptar",
        });
      } else if (Errors.length) {
        swal({
          text: "Tienes Errores en el campo",
          icon: "warning",
          buttons: "Aceptar",
        });
      } else {
        GuardarDatosParaCambiarPassword(stateInput);
        await axios.get(`http://localhost:3001/email?email=${stateInput}`); //! cambiar en el deploy
        swal({
          text: "Te enviamos un mail con instrucciones para restablecer tu contraseña",
          icon: "success",
          buttons: "Aceptar",
        });
        Navigate("/");
      }
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  return (
    <>
      <div className="card_Padre_Supremo_sayayin">
        <div className="card_Padre_Supremo">
          <div className="card">
            <div className="div_Span_Title">
              <span className="card__title">OLVIDE MI CONTRASEÑA!</span>
            </div>
            <p className="card__content">
              Ingresa tu email y te enviaremos la nueva contraseña.
            </p>
            <div className="card__form">
              <div className="container_email">
                <label htmlFor="email">Correo electrónico</label>
                <br />
                <input
                  name="email"
                  placeholder="Your Email"
                  type="text"
                  className="inputEmail"
                  onChange={OnchangeEmail}
                />
              </div>
              <span className="spanError">{Errors}</span>
              <button onClick={FuncionOnclick} className="sign-up">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OlvidasteLaPassword;
