import { NavBar, Footer, PedirLocalStorage, GetUsers } from "../Index";
import style from "./PerfilSuperAdmin.module.css";
import {
  EstadisticasLineal,
  EstadisticasBarra,
  EstadisticasDoughnut,
} from "../../Estadisticas/Estadisticas";
import "./PerfilSuperAdmin.css";
import { useSelector } from "react-redux";

const PerfilSuperAdmin = () => {
  let User = PedirLocalStorage();
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Bienvenido: "Welcome",
      Email: "Your email is",
    },
    es: {
      Bienvenido: "Bienvenido",
      Email: "Tu email es",
    },
  };

  return (
    <>
      <NavBar />
      <section>
        <div className="divDeBienvenido">
          <h1>{translations[idioma].Bienvenido + `${User.username}`}</h1>
          <h3>{translations[idioma].Email + `${User.email}`}</h3>
        </div>
      </section>
      <section>
        <div className="DivGetUsers">
          {/* <h1>Usuarios</h1> */}
          <GetUsers />
        </div>
      </section>
      <section>
        <div className="DivEstadisticas">
          <EstadisticasLineal />
          <EstadisticasBarra />
          <EstadisticasDoughnut />
        </div>
      </section>
      <section className="Footer">
        <Footer />
      </section>
    </>
  );
};

export default PerfilSuperAdmin;
