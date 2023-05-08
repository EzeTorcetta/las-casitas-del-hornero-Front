import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <Link to={"/Home"}>Home</Link>
      <Link to={"/Favoritos"}>Favoritos</Link>
    </div>
  );
};

export default Nav;
