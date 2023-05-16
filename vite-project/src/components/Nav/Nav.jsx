import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

//?----------------- COMPONENTE NAVBAR ------------------------------------
const NavBar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
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
          <NavLink
            to={"/Favoritos"}
            className={style.link}
            onClick={() => setShowNavbar(false)}
          >
            Favoritos
          </NavLink>
          <NavLink
            to={"/Home"}
            className={style.link}
            onClick={() => setShowNavbar(false)}
          >
            Home
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavBar;
