import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./Reviews.module.css";
import axios from "axios";
import { NewReview } from "../../redux/Actions/Actions";
import { PedirLocalStorage } from "../Index";
import { FuncionDetailHotel } from "../../redux/Actions/Actions";
import swal from "sweetalert";

export default function Reviews() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const [shouldReload, setShouldReload] = useState(false);

  let User = PedirLocalStorage();
  const Hotel = useSelector((state) => state.DetailHotel);

  const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };
  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCommentObject = { comment: newComment, rating: rating };
    setComments([...comments, newCommentObject]);
    setNewComment("");
    setRating(0);
    const datos = {
      username: User.username,
      review: newCommentObject.comment,
      punctuation: newCommentObject.rating,
    };

    axios
      .post(`${URL_BASE}/review/${Hotel.id}`, datos)
      .then(function (response) {
        swal({
          text: "Se realizó correctamente la reseña de este hotel",
          icon: "success",
          buttons: "Aceptar",
        });
      })
      .catch(function (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: "Aceptar",
        });
      });
    dispatch(NewReview());
    dispatch(FuncionDetailHotel(Hotel.id));
  };

  return (
    <div className={style.container}>
      <h2>Reviews:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Deja tu review..."
        />
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={handleRatingChange}
          placeholder="Puntuación"
        />
        <button type="submit">Enviar</button>
      </form>
      <div className={style.comment}>
        {Hotel.Reviews?.map((review, index) => (
          <div className={style.caja} key={index}>
            <img
              src="https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png"
              alt=""
            />
            <div className={style.commentText}>
              <h3>{review.username}:</h3>
              <p>{review.review}</p>
              <span>{review.punctuation}⭐</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
