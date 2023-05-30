//?---------------------------- IMPORTS --------------------------------
//react
import { Link, useNavigate } from "react-router-dom";
//css
import style from "./Landing.module.css";
//components
import { FormularioIngresa, PedirLocalStorage } from "../Index";
//image
import hornero from "../../assets/horneroleft.jpg";
// import title from "../../assets/titulo_logo";
import { useEffect } from "react";

//?----------------- COMPONENTE LANDING ------------------------------------
const Landing = () => {
  const User = PedirLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (User) {
      navigate("/Home");
    }
  }, [User, navigate]);

  if (User) {
    return null;
  }

  return (
    <div className={style.landing_container}>
      <div className={style.container_img}></div>
      <div className={style.container}>
        <div className={style.btnrg}>
          <Link to="/RegistroLocal">
            <button type="button" className="btn btn-lg btn-block">
              Registrate
            </button>
          </Link>
          
        </div>
        <FormularioIngresa />
        
      </div>
      
    </div>
  );
};

export default Landing;
