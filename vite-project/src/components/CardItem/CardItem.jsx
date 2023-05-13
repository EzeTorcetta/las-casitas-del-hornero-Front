import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./CardItem.module.css";

function CardItem({ id, image, nombre, direccion, provincia }) {
  const dispatch = useDispatch();
  const Hotels = useSelector((state) => state.Hotels);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    Hotels.forEach((h) => {
      if (h.id === hotels.id) setIsFav(true);
    });
  }, []);

  const handleFavorite = () => {
    isFav
      ? props.deleteFavorite(props.id)
      : props.addFavorite({
          id: props.id,
          name: props.name,
          species: props.species,
          gender: props.gender,
          image: props.image,
        });
    setIsFav(!isFav);
  };

  return (
    <div className={style.container}>
      <Col>
        <Link to={`/detail/${id}`}>
          <Card className={`bg-white text-white ${style.Card}`}>
            <Card.Img src={image} alt="Card image" className={style.img} />
            <div className={style.heart}>
              <Card.ImgOverlay>
                <Card.Title>{nombre}</Card.Title>
                <Card.Text>{direccion}</Card.Text>
                <Card.Text>{provincia}</Card.Text>
                {isFav ? (
                  <button onClick={handleFavorite} className={style.button}>
                    ❤️
                  </button>
                ) : (
                  <button onClick={handleFavorite} className={style.button}>
                    🤍
                  </button>
                )}
              </Card.ImgOverlay>
            </div>
          </Card>
        </Link>
      </Col>
    </div>
  );
}

export default CardItem;
