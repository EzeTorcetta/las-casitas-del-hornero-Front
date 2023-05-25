//?---------------------------- IMPORTS --------------------------------
//react
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
//css
import style from "./Carrusel.module.css";

//?----------------- COMPONENTE CARRUSEL ------------------------------------
const Carrusel = ({ HotelsCarrusel }) => {
  return (
    <div>
      <Carousel className={style.carousel}>
        {HotelsCarrusel ? (
          HotelsCarrusel?.map(({ id, name, image, decription }) => {
            return (
              <Carousel.Item className={style.item} key={id}>
                <Link to={`/detail/${id}`}>
                  <img className={style.img} src={image[0]} alt="loading" />
                  <Carousel.Caption>
                    <h3 className={style.carousel_h3}>{name}</h3>
                    <p>{decription}</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            );
          })
        ) : (
          <Carousel.Item className={style.item}>
            <img
              className={style.img}
              src="https://www.cronista.com/files/image/159/159758/5ff7d1a380650.jpg"
              alt="loading"
            />
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default Carrusel;
