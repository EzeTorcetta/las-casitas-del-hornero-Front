import { useDispatch, useSelector } from "react-redux";
import style from "./Favorites.module.css";
import NavBar from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Row from "react-bootstrap/Row";
import Cards from "../Card/Card";

const Favoritos = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.FavHotels);

  return (
    <div>
      <NavBar />
      <section className={style.section}>
        <Row xs={1} sm={2} lg={3} className="g-2">
          {favorites?.map(({ id, name, image, province }) => (
            <Cards key={id} id={id} name={name} image={image} province={province} />
          ))}
        </Row>
      </section>
      ;
      <Footer />
    </div>
  );
};

export default Favoritos;
