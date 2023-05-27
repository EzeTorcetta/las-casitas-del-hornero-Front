import { NavBar, Footer, PedirLocalStorage, GetUsers } from "../Index";
import style from "./PerfilSuperAdmin.module.css";
import {
  EstadisticasLineal,
  EstadisticasBarra,
  EstadisticasDoughnut,
} from "../../Estadisticas/Estadisticas";
import "./PerfilSuperAdmin.css";

const PerfilSuperAdmin = () => {
  let User = PedirLocalStorage();

  return (
    <>
      <NavBar />
      <section>
        <div className="divDeBienvenido">
          <h1>{`Bienvenido ${User.username}`}</h1>
          <h3>{`Tu email es ${User.email}`}</h3>
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
