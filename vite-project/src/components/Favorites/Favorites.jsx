//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionAllFavoritesHotel } from "../../redux/Actions/Actions.js";
import Row from "react-bootstrap/Row";
//css
import style from "./Favorites.module.css";
//components
import { Cards } from "../Index.js";

//?----------------- COMPONENTE FAVORITES ------------------------------------
const Favorites = () => {
  const dispatch = useDispatch();
  const idUser = useSelector((state) => state.idUser);
  const favorites = useSelector((state) => state.FavHotels);

  useEffect(() => {
    dispatch(FuncionAllFavoritesHotel(idUser));
  }, [favorites]);

  return (
    <div>
      <section className={style.section}>
        <Row xs={1} sm={2} lg={3} className="g-2">
          {favorites?.map(({ id, name, image, province }) => (
            <Cards
              key={id}
              id={id}
              name={name}
              image={image}
              province={province}
            />
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Favorites;
