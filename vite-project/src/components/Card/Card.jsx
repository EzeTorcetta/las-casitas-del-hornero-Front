//?---------------------------- IMPORTS --------------------------------
//react
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PedirLocalStorage } from "../Index";
import { useSelector, useDispatch } from "react-redux";
import { FuncionAllFavoritesHotel } from "../../redux/Actions/Actions.js";
import style from "./Card.module.css";
import axios from "axios";
import imgFav from "../../image/favorito.png";

//?----------------- COMPONENTE CARD ------------------------------------
function Cards({
  id,
  name,
  image,
  province,
  department,
  rating,
  description,
  valoration,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FavHotels = useSelector((state) => state.FavHotels);
  const theme = useSelector((state) => state.theme);
  const [isFav, setIsFav] = useState(false);
  const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";
  let ratingArray = Array(rating).fill(rating);

  let User = PedirLocalStorage();

  useEffect(() => {
    FavHotels?.forEach((fav) => {
      if (fav.id === id) setIsFav(true);
    });
  }, [FavHotels]);

  const handleFavorite = async (idUser, id) => {
    if (idUser) {
      setIsFav(!isFav);
      isFav
        ? await axios.delete(`${URL_BASE}/favorites/${idUser}/${id}`)
        : await axios.post(`${URL_BASE}/favorites/${idUser}/${id}`);
      dispatch(FuncionAllFavoritesHotel(User.id));
    }
  };
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      ValoracionDelHotel: "Hotel Rating",
      VerAlojamiento: "See Accommodation",
    },
    es: {
      ValoracionDelHotel: "Valoracion Del Hotel",
      VerAlojamiento: "Ver Alojamiento",
    },
  };

  const onClickDetail = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={image[0]} alt="" className={style.imgHotel} />
        {!User || User?.rol === 1 ? (
          isFav ? (
            <button
              onClick={() => handleFavorite(User?.id, id)}
              className={style.button}
            >
              ❤️
            </button>
          ) : (
            <button
              onClick={() => handleFavorite(User?.id, id)}
              className={style.button}
            >
              🤍
            </button>
          )
        ) : (
          <></>
        )}
      </div>
      <div className={style.title}>
        <div className={style.divJose}>
          <div className={style.divJose1}>
            <h4 className={style.name}>{name}</h4>
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
          </div>
          <p>
            {translations[idioma].ValoracionDelHotel} :{valoration}
          </p>
        </div>
        <p className={style.punctuation}>Valoracion Del Hotel :{valoration}</p>
        <p className={style.province}>
          {department},{province}
        </p>
        <button onClick={onClickDetail} className={style.botonDetail}>
          {translations[idioma].VerAlojamiento}
        </button>
      </div>
    </div>
  );
}

export default Cards;
