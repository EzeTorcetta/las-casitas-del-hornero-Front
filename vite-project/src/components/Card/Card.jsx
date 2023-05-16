import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { PostFavoriteHotel, DeleteFavoriteHotel } from "../../redux/Actions/Actions.js";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import axios from "axios";
import imgFav from "../../image/favorito.png";

function Cards({ id, name, image, province, rating, description }) {
  // const dispatch = useDispatch();
  const idUser = useSelector((state) => state.idUser);
  const FavHotels = useSelector((state) => state.FavHotels);
  const [isFav, setIsFav] = useState(false);
  let ratingArray = Array(rating).fill(rating);

  useEffect(() => {
    FavHotels?.forEach((fav) => {
      if (fav.id == id) setIsFav(true);
    });
  }, [FavHotels]);

  const handleFavorite = async (idUser, id) => {
    setIsFav(!isFav);
    // isFav ? dispatch(DeleteFavoriteHotel(idUser, id)) : dispatch(PostFavoriteHotel(idUser, id));
    isFav
      ? await axios.delete(`http://las-casitas-del-hornero-back.up.railway.app/favorites/${idUser}/${id}`)
      : await axios.post(`http://las-casitas-del-hornero-back.up.railway.app/favorites/${idUser}/${id}`);
  };

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={image[0]} alt="" className={style.imgHotel} />
        {isFav ? (
          <button onClick={() => handleFavorite(idUser, id)} className={style.button}>
            ❤️
          </button>
        ) : (
          <button onClick={() => handleFavorite(idUser, id)} className={style.button}>
            🤍
          </button>
        )}
      </div>
      <div className={style.title}>
        <Link to={`/detail/${id}`} className={style.link}>
          <h4 className={style.name}>{name}</h4>{" "}
        </Link>
        <h7 className={style.province}>{province}</h7>
        <div className={style.rating}>
          {ratingArray.map((_, index) => {
            return <img className={style.imgRating} src={imgFav} alt="" key={index} />;
          })}
        </div>
      </div>
      <div className={style.description}>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Cards;
