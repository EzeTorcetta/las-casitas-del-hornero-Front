import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { PostFavoriteHotel, DeleteFavoriteHotel } from "../../redux/Actions/Actions.js";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import axios from "axios";

function Cards({ id, name, image, province }) {
  // const dispatch = useDispatch();
  const idUser = useSelector((state) => state.idUser);
  const FavHotels = useSelector((state) => state.FavHotels);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    FavHotels?.forEach((fav) => {
      if (fav.id == id) setIsFav(true);
    });
  }, []);

  const handleFavorite = async (idUser, id) => {
    console.log(idUser, id);
    console.log("hola");
    setIsFav(!isFav);
    // isFav ? dispatch(DeleteFavoriteHotel(idUser, id)) : dispatch(PostFavoriteHotel(idUser, id));
    isFav
      ? await axios.delete(`http://las-casitas-del-hornero-back.up.railway.app/favorites/${idUser}/${id}`)
      : await axios.post(`http://las-casitas-del-hornero-back.up.railway.app/favorites/${idUser}/${id}`);
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
              <button onClick={() => handleFavorite(idUser, id)} className={style.button}>
                ❤️
              </button>
            ) : (
              <button onClick={() => handleFavorite(idUser, id)} className={style.button}>
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
