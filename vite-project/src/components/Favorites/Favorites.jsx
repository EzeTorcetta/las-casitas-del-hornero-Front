//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionAllFavoritesHotel } from "../../redux/Actions/Actions.js";
import { PedirLocalStorage } from "../Index.js";
import Row from "react-bootstrap/Row";
//css
import style from "./Favorites.module.css";
//components
import { Cards } from "../Index.js";

//?----------------- COMPONENTE FAVORITES ------------------------------------

const Favorites = () => {
  const dispatch = useDispatch();
  let User = PedirLocalStorage();
  const favorites = useSelector((state) => state.FavHotels);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      dispatch(FuncionAllFavoritesHotel(User.id));
      setIsLoading(false);
    }
  }, []);

  return (
    <div className={style.full}>
        <Row xs={1} sm={2} lg={3} className="g-2">
          {favorites.length ? (
            favorites.map(
              ({
                id,
                name,
                image,
                province,
                department,
                rating,
                valoration,
              }) => (
                <Cards
                  key={id}
                  id={id}
                  name={name}
                  image={image}
                  rating={rating}
                  province={province}
                  department={department}
                  valoration={valoration}
                />
              )
            )
          ) : (
            <h3 className={style.nohay}>No hay favoritos</h3>
          )}
        </Row>
    </div>
  );
};

export default Favorites;
