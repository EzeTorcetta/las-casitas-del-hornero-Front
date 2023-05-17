import { useSelector } from "react-redux";
import { NavBar, Footer, Favoritos } from "../Index";
import style from "./Perfil.module.css";

const Perfil = () => {
  const User = useSelector((state) => state.User);
  const { email, username } = User;

  return (
    <>
      <NavBar />
      <section className={style.section}>
        <div>
          <h1>Usuario : {`${username}`}</h1>
          <h1>Email : {`${email}`}</h1>
          <Favoritos />
        </div>
      </section>
      <section className={style.section}>
        <h1>Reviews</h1>
      </section>
      <Footer />
    </>
  );
};

export default Perfil;
