//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
//css
import style from "./Home.module.css";
//actions
import {
  FuncionSelectFilter,
  FuncionAllFavoritesHotel,
} from "../../redux/Actions/Actions";
//components
// import Cards from "../Cards/Cards";
// import Search from "../Search/Search";
import { Filter, NavBar, Footer, Clima, Carrusel, Cards, Loading, Paginado } from "../Index";

//?----------------- COMPONENTE HOME ------------------------------------
const Home = () => {
  const dispatch = useDispatch();
  const Hotels = useSelector((state) => state.Hotels);
  const { Filters, idUser } = useSelector((state) => state);
  // const FavHotels = useSelector((state) => state.FavHotels);
  const HotelsCopi = useSelector((state) => state.HotelsCopi);

  const [mediaQuery, setMediaQuery] = useState({
    matches: window.matchMedia("(min-width: 768px)").matches,
  });

  useEffect(() => {
    dispatch(FuncionAllFavoritesHotel(idUser));
    if (!Hotels.allHotels?.length) {
      dispatch(FuncionSelectFilter(Filters));
    }
    const handler = (event) => setMediaQuery({ matches: event.matches });
    window
      .matchMedia("(min-width: 1200px)")
      .addEventListener("change", handler, true);
    return () => {
      window
        .matchMedia("(min-width: 1200px)")
        .removeEventListener("change", handler, false);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <Carrusel HotelsCarrusel={HotelsCopi?.allHotels} />
        {/* <Search /> */}
        <Clima />
        {Hotels.allHotels?.length ? (
          <>
            <section className={`${style.section} ${style.one}`}>
              <div className={style.filtroContainer}>
                <Filter />
              </div>
              <div className={style.divCard}>
                <Row xs={1} sm={2} lg={3} className="g-2">
                  {Hotels.allHotels?.map(({ id, name, image, province }) => (
                    <Cards
                      key={id}
                      id={id}
                      name={name}
                      image={image}
                      province={province}
                    />
                  ))}
                </Row>
              </div>
            </section>
          </>
        ) : (
          <section className={`${style.section} ${style.one}`}>
            <Loading />
          </section>
        )}

        <Paginado paginas={Hotels.numPages} />
        <section className={`${style.section} ${style.two}`}></section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
