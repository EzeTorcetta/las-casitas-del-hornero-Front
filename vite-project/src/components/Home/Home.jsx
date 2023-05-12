import Card from "../Card/Card";
import style from "./Home.module.css";
import NavBar from "../Nav/Nav";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import Clima from "../Clima/Clima";
import Carrusel from "../Carrusel/Carrusel";
import { useEffect, useState } from "react";

const Home = ({ hotels }) => {
  const [mediaQuery, setMediaQuery] = useState({ matches: window.matchMedia("(min-width: 768px)").matches });
  const arrayImages = [
    { image: "https://www.murhotels.com/cache/40/b3/40b3566310d686be665d9775f59ca9cd.jpg" },
    { image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/ce/0c/66/frente-nocturno.jpg?w=700&h=-1&s=1" },
    { image: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2017/08/03/1943/Park-Hyatt-Mendoza-P041-Facade-Lateral-View.jpg/Park-Hyatt-Mendoza-P041-Facade-Lateral-View.16x9.jpg" },
  ];

  useEffect(() => {
    const handler = (event) => setMediaQuery({ matches: event.matches });
    window.matchMedia("(min-width: 1200px)").addEventListener("change", handler, true);
    return () => {
      window.matchMedia("(min-width: 1200px)").removeEventListener("change", handler, false);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className={style.container}>
        {mediaQuery.matches ? <Carrusel /> : <Card hotels={arrayImages} />}

        <Search />

        <Clima />

        <section className={`${style.section} ${style.one}`}>
          <Card hotels={hotels} />
        </section>
        <section className={`${style.section} ${style.two}`}></section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
