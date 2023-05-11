import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavDetail from "../Nav/NavDetail";
import style from "./Detail.module.css";
import imagen from "../image/favorito.png";
import Maps from "../Map/Map";
import {
  FuncionDetailHotel,
  FuncionClearDetail,
} from "../../redux/Actions/Actions";
import CarruselDetail from "../CarruselDetail/CarruselDetail";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const DetailHotel = useSelector((state) => state.DetailHotel);

  // useEffect(() => {
  //   dispatch(FuncionDetailHotel(id));
  //   return () => {
  //     dispatch(FuncionClearDetail());
  //   };
  // }, []);
  // const {
  //   name,
  //   telefono,
  //   email,
  //   imagen,
  //   Provincia,
  //   Direccion,
  //   Precio,
  //   Capacidad,
  // } = DetailHotel;

  const hotel = {
    id: 1,
    name: "MustafaHotel",
    email: "mustafahotel@gmail.com",
    phoneNumber: "01134531",
    province: "BUENOS AIRES",
    location: [1200, -1200],
    direccion: "Camaño y Bazan 4890",
    rating: 2,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ab expedita, odit nostrum aut alias? Id a quibusdam quidem quis velit minima voluptatem illum eaque esse mollitia quo, nemo perspiciatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ab expedita, odit nostrum aut alias? Id a quibusdam quidem quis velit minima voluptatem illum eaque esse mollitia quo, nemo perspiciatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ab expedita, odit nostrum aut alias? Id a quibusdam quidem quis velit minima voluptatem illum eaque esse mollitia quo, nemo perspiciatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ab expedita, odit nostrum aut alias? Id a quibusdam quidem quis velit minima voluptatem illum eaque esse mollitia quo, nemo perspiciatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ab expedita, odit nostrum aut alias? Id a quibusdam quidem quis velit minima voluptatem illum eaque esse mollitia quo, nemo perspiciatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ab expedita, odit nostrum aut alias? Id a quibusdam quidem quis velit minima voluptatem illum eaque esse mollitia quo, nemo perspiciatis.",
    image: [
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partnerimages/10/96/109659414.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/uploadimages/34/68/34686940.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partnerimages/10/96/109659420.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partnerimages/12/04/120441352.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/partnerimages/81/14/811467042.jpeg",
      "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/uploadimages/34/68/34687000.jpeg",
    ],
  };

  let array = Array(hotel.rating).fill(hotel.rating); // fill agrega al array un elemento x. Array() da la longitud que quiero de un determinado array.

  return (
    <div>
      <>
        <NavDetail />
        <div className={style.div}>
          <div className={style.divImg}>
            <CarruselDetail image={hotel.image} />
            <div className={style.divDescription}>
              <h3>Name: {hotel.name}</h3>
              <h3>PhoneNumber: {hotel.phoneNumber}</h3>
              <p>Email: {hotel.email}</p>
              <p>Province: {hotel.province}</p>
              <p>{hotel.direccion}</p>
              {array.map((ranting) => (
                <img className={style.img} src={imagen} />
              ))}
            </div>
          </div>
        </div>
        <section className={style.sectionDescription}>
          <h1>Descripción:</h1>
          <p>{hotel.description}</p>
        </section>
        <Maps
          location={hotel.location}
          name={hotel.name}
          direccion={hotel.direccion}
        />
        <section className={`${style.section} ${style.two}`}>
          <h1>Habitaciones</h1>
        </section>
        <Footer />
      </>
    </div>
  );
};

export default Detail;
