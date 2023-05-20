import { NavBar, Footer, Favoritos, PedirLocalStorage } from "../Index";
import style from "./Perfil.module.css";

const PerfilUsuario = () => {
  let User = PedirLocalStorage();

  return (
    <>
    <NavBar />
    <section>
      <div>
        <h1>{`${User.username}`}</h1>
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
      <h1>Reviews</h1>
      {/* <Reviews /> */}
      </div>
    </section>
    <Footer />
    </>
  )
};

export default PerfilUsuario;
