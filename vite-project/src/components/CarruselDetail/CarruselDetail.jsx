import { Carousel } from "react-bootstrap";
import style from "./CarruselDetail.module.css";

const CarruselDetail = ({ image }) => {
  return (
    <>
      <div className={style.container}>
        <Carousel className={style.carousel}>
          {image.map((imagen) => (
            <Carousel.Item className={style.item}>
              <img
                // className="d-block w-100"
                className={style.img}
                src={imagen}
                alt="First slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default CarruselDetail;
