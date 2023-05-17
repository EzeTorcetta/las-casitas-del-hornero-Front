import React, { useState } from "react";
import style from "./Reviews.module.css";

export default function Reviews() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment("");
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
        <button type="submit">Enviar</button>
      </form>
      <div className={style.comment}>
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>
    </div>
  );
}
