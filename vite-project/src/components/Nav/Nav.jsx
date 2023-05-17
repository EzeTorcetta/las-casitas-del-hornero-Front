import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import imageCarrito from "../../image/carrito-de-compras.png";
import imagenSesion from "../../image/perfil.png";
import style from "./Nav.module.css";
import { useSelector } from "react-redux";
// import "NavButon.css";

//?----------------- COMPONENTE NAVBAR ------------------------------------
const NavBar = () => {
  const User = useSelector((state) => state.User);
  let { email, rol } = User;

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
              to={"/Perfil"}
              className={style.link}
              onClick={() => setShowNavbar(false)}
            >
              <h1>Proveer Hotel</h1>
            </NavLink>
          ) : rol === 3 ? (
            <NavLink
              to={"/Perfil"}
              className={style.link}
              onClick={() => setShowNavbar(false)}
            >
              <button className={style.cta}>
                <span className={style.hover}>Administrar Usuarios</span>
                <svg
                  viewBox="0 0 46 16"
                  height="10"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                  id="arrow-horizontal"
                >
                  <path
                    transform="translate(30)"
                    d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                    data-name="Path 10"
                    id="Path_10"
                  ></path>
                </svg>
              </button>
            </NavLink>
          ) : (
            <NavLink
              to={"/Perfil"}
              className={style.link}
              onClick={() => setShowNavbar(false)}
            >
              <button className={style.cta}>
                <span className={style.hover}>Quiero ser Proveedor</span>
                <svg
                  viewBox="0 0 46 16"
                  height="10"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                  id="arrow-horizontal"
                >
                  <path
                    transform="translate(30)"
                    d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                    data-name="Path 10"
                    id="Path_10"
                  ></path>
                </svg>
              </button>
            </NavLink>
          )}

          {email ? (
            <NavLink
              to={"/Perfil"}
              className={style.link}
              onClick={() => setShowNavbar(false)}
            >
              <p>{`${email}`}</p>
            </NavLink>
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
            to={"/Carrito"}
            className={style.link}
            onClick={() => setShowNavbar(false)}
          >
            <img className={style.iconoCarrito} src={imageCarrito} />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavBar;
