// import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import style from "./NavDetail.module.css";
import { useState } from "react";

const NavDetail = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={style.nav}>
      <div className={style.logo}>
        <img
          className={style.img}
          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
          alt="LaCasitaDelHornero"
        />
        <p>LaCasitaDelHornero</p>
      </div>
      <div className={style.mobileMenu}>
        <input
          type="checkbox"
          className={style.menuCheckbox}
          checked={isMobileMenuOpen}
          onChange={toggleMobileMenu}
        />
        <span className={style.menuIcon}></span>
        <ul className={style.menuItems}>
          <li>
            <NavLink
              to={"/Home"}
              className={style.link}
              onClick={toggleMobileMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/Favoritos"}
              className={style.link}
              onClick={toggleMobileMenu}
            >
              Favoritos
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavDetail;
