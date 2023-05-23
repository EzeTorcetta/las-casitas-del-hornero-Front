import { NavBar, Footer, PedirLocalStorage, GetUsers } from "../Index";
import style from "./PerfilSuperAdmin.module.css";
const PerfilSuperAdmin = () => {
  let User = PedirLocalStorage();

  return (
    <>
      <NavBar />
      <section>
        <div>
          <h1>{`Bienvenido ${User.username}`}</h1>
          <h5> {User.email}</h5>
        </div>
      </section>
      <section>
        <div>
          <h1>Usuarios:</h1>
          <GetUsers />
        </div>
      </section>
      <div className={style.futer}>
        <Footer />
      </div>
    </>
  );
};

export default PerfilSuperAdmin;
