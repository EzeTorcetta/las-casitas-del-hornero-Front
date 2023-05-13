import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

function Cards({ id, name, image, province }) {
  const dispatch = useDispatch();
  const Hotels = useSelector((state) => state.Hotels);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    Hotels.forEach((h) => {
      if (h.id === id) setIsFav(true);
    });
  }, []);

  const handleFavorite = () => {
    // isFav ? deleteFavorite(props.id) : addFavorite();
    setIsFav(!isFav);
  };

  // const ElementoDelArrayImage =
  //   image && (image.length === 0 || image.length > 0) ? image.shift() : null;
  // const [position1] = image;

  return (
    <div className={style.container}>
      {/* <Row xs={1} sm={2} lg={3} className="g-2"> */}
      <Col key={id}>
        <Link to={`/detail/${id}`}>
          <Card className="bg-white text-white">
            <Card.Img src={image[0]} alt="Card image" className={style.img} />
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
      {/* </Row> */}
    </div>
  );
}

export default Cards;
