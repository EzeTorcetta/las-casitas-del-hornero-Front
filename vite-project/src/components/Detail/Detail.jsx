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
import { FuncionDetailHotel, FuncionClearDetail } from "../../redux/Actions/Actions";
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
          <div className={style.divImg}>
            <CarruselDetail image={DetailHotel.image} />
            <div className={style.divDescription}>
              <h3>Name: {DetailHotel.name}</h3>
              <h3>PhoneNumber: {DetailHotel.phoneNumber}</h3>
              <p>Email: {DetailHotel.email}</p>
              <p>Province: {DetailHotel.province}</p>
              <p>{DetailHotel.direccion}</p>
              {array.map((ranting, index) => (
                <img className={style.img} src={imagen} key={index} />
              ))}
            </div>
          </div>
        </div>
        <section className={style.sectionDescription}>
          <FuncionServices Services={DetailHotel.Services} />
          {/* {DetailHotel.Services?.map((Ser) => (
            <h2>{Ser.name}</h2>
          ))} */}
          {/* {DetailHotel.Services && (
            <FuncionServices Services={DetailHotel.Services} />
          )} */}
        </section>
        <section className={style.sectionDescription}>
          <h1>Descripción:</h1>
          <p>{DetailHotel.description}</p>
        </section>
        {DetailHotel.location && DetailHotel.name && <Maps location={DetailHotel.location} name={DetailHotel.name} />}
        <section className={`${style.section} ${style.two}`}>
          <TipoHabitacion id={id} />
        </section>
        <Footer />
      </>
    </div>
  );
};

export default Detail;
