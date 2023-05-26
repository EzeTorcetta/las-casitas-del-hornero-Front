//?---------------------------- IMPORTS --------------------------------
//react
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
//css
import "./Carrusel.css";

//?----------------- COMPONENTE CARRUSEL ------------------------------------
const Carrusel = ({ HotelsCarrusel }) => {
  return (
    <div className="carrusel-container">
      <Carousel>
        {HotelsCarrusel ? (
          HotelsCarrusel?.map(({ id, name, image, decription }) => {
            return (
              <Carousel.Item className='items' key={id}>
                <Link to={`/detail/${id}`}>
                  <img className='imgenes' src={image[0]} alt="loading" />
                  <Carousel.Caption>
                    <h3>{name}</h3>
                    <p>{decription}</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            );
          })
        ) : (
          <Carousel.Item className='items'>
            <img
              className='imgenes'
              src="https://www.cronista.com/files/image/159/159758/5ff7d1a380650.jpg"
              alt="loading"
            />
            <Carousel.Caption />
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default Carrusel;
