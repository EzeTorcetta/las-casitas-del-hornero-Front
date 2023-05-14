import React, { useState } from "react";
import style from "./Paginado.module.css";
import { FuncionAllHotel } from "../../redux/Actions/Actions";
import { useSelector, useDispatch } from "react-redux";

const Paginado = ({ paginas }) => {
  const [page, setPage] = useState(paginas);
  const [currentPage, setCurrentPage] = useState(page);
  const paginado = useSelector((state) => state.Hotels.numPages);
  const dispatch = useDispatch();

  const cards = Array.from({ length: paginado }, (_, i) => i + 1);

  const handlePage = (event) => {
    setPage(event.target.value * 1);
    setCurrentPage(event.target.value * 1);
    dispatch(FuncionAllHotel(page));
  };

  const handlePagePrev = () => {
    setPage(page - 1);
    setCurrentPage(currentPage - 1);
  };

  const handlePageNext = () => {
    setPage(page + 1);
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className={style.pagination}>
        {page > 0 && <button onClick={handlePagePrev}>&lArr;</button>}
        {cards.map((value, i) => (
          <button
            value={i}
            onClick={handlePage}
            className={currentPage === i ? "style.active" : ""}
            key={i}
          >
            {value}
          </button>
        ))}
        {page < cards.length - 1 && (
          <button onClick={handlePageNext}>&rArr;</button>
        )}
      </div>
    </div>
  );
};

export default Paginado;
