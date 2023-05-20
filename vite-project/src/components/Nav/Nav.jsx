import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import imageCarrito from "../../image/carrito-de-compras.png";
import imagenSesion from "../../image/perfil.png";
import imagenUsuario from "../../image/usuario (1).png";
import style from "./Nav.module.css";
import { Landing, PedirLocalStorage } from "../Index";
import { LogOut } from "../../redux/Actions/Actions";
import { useDispatch } from "react-redux";
import ClearLocalStorage from "../LocalStorage/CleanLocalStorage";


// import "NavButon.css";

//?----------------- COMPONENTE NAVBAR ------------------------------------
const NavBar = () => {
  // const User = useSelector((state) => state.User);
  const dispatch = useDispatch()
  let User = PedirLocalStorage();
  // let { username, rol } = User;

  let username, rol;
  if (User) {
    username = User.username;
    rol = User.rol;
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 768) {
      setShowNavbar(false);
    }
  }, [windowWidth]);

  const logout = () => {
    dispatch(LogOut());
    ClearLocalStorage();
    location.reload();
  }

  return (
    <>
      <div className={style.nav}>
        <div className={style.logo}>
          <img
            className={style.img}
            src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
            alt="LaCasitaDelHornero"
          />
          <p className={style.p}>CasitasDelHornero</p>
        </div>

        <div
          className={
            showNavbar || windowWidth > 768
              ? `${style.links} ${style.show}`
              : style.links
          }
        >
          {rol === 2 ? (
            <NavLink
              to={"/Proveedor"}
              className={style.link}
              onClick={() => setShowNavbar(false)}
            >
              <button className={style.button}>Proveer Hotel</button>
            </NavLink>
          ) : rol === 3 ? (
            <NavLink
              to={"/SuperAdmin"}
              className={style.link}
              onClick={() => setShowNavbar(false)}
            >
              <button className={style.button}>Administrar Usuarios</button>
            </NavLink>
          ) : (
            <>
              <NavLink
                to={"/UserForm"}
                className={style.link}
                onClick={() => setShowNavbar(false)}
              >
                <button className={style.button}>Quiero Ser Proveedor</button>
              </NavLink>

              <NavLink
                to={"/Carrito"}
                className={style.link}
                onClick={() => setShowNavbar(false)}
              >
                <img className={style.iconoCarrito} src={imageCarrito} />
              </NavLink>
            </>
          )}

          {username ? (
            <div>
            <NavLink
              to={"/Perfil"}
              className={style.link}
              onClick={() => setShowNavbar(false)}
            >
              <img className={style.img} src={imagenUsuario} />
              <p>{`${username}`}</p>
            </NavLink>
            <button onClick={() => logout()} className={style.link}>LogOut</button>
            </div>
          ) : (
            <NavLink
              to={"/"}
              className={style.link}
              onClick={() => setShowNavbar(false)}
            >
              <button className={style.BotonUsuario}>
                <img className={style.iconoCarrito} src={imagenSesion} />
                <p>Iniciar Sesion</p>
              </button>
            </NavLink>
          )}
          <NavLink
            to={"/Home"}
            className={style.link}
            onClick={() => setShowNavbar(false)}
          >
            Home
          </NavLink>
          <NavLink
            to={"/Logout"}
            className={style.link}
            onClick={() => setShowNavbar(false)}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavBar;
