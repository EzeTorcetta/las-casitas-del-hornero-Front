import { useSelector } from "react-redux";
import { NavBar, Footer, Favoritos, PedirLocalStorage } from "../Index";
import style from "./Perfil.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";

const Perfil = () => {
  let User = PedirLocalStorage();
  const navigate = useNavigate();
  // const User = useSelector((state) => state.User);
  
  React.useEffect(() => {
    if (!User) {
      navigate("/Home");
    }
  }, [User, navigate]);

  if (!User) {
    return null;
  }

  let { rol } = User;

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
          <NavBar />
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
