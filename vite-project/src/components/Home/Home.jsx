import Card from "../Card/Card";
import style from "./Home.module.css";
import NavBar from "../Nav/Nav";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import Clima from "../Clima/Clima";
import Carrusel from "../Carrusel/Carrusel";

const Home = () => {
  return (
    <>
      <NavBar />
      <Carrusel />
      <Search />
      <Clima />
      <section className={`${style.section} ${style.one}`}>
        <Card />
      </section>
      <section className={`${style.section} ${style.two}`}>
        <h1 className={style.h1}>Optional</h1>
      </section>
      <Footer />
    </>
  );
};

export default Home;
