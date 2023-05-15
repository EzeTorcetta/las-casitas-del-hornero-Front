import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const NavBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className={style.nav}>
      <div className={style.logo}>
        <img
          className={style.img}
          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
          alt=""
        />
        <p className={style.p}>CasitasDelHornero</p>
      </div>
      <div className={`${style.links} ${menuVisible ? style.active : ""}`}>
        <NavLink to={"/Favoritos"} className={style.link} onClick={() => setMenuVisible(false)}>
          Favoritos
          <NavLink to={"/Home"} className={style.link} onClick={() => setMenuVisible(false)}>
            Home
          </NavLink>
        </NavLink>
      </div>
      <button className={style.menuToggle} onClick={toggleMenu}>
        <span className={style.menuToggleBar}></span>
        <span className={style.menuToggleBar}></span>
        <span className={style.menuToggleBar}></span>
      </button>
    </div>
  );
};

export default NavBar;
