//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
//components
import {
  CarruselDetail,
  FuncionServices,
  Maps,
  NavBar,
  TypeRoom,
  Footer,
  Error404,
} from "../Index";
//actions
import {
  FuncionDetailHotel,
  FuncionClearDetail,
  GetTrolley,
  idHotelForm,
} from "../../redux/Actions/Actions";
//image
import imagen from "../../image/favorito.png";
import imagenCorreo from "../../image/correo-electronico-vacio.png";
import imagenTelefono from "../../image/llamada-telefonica.png";
import { PedirLocalStorage } from "../Index";
//css
import style from "./Detail.module.css";
import Reviews from "../Reviews/Reviews";

//?----------------- COMPONENTE DETAIL ------------------------------------
const Detail = ({ setCountCarrito, countCarrito }) => {
  const { id } = useParams();
  const User = PedirLocalStorage();
  const dispatch = useDispatch();
  const DetailHotel = useSelector((state) => state.DetailHotel);
  const Trolleys = useSelector((state) => state.Trolley);

  useEffect(() => {
    if (User?.id) {
      dispatch(FuncionDetailHotel(id));
      dispatch(GetTrolley(User.id, undefined, undefined));
    }
    return () => {
      dispatch(FuncionClearDetail());
    };
  }, [id]);

  setCountCarrito((countCarrito = Trolleys.length));

  const setHotel = async () => {
    await dispatch(idHotelForm(id));
  };

  let array = Array(DetailHotel.rating).fill(DetailHotel.rating); // fill agrega al array un elemento x. Array() da la longitud que quiero de un determinado array.

  return (
    <>
      {!User ? (
        <Error404 />
      ) : (
        <div>
          <NavBar countCarrito={countCarrito} />
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
                  <img className={style.img} src={imagenTelefono} />
                  {DetailHotel.phoneNumber}
                </h3>
                <p>
                  <img className={style.img} src={imagenCorreo} />
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
            <TypeRoom
              Trolleys={Trolleys}
              name={DetailHotel.name}
              setCountCarrito={setCountCarrito}
              countCarrito={countCarrito}
              id={id}
            />
            {User.rol === 2 ? (
              <NavLink to="/FormRoomType">
                <p onClick={setHotel}>Agregar Room Type</p>
              </NavLink>
            ) : (
              ""
            )}
          </section>
          <Reviews />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Detail;
