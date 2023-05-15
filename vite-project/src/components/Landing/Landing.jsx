import styles from './Landing.module.css';
import { Link } from 'react-router-dom';
import hornero from "../../assets/horneroleft.jpg";
import { FormularioIngresa } from '../Index';

const Landing = () => {
  return (
    <div className={styles.fullcontainer}>
      <div className={styles.container}>
          <img src={hornero} alt='hornero'/>
      </div>
      <div className={styles.container}>
        <div  className={styles.btnrg}>
          <Link to="/Registrar">
          <button type="button" class="btn btn-warning btn-lg btn-block">Registrate</button>
          </Link>
        </div>
        <img
            src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
            alt=""
          />
        <FormularioIngresa/>
      </div>
    </div>
  );
}

export default Landing;