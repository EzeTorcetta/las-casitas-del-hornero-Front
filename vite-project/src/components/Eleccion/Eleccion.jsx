import styles from "./Eleccion.module.css";
import { Link } from "react-router-dom";

const Eleccion = () => {
  return (
    <div className={styles.DivPadre}>
      <div className={styles.Div}>
        <div className={styles.divEleccion}>
          <h1>REGISTRARSE COMO :</h1>
          <Link to="/FormularioUser">
            <button className={styles.button}>Usuario</button>
          </Link>
          <Link to="/FormularioAdmin">
            <button className={styles.button}>Administrador</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Eleccion;
