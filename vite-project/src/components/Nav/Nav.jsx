import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo"></div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <button>X</button>
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  // return (
  //   <>
  //     <div className={style.nav}>
  //       <div className={style.logo}>
  //         <img
  //           className={style.img}
  //           src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
  //           alt=""
  //         />
  //         <p className={style.p}>CasitasDelHornero</p>
  //       </div>

  //       <div className={style.links}>
  //         <ul
  //           className={
  //             menuVisible ? `${style.liDespliegue}` : `${style.liNoDespliegue}`
  //           }
  //         >
  //           <NavLink
  //             to={"/Favoritos"}
  //             className={style.link}
  //             onClick={() => setMenuVisible(false)}
  //           >
  //             Favoritos
  //             <NavLink
  //               to={"/Home"}
  //               className={style.link}
  //               onClick={() => setMenuVisible(false)}
  //             >
  //               Home
  //             </NavLink>
  //           </NavLink>
  //         </ul>
  //       </div>
  //       <button className={style.menuToggle} onClick={toggleMenu}>
  //         {menuVisible ? (
  //           <li className={style.liDespliegue}></li>
  //         ) : (
  //           <li className={style.liNoDespliegue}></li>
  //         )}
  //       </button>
  //     </div>
  //   </>
  // );
};

export default NavBar;
