import Filtro from "../FILTROS/Filtros";
import style from "./Home.module.css";
import NavBar from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Clima from "../Clima/Clima";
import Carrusel from "../Carrusel/Carrusel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionSelectFilter, FuncionAllFavoritesHotel } from "../../redux/Actions/Actions";
import Cards from "../Card/Card";
import Row from "react-bootstrap/Row";
import Loading from "../Loading/Loading";
import Paginado from "../Paginado/Paginado";

const Home = () => {
  const dispatch = useDispatch();
  const Hotels = useSelector((state) => state.Hotels);
  const { Filtros, idUser } = useSelector((state) => state);
  const HotelsCopi = useSelector((state) => state.HotelsCopi);

  useEffect(() => {
    console.log(idUser);
    dispatch(FuncionAllFavoritesHotel(idUser));
    if (!Hotels.allHotels?.length) {
      dispatch(FuncionSelectFilter(Filtros));
    }
  }, []);

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
                <Filtro />
              </div>
              <div className={style.divCard}>
                <Row xs={1} sm={2} lg={3} className="g-2">
                  {Hotels.allHotels?.map(({ id, name, image, province }) => (
                    <Cards key={id} id={id} name={name} image={image} province={province} />
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
