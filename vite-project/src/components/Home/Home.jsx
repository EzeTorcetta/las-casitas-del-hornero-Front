// import Cards from "../Cards/Cards";
import Filtro from "../FILTROS/Filtros";
import style from "./Home.module.css";
import NavBar from "../Nav/Nav";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import Clima from "../Clima/Clima";
import Carrusel from "../Carrusel/Carrusel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionAllHotel, FuncionAllFavoritesHotel } from "../../redux/Actions/Actions";
import Cards from "../Card/Card";
import Row from "react-bootstrap/Row";
import Loading from "../Loading/Loading";
import Paginado from "../Paginado/Paginado";

const Home = () => {
  const dispatch = useDispatch();
  const Hotels = useSelector((state) => state.Hotels);
  // const FavHotels = useSelector((state) => state.FavHotels);
  const HotelsCopi = useSelector((state) => state.HotelsCopi);

  const [mediaQuery, setMediaQuery] = useState({
    matches: window.matchMedia("(min-width: 768px)").matches,
  });

  useEffect(() => {
    if (!Hotels.allHotels?.length) {
      dispatch(FuncionAllHotel());
    }
    const handler = (event) => setMediaQuery({ matches: event.matches });
    window.matchMedia("(min-width: 1200px)").addEventListener("change", handler, true);
    return () => {
      window.matchMedia("(min-width: 1200px)").removeEventListener("change", handler, false);
    };
  }, [Hotels.allHotels]);

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <Carrusel Hotels1={HotelsCopi?.allHotels} />
        {/* <Search /> */}
        <Clima />
        {Hotels.allHotels?.length ? (
          <>
            <section className={`${style.section} ${style.one}`}>
              <div className={style.filtroContainer}>
                <Filtro paginas={Hotels.numPages} />
              </div>
              <Row xs={1} sm={2} lg={3} className="g-2">
                {Hotels.allHotels?.map(({ id, name, image, province }) => (
                  <Cards key={id} id={id} name={name} image={image} province={province} />
                ))}
              </Row>
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
