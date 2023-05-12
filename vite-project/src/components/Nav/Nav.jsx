// import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <div className={style.logo}>
        <img
          className={style.img}
          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
          alt=""
        />
        <p>LasCasitasDelHornero </p>
      </div>
      <div>
        <NavLink to={"/Home"} className={style.link}>
          Home
        </NavLink>
        <NavLink to={"/Favoritos"} className={style.link}>
          Favoritos
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
