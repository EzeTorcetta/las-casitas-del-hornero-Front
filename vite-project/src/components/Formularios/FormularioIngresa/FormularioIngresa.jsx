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
import { Link } from "react-router-dom";

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
      <div className="main">
        {/* <h1 className={style.landing_title}>CASITAS DEL HORNERO</h1> */}
        <div className={style.logo}>
          <img
            src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
            alt=""
            className={style.logo_img}
          />
          <h1 className={style.title}>CASITAS DEL HORNERO</h1>
        </div>
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="login">
          <form onSubmit={handleSubmit} className="form">
            <h2 className="h3 mb-3 fw-normal">Ingresa</h2>

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
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handleChange}
              value={usuario.password}
              name="password"
            />
            <div className={style.DivSpanPassword}>
              <span className={style.span}>{Error.password}</span>
            </div>
            <button className={style.buton} type="submit">
              Ingresar
            </button>
            <div className={style.password_forgot}>
              <Link to={"/OlvidasteLaPassword"}>Olvidaste la contraseña?</Link>
            </div>
          </form>
          <div className={style.butonGoogleDiv}>
            <BotonAuthGoogle />
         
          </div>
          <button className="btn btn-secondary">Ingresar sin registrar</button>
        </div>
      </div>
    </>
  );
};

export default FormularioIngresa;
