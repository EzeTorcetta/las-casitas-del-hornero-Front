import { Carousel } from 'react-bootstrap';
import style from './Home.module.css';

const Home = () => {
  return (
    <>
      <div className={style.container}>
        <Carousel className={style.carousel}>
          <Carousel.Item className={style.item}>
            <img
              // className="d-block w-100"
              src="https://www.murhotels.com/cache/40/b3/40b3566310d686be665d9775f59ca9cd.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>MUR Aparthotel Buenos Aires</h3>
              <p>Apartamentos en Playa del Inglés en San Bartolomé en Gran Canaria.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={style.item}>
            <img
              // className="d-block w-100"
              src="https://images.pxsol.com/3090/company/library/user/489674424008fd8e212c5fa211b9e7f7320b4d77ab.jpg?auto=format&browser=&h=1000&ixlib=php-3.3.1&w=1900&s=8fb0a17b99f93b326086047a3535a6d8"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Hotel Patagonia</h3>
              <p>Toda la comodidad y unas vistas paradisíacas de la Patagonia Argentina.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={style.item}>
            <img
              // className="d-block w-100"
              src="https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2017/08/03/1943/Park-Hyatt-Mendoza-P041-Facade-Lateral-View.jpg/Park-Hyatt-Mendoza-P041-Facade-Lateral-View.16x9.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Park Hyatt Mendoza</h3>
              <p>Magnífica fachada Neoclásica de la academia francesa del siglo XX.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <section className={`${style.section} ${style.one}`}>
          <h1 className={style.h1}>Hoteles</h1>
        </section>
        <section className={`${style.section} ${style.two}`}>
          <h1 className={style.h1}>Mas hoteles</h1>
        </section>
      </div>
    </>
  );
};

export default Home;

{
  /* <>
      <div className={style.container}>
        <section className={`${style.section} ${style.one}`}>
          <Carousel className="h-50 ">
            <Carousel.Item>
              <img className="d-block w-100" src="https://www.murhotels.com/cache/40/b3/40b3566310d686be665d9775f59ca9cd.jpg" alt="First slide" />
              <Carousel.Caption>
                <h3>MUR Aparthotel Buenos Aires</h3>
                <p>Apartamentos en Playa del Inglés en San Bartolomé en Gran Canaria.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pxsol.com/3090/company/library/user/489674424008fd8e212c5fa211b9e7f7320b4d77ab.jpg?auto=format&browser=&h=1000&ixlib=php-3.3.1&w=1900&s=8fb0a17b99f93b326086047a3535a6d8"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Hotel Patagonia</h3>
                <p>Toda la comodidad y unas vistas paradisíacas de la Patagonia Argentina.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2017/08/03/1943/Park-Hyatt-Mendoza-P041-Facade-Lateral-View.jpg/Park-Hyatt-Mendoza-P041-Facade-Lateral-View.16x9.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Park Hyatt Mendoza</h3>
                <p>Magnífica fachada Neoclásica de la academia francesa del siglo XX.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>
        <section className={`${style.section} ${style.two}`}>
          <h1 className={style.h1}>Hoteles</h1>
        </section>
        <section className={`${style.section} ${style.three}`}>
          <h1 className={style.h1}>hoteles</h1>
        </section>
      </div>
    </> */
}
