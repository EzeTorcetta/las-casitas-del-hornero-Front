import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuncionServices from "./FuncionServicios";
import { useParams } from "react-router-dom";
import TipoHabitacion from "../TypeRoom/TypeRoom";
import Footer from "../Footer/Footer";
import NavDetail from "../Nav/NavDetail";
import style from "./Detail.module.css";
import imagen from "../../image/favorito.png";
import Maps from "../Map/Map";
import imagenCorreo from "../../image/correo-electronico-vacio.png";
import imagenTelefono from "../../image/llamada-telefonica.png";
import {
  FuncionDetailHotel,
  FuncionClearDetail,
} from "../../redux/Actions/Actions";
import CarruselDetail from "../CarruselDetail/CarruselDetail";

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const DetailHotel = useSelector((state) => state.DetailHotel);

  console.log(id);

  useEffect(() => {
    dispatch(FuncionDetailHotel(id));
    return () => {
      dispatch(FuncionClearDetail());
    };
  }, [id]);

  let array = Array(DetailHotel.rating).fill(DetailHotel.rating); // fill agrega al array un elemento x. Array() da la longitud que quiero de un determinado array.

  console.log(DetailHotel.location);

  return (
    <div>
      <>
        <NavDetail />
        <div className={style.div}>
          <div className={`${style.divImg} ${style.carouselContainer}`}>
            <div className={style.divDescription}>
              <h3>{DetailHotel.name}</h3>
              <p className={style.p}>
                Rating :
                {array.map((ranting, index) => (
                  <img className={style.img} src={imagen} key={index} />
                ))}
              </p>
              <h3>
                <img className={style.img} src={imagenTelefono} />{" "}
                {DetailHotel.phoneNumber}
              </h3>
              <p>
                <img className={style.img} src={imagenCorreo} />{" "}
                {DetailHotel.email}
              </p>
              <p>Province: {DetailHotel.province}</p>
              <p>{DetailHotel.direccion}</p>
            </div>
            <div className={style.DivCarrusel}>
              <CarruselDetail image={DetailHotel.image} />
            </div>
          </div>
        </div>
        <section className={style.sectionDescription}>
          <h1>Servicios del alojamiento </h1>
          <br />
          <div className={style.divContenedorServicio}>
            <FuncionServices Services={DetailHotel.Services} />
          </div>
        </section>
        <section className={style.sectionDescription}>
          <h1>Descripción</h1>
          <p>{DetailHotel.description}</p>
        </section>
        {DetailHotel.location && DetailHotel.name && (
          <Maps location={DetailHotel.location} name={DetailHotel.name} />
        )}
        <section className={`${style.section} ${style.two}`}>
          <TipoHabitacion id={id} />
        </section>
        <Footer />
      </>
    </div>
  );
};

export default Detail;
