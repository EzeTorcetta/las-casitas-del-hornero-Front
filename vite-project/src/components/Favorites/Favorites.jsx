import { useDispatch, useSelector } from "react-redux";
import style from "./Favorites.module.css";
import NavBar from "../Nav/Nav";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";

const Favoritos = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.FavHotels);

  return (
    <div>
      <NavBar />
      <section className={style.section}>
        <Cards hotels={favorites} />
      </section>
      ;
      <Footer />
    </div>
  );
};

export default Favoritos;
