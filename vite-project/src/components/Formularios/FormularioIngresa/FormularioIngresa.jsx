import "./sign-in.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { UserLogin } from "../../../redux/Actions/Actions";
import validacion from "./Validations";
import style from "./FormularioIngresa.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormularioIngresa = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const db = useSelector((state) => state.usuarios);
  // console.log(db);

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
      alert("Debes completar todos los campos");
    } else if (Error.password.length > 0 || Error.email.length > 0) {
      alert("Tienes errores en los campos");
    } else {
      try {
        await axios.post(
          `https://las-casitas-del-hornero-back.up.railway.app/user`,
          usuario
        );

        alert(" Inicio de sesion con exito!!");
        navigate("/Home");
      } catch (error) {
        alert(error.response.data.error);
      }
      // dispatch(UserLogin(usuario));
      // navigate("/Home");
    }

    // if (usuario.email === "" || usuario.password === "")
    //   return alert("Necesitas completar las áreas");
    // else if (
    //   db.find(
    //     (user) =>
    //       user.email === usuario.email &&
    //       user.password === usuario.password
    //   )
    // ) {
    //   window.location.href = "Home";
    // } else {
    //   return alert("Usuario o password equivocada");
    // }

    // setUsuario({
    //   email: "",
    //   password: "",
    // });
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
