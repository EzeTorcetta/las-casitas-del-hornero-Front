import { Carousel } from "react-bootstrap";
import style from "./CarruselDetail.module.css";

const CarruselDetail = ({ image }) => {
  return (
    <>
      <section className={style.sectionDescription}>
        <div className={style.container}>
          <Carousel className={style.carousel}>
            {image?.map((imagen, index) => (
              <Carousel.Item className={style.item} key={index}>
                <img className={style.img} src={imagen} alt="First slide" />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default CarruselDetail;
