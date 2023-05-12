import { Carousel } from "react-bootstrap";
import style from "./Carrusel.module.css";

const Carrusel = () => {
  return (
    <>
      <div className={style.container}>
        <Carousel className={style.carousel}>
          <Carousel.Item className={style.item}>
            <img
              className={style.img}
              src="https://www.murhotels.com/cache/40/b3/40b3566310d686be665d9775f59ca9cd.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>MUR Aparthotel Buenos Aires</h3>
              <p>
                Apartamentos en Playa del Inglés en San Bartolomé en Gran
                Canaria.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={style.item}>
            <img
              className={style.img}
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/ce/0c/66/frente-nocturno.jpg?w=700&h=-1&s=1"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Hotel Patagonia</h3>
              <p>
                Toda la comodidad y unas vistas paradisíacas de la Patagonia
                Argentina.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={style.item}>
            <img
              className={style.img}
              src="https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2017/08/03/1943/Park-Hyatt-Mendoza-P041-Facade-Lateral-View.jpg/Park-Hyatt-Mendoza-P041-Facade-Lateral-View.16x9.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Park Hyatt Mendoza</h3>
              <p>
                Magnífica fachada Neoclásica de la academia francesa del siglo
                XX.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Carrusel;
