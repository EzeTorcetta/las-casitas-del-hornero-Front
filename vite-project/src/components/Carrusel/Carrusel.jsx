import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./Carrusel.module.css";

const Carrusel = ({ Hotels }) => {
  return (
    <>
      <div className={style.container}>
        <Carousel className={style.carousel}>
          {Hotels?.map(({ id, name, image, decription }) => {
            return (
              <Carousel.Item className={style.item} key={id}>
                <Link to={`/detail/${id}`}>
                  <img className={style.img} src={image[0]} alt="loading" />
                  <Carousel.Caption>
                    <h3>{name}</h3>
                    <p>{decription}</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Carrusel;
