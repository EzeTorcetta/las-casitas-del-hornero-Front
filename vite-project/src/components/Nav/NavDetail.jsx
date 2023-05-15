// import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import style from "./NavDetail.module.css";

const NavDetail = () => {
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

export default NavDetail;
