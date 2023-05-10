// import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";
import imagen from "../image/ave-volando (1).png";

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <div className={style.logo}>
        <img className={style.img} src={imagen} />
        El Hornero.com
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
