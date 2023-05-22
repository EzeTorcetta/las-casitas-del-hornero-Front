import {
  NavBar,
  Footer,
  Favoritos,
  PedirLocalStorage,
  Booking,
} from "../Index";
import style from "./PerfilUsuario.module.css";
import { GetTrolley } from "../../redux/Actions/Actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const PerfilUsuario = ({ countCarrito, setCountCarrito }) => {
  const Trolleys = useSelector((state) => state.Trolley);
  const dispatch = useDispatch();
  let User = PedirLocalStorage();

  setCountCarrito((countCarrito = Trolleys.length));

  useEffect(() => {
    dispatch(GetTrolley(User.id));
  }, []);

  return (
    <>
      <NavBar countCarrito={countCarrito} />
      <section>
        <div className={style.saludo}>
          <h2>Bienvenido {`${User.username}`}</h2>
          <p>{`${User.email}`}</p>
        </div>
      </section>
      <section className={style.section}>
        <div className={style.divFavorites}>
          <br />
          <h1>Tus favoritos</h1>
          <Favoritos />
        </div>
      </section>
      <section className={style.section}>
        <div className={style.divRewies}>
          <h1>Booking</h1>
          <Booking />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PerfilUsuario;
