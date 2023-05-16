import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Login } from "../../../redux/Actions/Actions";
import validacion2 from "./Validation";
import style from "./FormularioUsuario.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const FormularioIngresa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const db = useSelector((state) => state.usuarios);
  // console.log(db);

  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
    repetir: "",
    admin: false,
  });

  const [Error, setError] = useState({
    username: "",
    email: "",
    password: "",
    repetir: "",
    admin: false,
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUsuario({ ...usuario, [property]: value });

    setError(validacion2({ ...usuario, [property]: value }, Error));
  };

  // console.log(usuario);

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
        const { username, password, email, admin } = usuario;
        await axios.post(
          `https://las-casitas-del-hornero-back.up.railway.app/user`,
          { username, password, email, admin }
        );

        alert("Usuarios registrado con exito!!");
        navigate("/");
      } catch (error) {
        alert(error.response.data.error);
      }
    }

    if (
      usuario.username === "" ||
      usuario.email === "" ||
      usuario.password === "" ||
      usuario.repetir === ""
    )
      return alert("Necesitas completar las áreas");
    if (
      db.find(
        (user) =>
          user.email === usuario.email || user.username === usuario.username
      )
    ) {
      return alert("El email o usuario ya existe");
    }
    if (usuario.password !== usuario.repetir) {
      return alert("La password no coincide");
    } else {
      {
        window.location.href = "Home";
      }
      alert("usuario creado");
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
        <h1 className="h3 mb-3 fw-normal">Ingresa</h1>

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

        <div className="checkbox">
          <input
            className="box"
            type="checkbox"
            value="remember-me"
            indeterminate
            onClick={onChange}
          />
          <label>Quiero registrar mi hotel !</label>
        </div>

        <button className="w-100 btn btn-lg btn-warning" type="submit">
          Registrar
        </button>
      </form>
      {/* <a href="$"> Olvidé mi password </a> */}
    </div>
  );
};

export default FormularioIngresa;
