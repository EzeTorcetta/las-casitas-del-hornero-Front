// import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <div className={style.logo}>LOGO</div>
      <div>
        <NavLink to={'/Home'} className={style.link}>
          Home
        </NavLink>
        <NavLink to={'/Favoritos'} className={style.link}>
          Favoritos
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
