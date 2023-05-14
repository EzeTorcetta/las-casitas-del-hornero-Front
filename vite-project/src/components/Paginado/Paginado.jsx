import React, { useState } from "react";
import style from "./Paginado.module.css";

const cards = [1, 2, 3, 4, 5, 6];

const Paginado = () => {
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  const handlePage = (event) => {
    setPage(event.target.value * 15);
    setCurrentPage(event.target.value * 1);
  };

  const handlePagePrev = () => {
    setPage(page - 15);
    setCurrentPage(currentPage - 1);
  };

  const handlePageNext = () => {
    setPage(page + 15);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className={style.pagination}>
        {page > 0 && <button onClick={handlePagePrev}>&lArr;</button>}
        {cards.map((_, i) => (
          <button
            value={i}
            onClick={handlePage}
            className={currentPage === i ? "active" : ""}
            key={i}
          >
            {i + 1}
          </button>
        ))}
        {page < cards.length - 15 && (
          <button onClick={handlePageNext}>&rArr;</button>
        )}
      </div>
    </div>
  );
};

export default Paginado;
