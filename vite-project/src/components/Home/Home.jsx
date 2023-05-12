import Card from "../Card/Card";
import style from "./Home.module.css";
import NavBar from "../Nav/Nav";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import Clima from "../Clima/Clima";
import Carrusel from "../Carrusel/Carrusel";
import Maps from "../Map/Map";

const Home = ({ hotels }) => {
  return (
    <>
      <NavBar />

      <Carrusel />

      <Search />

      <Clima />

      <section className={`${style.section} ${style.one}`}>
        <Card hotels={hotels} />
      </section>
      <section className={`${style.section} ${style.two}`}></section>
      {/*sadsd*/}
      <Footer />
    </>
  );
};

export default Home;
