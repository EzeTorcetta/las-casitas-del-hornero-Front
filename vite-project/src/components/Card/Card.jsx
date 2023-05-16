//?---------------------------- IMPORTS --------------------------------
//react
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
//css
import style from "./Card.module.css";

import axios from "axios";

//?----------------- COMPONENTE CARD ------------------------------------
function Cards({ id, name, image, province }) {
  const idUser = useSelector((state) => state.idUser);
  const FavHotels = useSelector((state) => state.FavHotels);
  const [isFav, setIsFav] = useState(false);
  const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";

  useEffect(() => {
    FavHotels?.forEach((fav) => {
      if (fav.id == id) setIsFav(true);
    });
  }, [FavHotels]);

  const handleFavorite = async (idUser, id) => {
    setIsFav(!isFav);
    isFav
      ? await axios.delete(`${URL_BASE}/favorites/${idUser}/${id}`)
      : await axios.post(`${URL_BASE}/favorites/${idUser}/${id}`);
  };

  return (
    <div className={style.container}>
      <Col key={id}>
        <Card className="bg-white text-white">
          {Array.isArray(image) ? (
            <Card.Img src={image[0]} alt="Card image" className={style.img} />
          ) : (
            <Card.Img src={image} alt="Card image" className={style.img} />
          )}
          <Card.ImgOverlay>
            <Link to={`/detail/${id}`} className={style.link}>
              <div className={style.infoContainer}>
                <Card.Title className={style.info}>{name}</Card.Title>
              </div>
            </Link>
            <div className={style.provinceContainer}>
              <Card.Text className={style.province}>{province}</Card.Text>
            </div>
            {isFav ? (
              <button
                onClick={() => handleFavorite(idUser, id)}
                className={style.button}
              >
                ❤️
              </button>
            ) : (
              <button
                onClick={() => handleFavorite(idUser, id)}
                className={style.button}
              >
                🤍
              </button>
            )}
          </Card.ImgOverlay>
        </Card>
      </Col>
    </div>
  );
}

export default Cards;
