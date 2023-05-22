import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import imageCarrito from "../../image/carrito-de-compras.png";
import imagenSesion from "../../image/perfil.png";
import imagenUsuario from "../../image/usuario (1).png";
import { PedirLocalStorage, ClearLocalStorage } from "../Index";
import { LogOut } from "../../redux/Actions/Actions";
import { auth } from "../../Firebase/Firebase";
import { signOut } from "firebase/auth";
import style from "./Nav.module.css";

// import "NavButon.css";

//?----------------- COMPONENTE NAVBAR ------------------------------------
const NavBar = ({ countCarrito }) => {
  // const User = useSelector((state) => state.User);
  const dispatch = useDispatch();
  let User = PedirLocalStorage();
  // let { username, rol } = User;

  let username, rol;
  if (User) {
    username = User.username;
    rol = User.rol;
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    } else {
      dispatch(LogOut());
    }
    ClearLocalStorage();
    location.reload();
  };

  const handleVerPerfil = () => {
    // Lógica para ver el perfil
    // ...
  };
  const handleChangeTipoCuenta = () => {
    // Lógica para cambiar el tipo de cuenta
    // ...
  };
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
          
          {rol===1?(
            <NavLink
            to={"/Carrito"}
            className={style.link}
            onClick={() => setShowNavbar(false)}
            >
              <div className={style.divCarritoCount}>
                <div className={style.countCarritoDiv}>{countCarrito}</div>
                <img className={style.iconoCarrito} src={imageCarrito} />
              </div>
            </NavLink>
          ):(<></>)}

          <NavLink
            to={"/Home"}
            className={style.link}
            onClick={() => setShowNavbar(false)}
          >
            <div className={style.divHome}>
              <div className={style.divHome1}>Home</div>
            </div>
          </NavLink>

          {username ? (
            <div className={style.perfil}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={style.profileButton}
              >
                <img className={style.img} src={imagenUsuario} alt="Perfil" />
                <p>{`${username}`}</p>
                {/* <span className={style.NombreUsuario}>{`${username}`}</span> */}
              </button>
              {showMenu && (
                <ul className={style.menu}>
                  <li>
                    <NavLink
                     to={"/Perfil"}
                     onClick={() => setShowNavbar(false)}
                     >
                    <button
                      onClick={handleVerPerfil}
                      className={style.menuOption}
                    >
                      Ver Perfil
                    </button>
                    </NavLink>
                  </li>
                  <li>
                    {rol === 2 ? (
                      <NavLink
                        to={""}
                        className={style.link}
                        onClick={() => setShowNavbar(false)}
                      >
                        <button className={style.menuOption}>Proveer Hotel</button>
                      </NavLink>
                    ) : rol === 3 ? (
                      <NavLink
                        to={""}
                        className={style.link}
                        onClick={() => setShowNavbar(false)}
                      >
                        <button className={style.menuOption}>Administrar Usuarios</button>
                      </NavLink>
                    ) : (
                      <NavLink
                        to={""}
                        className={style.link}
                        onClick={() => setShowNavbar(false)}
                      >
                        <button className={style.menuOption}>Quiero ser Proveedor</button>
                      </NavLink>
                    )}
                  </li>
                  <li>
                    <button onClick={handleLogout} className={style.menuOption}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
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
        </div>
      </div>
    </>
  );
};

export default NavBar;
