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
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Favoritos: "Favorites",
      Booking: "Booking",
    },
    es: {
      Favoritos: "Favoritos",
      Booking: "Reservas",
    },
  };

  setCountCarrito((countCarrito = Trolleys.length));

  useEffect(() => {
    dispatch(GetTrolley(User.id));
  }, []);

  return (
    <>
      <NavBar countCarrito={countCarrito} />
      <div className={style.perfil_container}>
        <section>
          <div className={style.saludo}>
            <h2>{`${User.username}`}</h2>
            <p>{`${User.email}`}</p>
          </div>
        </section>
        <section className={style.section}>
          <div className={style.divFavorites}>
            <h2>{translations[idioma].Favoritos}</h2>
            <Favoritos />
          </div>
        </section>
        <section className={style.section}>
          <div className={style.divRewies}>
            <h2>{translations[idioma].Booking}</h2>
            <Booking />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default PerfilUsuario;
