import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imageCarrito from "../../image/carrito-de-compras.png";
import carritoblanco from "../../image/carrito-de-compras-blanco.png";
import imagenSesion from "../../image/perfil.png";
import imagenUsuario from "../../image/usuario (1).png";
import { PedirLocalStorage, ClearLocalStorage } from "../Index";
import { LogOut } from "../../redux/Actions/Actions";
import { auth } from "../../Firebase/Firebase";
import { signOut } from "firebase/auth";
import SymbolsCurrency from "../CurrencyExchange/SymbolsCurrency";
import "./Nav.css";
import SwitchButton from "../SwitchButton/SwitchButton";
import SwitchButtonFlex from "../SwitchButton/SwitchButtonFlex";
import SymbolsCurrencyFlex from "../CurrencyExchange/SymbolsCurrencyFlex";

// import "NavButon.css";

//?----------------- COMPONENTE NAVBAR ------------------------------------
const NavBar = ({ countCarrito }) => {
  // const User = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const theme = useSelector((state) => state.theme);

  const handleLogout = () => {
    logout();
  };

  const handleVerPerfil = () => {
    navigate("/Perfil");
  };
  const handleChangeTipoCuenta = () => {
    navigate("/UserForm");
  };
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleGoHome = () => {
    navigate("/");
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

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    } else {
      dispatch(LogOut());
    }
    ClearLocalStorage();
    location.reload();
  };

 if(windowWidth > 1080){

  return(
    <div>
      <div className={theme === "light" ? "navlight" : "navdark"}>
        <NavLink to={"/Home"} className="links">
          <div className="logo">
            <img
              className="img"
              src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
              alt="LaCasitaDelHornero"
            />
          <div className="tituloLogo">CasitasDelHornero</div>
          </div>
        </NavLink>
        <SwitchButton />
        <SymbolsCurrency />

        {rol === 1 ? 
          (
            <Link to={"/Carrito"}>
              <div className="divCarritoCount">
              <div className="countCarritoDiv">{countCarrito}</div>
              <img
                className="iconoCarrito"
                src={theme === "light" ? imageCarrito : carritoblanco}
              />
              </div>
            </Link>
        ) : (
            <></>
          )
        }


        <div>
          {username ? (theme === 'dark' ? (
            <div className="contenedor-elementos-dark">
                <div className="nombre-usuario-dark">{`${username}`}</div>
                <div className="contenedor-opciones-dark">
                  <div className="opciones-dark">Perfil</div>
                  {rol === 2 ? <div className="opciones-dark">Proveer Hotel</div> : 
                  rol === 3 ? <div className="opciones-dark">Administrar Usuarios</div> : 
                  <div className="opciones-dark">Quiero ser proveedor</div>}
                  <button onClick={handleLogout} className="botoncito-dark">LogOut</button>
                </div>
            </div>
          ) : (
            <div className="contenedor-elementos">
                <div className="nombre-usuario">{`${username}`}</div>
                <div className="contenedor-opciones">
                  <div className="opciones">Perfil</div>
                  {rol === 2 ? <div className="opciones">Proveer Hotel</div> : 
                  rol === 3 ? <div className="opciones">Administrar Usuarios</div> : 
                  <div className="opciones">Quiero ser proveedor</div>}
                  <button onClick={handleLogout} className="botoncito">LogOut</button>
                </div>
            </div>
          )): (
            <button onClick={handleGoHome} className="boton-inicia-sesion"> Iniciar sesion</button>
          )
        }
         
        </div>
      </div>
    </div>
  );
}
  else{
    return(
      <div>
        <div className={theme === "light" ? "navlight" : "navdark"}>
          <NavLink to={"/Home"} className="links">
            <div className="logo">
              <img
                className="img"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
                alt="LaCasitaDelHornero"
              />
            </div>
          </NavLink>
          <SwitchButtonFlex />
          <SymbolsCurrencyFlex />
  
          {rol === 1 ? 
            (
              <Link to={"/Carrito"}>
                <div className="divCarritoCount">
                <div className="countCarritoDiv">{countCarrito}</div>
                <img
                  className="iconoCarrito"
                  src={theme === "light" ? imageCarrito : carritoblanco}
                />
                </div>
              </Link>
          ) : (
              <></>
            )
          }
  
  
          <div>
        
            {username ? (
              <div>
                {/* ------------- NUEVO MENU ------------ */}
  
                <nav>
                  <ul className="menu-horizontal">
                    <li>
                      <a>{`${username}`}</a>
                      <ul className="menu-vertical">
                        <li>
                          <a href="/Perfil">Perfil</a>
                        </li>
                        {rol === 2 ? (
                          <li>
                            <a href="">Proveer Hotel</a>
                          </li>
                        ) : rol === 3 ? (
                          <li>
                            <a href="">Administrar Usuarios</a>
                          </li>
                        ) : (
                          <li>
                            <a href="">Quiero ser proveedor</a>
                          </li>
                        )}
                        <li>
                          <button onClick={handleLogout}>Salir</button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            ) : (
              <a href="/"> iniciar sesion</a>
            )}
          </div>
        </div>
      </div>
    )
  }
};

export default NavBar;
