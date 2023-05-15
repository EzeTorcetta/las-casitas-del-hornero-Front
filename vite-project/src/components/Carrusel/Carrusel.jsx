import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./Carrusel.module.css";

const Carrusel = ({ Hotels1 }) => {
  console.log(Hotels1);
  return (
    <>
      <div>
        <Carousel className={style.carousel}>
          {Hotels1 ? (
            Hotels1?.map(({ id, name, image, decription }) => {
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
            })
          ) : (
            <Carousel.Item className={style.item}>
              <img
                className={style.img}
                src="https://www.cronista.com/files/image/159/159758/5ff7d1a380650.jpg"
                alt="loading"
              />
              <Carousel.Caption>
                {/* <h3>{Hotels1.name}</h3>
                  <p>{Hotels1.decription}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    </>
  );
};

export default Carrusel;
