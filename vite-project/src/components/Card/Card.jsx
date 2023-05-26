//?---------------------------- IMPORTS --------------------------------
//react
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PedirLocalStorage } from "../Index";
import { useSelector, useDispatch } from "react-redux";
import { FuncionAllFavoritesHotel } from "../../redux/Actions/Actions.js";
import "./Card.css";
import axios from "axios";
import imgFav from "../../image/favorito.png";


//?----------------- COMPONENTE CARD ------------------------------------
function Cards({ id, name, image, province, rating, description, valoration }) {
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

  const onClickDetail = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={theme === 'light' ? "cardcontainer" : 'cardcontainer-dark'}>
      
      <div>
        <img src={image[0]} alt="" className='imgHotel' />
        {!User || User?.rol === 1?isFav ? (
          <button
            onClick={() => handleFavorite(User?.id, id)}
            className='botonfavorito'
          >
            ❤️
          </button>
        ) : (
          <button
            onClick={() => handleFavorite(User?.id, id)}
            className='botonfavorito'
          >
            🤍
          </button>
        ):(<></>)}
      </div>

      <div className='textContainer'>          
        <h4 className='name'>{name}</h4>
        <div className='rating'>
          {ratingArray.map((_, index) => {
            return (
              <img
                className='imgRating'
                src={imgFav}
                alt=""
                key={index}
              />
                );
              })}
        </div>
        <p>Valoracion Del Hotel :{valoration}</p>
        <h3 className='province'>{province}</h3>
        <button onClick={onClickDetail} className='botonDetail'>
          VER ALOJAMIENTO
        </button>
      </div>
    
    </div>
    
  );
}

export default Cards;
