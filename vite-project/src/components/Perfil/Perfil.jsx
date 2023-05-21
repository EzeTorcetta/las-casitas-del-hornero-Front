import { useSelector, useDispatch } from "react-redux";
import { NavBar, Footer, Favoritos, PedirLocalStorage } from "../Index";
import { GetTrolley } from "../../redux/Actions/Actions";
import style from "./Perfil.module.css";
import { useEffect } from "react";

const Perfil = ({ countCarrito, setCountCarrito }) => {
  const Trolleys = useSelector((state) => state.Trolley);
  const dispatch = useDispatch();
  let User = PedirLocalStorage();

  // const User = useSelector((state) => state.User);
  let { rol } = User;

  setCountCarrito((countCarrito = Trolleys.length));

  useEffect(() => {
    dispatch(GetTrolley(User.id));
  }, []);

  return (
    <>
      {rol === 2 ? (
        <>
          <NavBar />
          <section className={style.section}></section>
          <div className={style.divRewies}>
            <h1>Reviews Hotel</h1>
          </div>
          <Footer />
        </>
      ) : rol === 1 ? (
        <>
          <NavBar countCarrito={countCarrito} />
          <section className={style.section}>
            <div className={style.divFavorites}>
              <br />
              <h1>Tus favoritos</h1>
              <Favoritos />
            </div>
          </section>
          <section className={style.section}>
            <div className={style.divRewies}>
              <h1>Reviews</h1>
            </div>
          </section>
          <Footer />
        </>
      ) : (
        <>
          <NavBar />
          <section className={style.section}></section>
          <section className={style.section}></section>
          <Footer />
        </>
      )}
    </>
  );
};

export default Perfil;
