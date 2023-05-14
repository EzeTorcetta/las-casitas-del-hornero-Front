import React, { useState } from "react";
import style from "./Paginado.module.css";

const cards = [1, 2, 3, 4, 5, 6];

const Paginado = ({ paginas }) => {
  const [page, setPage] = useState(paginas);
  const [currentPage, setCurrentPage] = useState(page);

  const handlePage = (event) => {
    setPage(event.target.value * 5);
    setCurrentPage(event.target.value * 1);
  };

  const handlePagePrev = () => {
    setPage(page - 5);
    setCurrentPage(currentPage - 1);
  };

  const handlePageNext = () => {
    setPage(page + 5);
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
        {page < cards.length - 5 && (
          <button onClick={handlePageNext}>&rArr;</button>
        )}
      </div>
    </div>
  );
};

export default Paginado;
