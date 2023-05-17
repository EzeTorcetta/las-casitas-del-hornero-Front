import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./Reviews.module.css";

export default function Reviews() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const user = useSelector((state) => state.idUser.username);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCommentObject = { comment: newComment, rating: rating };
    setComments([...comments, newCommentObject]);
    setNewComment("");
    setRating(0);
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
        {comments.map((commentObject, index) => (
          <div className={style.caja} key={index}>
            <img
              src="https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png"
              alt=""
            />
            <div className={style.commentText}>
              <h3>{user}:</h3>
              <p>{commentObject.comment}</p>
              <span>{commentObject.rating}⭐</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
