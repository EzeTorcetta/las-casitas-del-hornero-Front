import { useState } from "react";
import style from "./Paginado.module.css";
import { FuncionSelectFilter, PostFilters } from "../../redux/Actions/Actions";
import { useSelector, useDispatch } from "react-redux";

const Paginado = ({ paginas }) => {
  const [page, setPage] = useState(paginas);
  const [currentPage, setCurrentPage] = useState(1);
  const paginado = useSelector((state) => state.Hotels.numPages);
  const { Filtros } = useSelector((state) => state);
  const dispatch = useDispatch();

  const cards = Array.from({ length: paginado }, (_, i) => i + 1);

  const handlePage = (event) => {
    const newPage = event.target.value * 1;
    setCurrentPage(newPage);
    setPage(newPage);
    dispatch(PostFilters({ ...Filtros, page: newPage }));
    dispatch(FuncionSelectFilter({ ...Filtros, page: newPage }));
  };

  const handlePagePrev = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    setPage(newPage);
    dispatch(PostFilters({ ...Filtros, page: newPage }));
    dispatch(FuncionSelectFilter({ ...Filtros, page: newPage }));
  };

  const handlePageNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    setPage(newPage);
    dispatch(PostFilters({ ...Filtros, page: newPage }));
    dispatch(FuncionSelectFilter({ ...Filtros, page: newPage }));
  };

  return (
    <div>
      <div className={style.pagination}>
        {page > 1 && <button onClick={handlePagePrev}>&lArr;</button>}
        {cards.map((value, i) => (
          <button value={value} onClick={handlePage} className={currentPage === value ? style.active : ""} key={i}>
            {value}
          </button>
        ))}
        {page < cards.length && <button onClick={handlePageNext}>&rArr;</button>}
      </div>
    </div>
  );
};

export default Paginado;
