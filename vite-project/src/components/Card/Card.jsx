//?---------------------------- IMPORTS --------------------------------
//react
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { PostFavoriteHotel, DeleteFavoriteHotel } from "../../redux/Actions/Actions.js";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

import axios from "axios";
import imgFav from "../../image/favorito.png";

//?----------------- COMPONENTE CARD ------------------------------------
function Cards({ id, name, image, province, rating, description, valoration }) {
  const navigate = useNavigate();
  const idUser = useSelector((state) => state.idUser);
  const FavHotels = useSelector((state) => state.FavHotels);
  const [isFav, setIsFav] = useState(false);
  const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";
  let ratingArray = Array(rating).fill(rating);

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

  const onClickDetail = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={image[0]} alt="" className={style.imgHotel} />
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
      </div>
      <div className={style.title}>
        <h4 className={style.name}>{name}</h4>
        <p>{valoration}</p>
        <h7 className={style.province}>{province}</h7>
        <div className={style.rating}>
          {ratingArray.map((_, index) => {
            return (
              <img
                className={style.imgRating}
                src={imgFav}
                alt=""
                key={index}
              />
            );
          })}
        </div>
        <button onClick={onClickDetail} className={style.botonDetail}>
          VER ALOJAMIENTO
        </button>
      </div>
    </div>
  );
}

export default Cards;
