import style from "./Favorites.module.css";
import NavBar from "../Nav/Nav";
import Footer from "../Footer/Footer";

const Favoritos = () => {
  return (
    <div>
      <NavBar />
      <section className={style.section}>Favoritos</section>;
      <Footer />
    </div>
  );
};

export default Favoritos;
