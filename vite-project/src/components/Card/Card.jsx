import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

function Cards({ id, name, image, province }) {
  const dispatch = useDispatch();
  const FavHotels = useSelector((state) => state.FavHotels);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    FavHotels.forEach((fav) => {
      if (fav.id === id) setIsFav(true);
    });
  }, []);

  const handleFavorite = () => {
    // isFav ? deleteFavorite(props.id) : addFavorite();
    setIsFav(!isFav);
  };

  // const ElementoDelArrayImage =
  //   image && (image.length === 0 || image.length > 0) ? image.shift() : null;

  // const imagen = image[0];

  return (
    <div className={style.container}>
      <Col key={id}>
        <Link to={`/detail/${id}`}>
          <Card className="bg-white text-white">
            {Array.isArray(image) ? <Card.Img src={image[0]} alt="Card image" className={style.img} /> : <Card.Img src={image} alt="Card image" className={style.img} />}
            <Card.ImgOverlay>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{province}</Card.Text>
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
          </Card>
        </Link>
      </Col>
    </div>
  );
}

export default Cards;
