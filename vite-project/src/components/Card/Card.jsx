import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { PostFavoriteHotel, DeleteFavoriteHotel } from "../../redux/Actions/Actions.js";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
// import style from "./Card.module.css";
import style from "./Carta.module.css";
import axios from "axios";
import imgRating from "../../image/favorito.png";

function Cards({ id, name, image, province, rating, description }) {
  // const dispatch = useDispatch();
  const idUser = useSelector((state) => state.idUser);
  const FavHotels = useSelector((state) => state.FavHotels);
  const [isFav, setIsFav] = useState(false);
  const ratingArray = Array(rating).fill(rating);

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
        <div>
          {ratingArray.map((r, index) => {
            <img className={style.imgRating} src={imgRating} alt="" key={index} />;
          })}
        </div>
      </div>
      <div className={style.description}>
        <p>{description}</p>
      </div>
    </div>
  );

  // return (
  //   <div className={style.container}>
  //     <Col key={id}>
  //       <Card className="bg-white text-white">
  //         {Array.isArray(image) ? (
  //           <Card.Img src={image[0]} alt="Card image" className={style.img} />
  //         ) : (
  //           <Card.Img src={image} alt="Card image" className={style.img} />
  //         )}
  //         <Card.ImgOverlay>
  //           <Link to={`/detail/${id}`} className={style.link}>
  //             <div className={style.infoContainer}>
  //               <Card.Title className={style.info}>{name}</Card.Title>
  //             </div>
  //           </Link>
  //           <div className={style.provinceContainer}>
  //             <Card.Text className={style.province}>{province}</Card.Text>
  //           </div>
  //           {isFav ? (
  //             <button onClick={() => handleFavorite(idUser, id)} className={style.button}>
  //               ❤️
  //             </button>
  //           ) : (
  //             <button onClick={() => handleFavorite(idUser, id)} className={style.button}>
  //               🤍
  //             </button>
  //           )}
  //         </Card.ImgOverlay>
  //       </Card>
  //     </Col>
  //   </div>
  // );
}

export default Cards;
