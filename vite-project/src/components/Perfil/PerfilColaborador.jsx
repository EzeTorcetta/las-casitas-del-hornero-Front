import { NavBar, Footer, Favoritos, PedirLocalStorage } from "../Index";
import style from "./Perfil.module.css";
const PerfilColaborador = () => {
    let User = PedirLocalStorage();

    return (
        <>
        <NavBar />
        <section>
            <div>
                <h1>{`${User.username}`}</h1>
                <h3>{`${User.email}`}</h3>
            </div>
        </section>
        <section className={style.section}>
            <div className={style.divFavorites}>
                <br />
                <h1>Tus Hoteles</h1>
            </div>
        </section>
        <Footer />
        </>
    );
};

export default PerfilColaborador;