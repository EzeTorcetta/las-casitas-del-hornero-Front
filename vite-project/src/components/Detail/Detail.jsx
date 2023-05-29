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
            <div className={style.divDescription}>
              <h3>{DetailHotel.name}</h3>
              <p className={style.p}>
                Rating :
                {array.map((rating, index) => (
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
            <div className={style.divCarrusel}>
              <CarruselDetail image={DetailHotel.image} />
            </div>
          </div>
          <section className={style.sectionDescription}>
            <h1>INFORMACIÓN </h1>
            <section>
              <div className={style.sectionDescription_left}>
                <div className={style.reviewContainer}>
                  <h2>Puntuación de la review</h2>
                </div>
                <div>
                  <h2>Descripcion</h2>
                  {/* <p>{DetailHotel.description}</p> */}
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto alias eligendi sequi non ipsum corporis, aliquam
                    aperiam sunt a excepturi sint sapiente ducimus unde aliquid
                    quos dolorum iusto, impedit in! Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Architecto alias eligendi
                    sequi non ipsum corporis, aliquam aperiam sunt a excepturi
                    sint sapiente ducimus unde aliquid quos dolorum iusto,
                    impedit in! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Architecto alias eligendi sequi non ipsum
                    corporis, aliquam aperiam sunt a excepturi sint sapiente
                    ducimus unde aliquid quos dolorum iusto, impedit in!
                  </p>
                </div>
              </div>
              <div className={style.sectionDescription_right}>
                <div className={style.servicesContainer}>
                  <FuncionServices Services={DetailHotel.Services} />
                </div>
                <div className={style.mapContainer}>
                  <h2>Ubicación</h2>
                  {DetailHotel.location && DetailHotel.name && (
                    <Maps
                      location={DetailHotel.location}
                      name={DetailHotel.name}
                    />
                  )}
                </div>
              </div>
            </section>
          </section>

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
