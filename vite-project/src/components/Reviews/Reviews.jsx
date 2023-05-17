import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./Reviews.module.css";

export default function Reviews() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const user = useSelector((state) => state.idUser.username);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment("");
  };
  console.log(user);

  return (
    <div className={style.container}>
      <div className={style.comment}>
        {comments.map((comment, index) => (
          <div key={index}>
            <h3>{user}:</h3>
            {comment}
          </div>
        ))}
      </div>
      <h2>Reviews:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Deja tu review..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
