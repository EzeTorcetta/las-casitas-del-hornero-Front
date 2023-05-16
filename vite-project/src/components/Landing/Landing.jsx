//?---------------------------- IMPORTS --------------------------------
//react
import { Link } from "react-router-dom";
//css
import styles from "./Landing.module.css";
//components
import { FormularioIngresa } from "../Index";
//image
import hornero from "../../assets/horneroleft.jpg";

//?----------------- COMPONENTE LANDING ------------------------------------
const Landing = () => {
  return (
    <div className={styles.fullcontainer}>
      <div className={styles.container}>
        <img src={hornero} alt="hornero" />
      </div>
      <div className={styles.container}>
        <div className={styles.btnrg}>
          <Link to="/Registrar">
            <button type="button" className="btn btn-warning btn-lg btn-block">
              Registrate
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
