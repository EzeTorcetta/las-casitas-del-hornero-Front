//?---------------------------- IMPORTS --------------------------------
//react
import { Link, useNavigate } from "react-router-dom";
//css
import styles from "./Landing.module.css";
//components
import { FormularioIngresa, PedirLocalStorage } from "../Index";
//image
import hornero from "../../assets/horneroleft.jpg";
import { useEffect } from "react";
import { useSelector } from "react-redux";

//?----------------- COMPONENTE LANDING ------------------------------------
const Landing = () => {
  const User = PedirLocalStorage();
  const navigate = useNavigate();
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Registrate: "Sign in",
    },
    es: {
      Registrate: "Registrate",
    },
  };

  useEffect(() => {
    if (User) {
      navigate("/Home");
    }
  }, [User, navigate]);

  if (User) {
    return null;
  }

  return (
    <div className={styles.fullcontainer}>
      <div className={styles.container}>
        <img src={hornero} alt="hornero" />
      </div>
      <div className={styles.container}>
        <div className={styles.btnrg}>
          <Link to="/RegistroLocal">
            <button type="button" className="btn btn-warning btn-lg btn-block">
              {translations[idioma].Registrate}
            </button>
          </Link>
        </div>
        <img
          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
          alt=""
        />
        <FormularioIngresa />
      </div>
    </div>
  );
};

export default Landing;
