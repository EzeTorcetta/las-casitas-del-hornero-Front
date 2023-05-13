// import Cards from "../Cards/Cards";
import style from "./Home.module.css";
import NavBar from "../Nav/Nav";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import Clima from "../Clima/Clima";
import Carrusel from "../Carrusel/Carrusel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionAllHotel } from "../../redux/Actions/Actions";
import Cards from "../Card/Card";
import Row from "react-bootstrap/Row";

const Home = () => {
  const dispatch = useDispatch();
  const Hotels = useSelector((state) => state.Hotels);

  const [mediaQuery, setMediaQuery] = useState({
    matches: window.matchMedia("(min-width: 768px)").matches,
  });

  useEffect(() => {
    if (!Hotels.length) {
      dispatch(FuncionAllHotel());
    }
    const handler = (event) => setMediaQuery({ matches: event.matches });
    window.matchMedia("(min-width: 1200px)").addEventListener("change", handler, true);
    return () => {
      window.matchMedia("(min-width: 1200px)").removeEventListener("change", handler, false);
    };
  }, [Hotels]);

  return (
    <>
      <NavBar />
      <div className={style.container}>
        {mediaQuery.matches ? (
          <Carrusel Hotels={Hotels} />
        ) : (
          <Row xs={1} sm={2} lg={3} className="g-2">
            {Hotels?.map(({ id, name, image, province }) => (
              <Cards key={id} id={id} name={name} image={image} province={province} />
            ))}
          </Row>
        )}

        <Search />

        <Clima />

        <section className={`${style.section} ${style.one}`}>
          <Row xs={1} sm={2} lg={3} className="g-2">
            {Hotels?.map(({ id, name, image, province }) => (
              <Cards key={id} id={id} name={name} image={image} province={province} />
            ))}
          </Row>
        </section>
        <section className={`${style.section} ${style.two}`}></section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
