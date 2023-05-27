import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  const theme = useSelector((state) => state.theme)

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
    <div>

      <div className={theme === 'light' ? 'navlight' : 'navdark'}>
      
        <NavLink to={"/Home"} className='links'>
          
          <div className='logo'>
            
            <img
              className='img'
              src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
              alt="LaCasitaDelHornero"
            />
            <div className='tituloLogo'>CasitasDelHornero</div>
            
          </div>
          
        </NavLink>
        <SwitchButton/>
        <SymbolsCurrency />
        
        
        <div
          className={
            showNavbar || windowWidth > 768
              ? `${'links'} ${'show'}`
              : 'links'
          }>
          {rol === 1 ? (
            <NavLink
              to={"/Carrito"}
              className='enlaces'
              onClick={() => setShowNavbar(false)}>
                
              <div className='divCarritoCount'>
                <div className='countCarritoDiv'>
                  {countCarrito}
                </div>
                
                <img
                  className='iconoCarrito'
                  src={theme === 'light' ? imageCarrito :carritoblanco}
                />
                
              </div>
              
            </NavLink>
          ) : (
            <></>
          )}

          {username ? (
            <div>

{/* ------------- NUEVO MENU ------------ */}

<nav>
  <ul className="menu-horizontal">
    <li>
      <a>{`${username}`}</a>
        <ul className="menu-vertical">
          <li><a href="/admin">Perfil</a></li>
          {rol === 2 ? <li><a href="">Proveer Hotel</a></li> : 
          rol === 3 ? <li><a href="">Administrar Usuarios</a></li> : 
          <li><a href="">Quiero ser proveedor</a></li>}
          <li><button onClick={handleLogout}>Salir</button></li>
        </ul>
    </li>
      
  </ul>
</nav>

</div>

): (<a href="/"> iniciar sesion</a>)}

{/* --------------------------------------------------

 {/* ------------- FOTO DE PERFIL Y NOMBRE ------------ */}
              {/* <button
                onClick={() => setShowMenu(!showMenu)}
                className='profileButton'>
                <img
                  className='img'
                  src={imagenUsuario}
                  alt="Perfil"
                />
                <p className="username">{`${username}`}</p>
              </button> */}
{/* ------------------------------------------------------- */}


              {/* {showMenu && (
                <nav>
                <ul className='menu'>
                  <li>
                    <NavLink
                      to={"/Perfil"}
                      onClick={() => setShowNavbar(false)}>
                      <button
                        onClick={handleVerPerfil}
                        className='menuOption'>
                        Ver Perfil
                      </button>
                    </NavLink>
                  </li>
                  <li>
                    {rol === 2 ? (
                      <NavLink
                        to={""}
                        className='link'
                        onClick={() => setShowNavbar(false)}>
                        <button className='menuOption'>
                          Proveer Hotel
                        </button>
                      </NavLink>
                    ) : rol === 3 ? (
                      <NavLink
                        to={""}
                        className='link'
                        onClick={() => setShowNavbar(false)}>
                        <button className='menuOption'>
                          Administrar Usuarios
                        </button>
                      </NavLink>
                    ) : (
                      <NavLink
                        to={""}
                     
                        onClick={() => setShowNavbar(false)}>
                        <button className='menuOption'>
                          Quiero ser Proveedor
                        </button>
                      </NavLink>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className='menuOption'>
                      Logout
                    </button>
                  </li>
                </ul>
                </nav>
              )}
            </div>
          ) : (
            <NavLink
              to={"/"}
              className='link'
              onClick={() => setShowNavbar(false)}>
              <button className='BotonUsuario'>
                <img
                  className='iconoCarrito'
                  src={imagenSesion}
                />
                <p>Iniciar Sesion</p>
              </button>
            </NavLink>
          )}
          */} 
        </div>
      </div> 
    </div>
  );
};

export default NavBar;
