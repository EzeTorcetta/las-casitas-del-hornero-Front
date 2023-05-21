import { NavBar, Footer, Favoritos, PedirLocalStorage, Booking } from "../Index";
import style from "./Perfil.module.css";

const PerfilUsuario = () => {
  let User = PedirLocalStorage();

  return (
    <>
    <NavBar />
    <section>
      <div>
        <h1>{`Buenos dias ${User.username}!`}</h1>
        <h3>{`${User.email}`}</h3>
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
      {/* get booking user, mandar id y rol por query, ruta: /booking?id_user=&rol=1*/}
      </div>
    </section>
    <Footer />
    </>
  )
};

export default PerfilUsuario;
