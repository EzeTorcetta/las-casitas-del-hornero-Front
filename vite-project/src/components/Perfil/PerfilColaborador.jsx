import { NavBar, Footer, Favoritos, PedirLocalStorage } from "../Index";
import PartnerHotels from "../PartnerHotels/PartnerHotels";
import style from "./PerfilColaborador.module.css";
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
            <div className={style.divConteiner}>
                <h1>Tus Hoteles</h1>
                <div className={style.divHotels}>
                    <br />
                    <PartnerHotels/>    
                    <button>Agregar Hoteles</button>
                </div>
            </div>
        </section>
        <section className={style.section}>
            <div className={style.divConteiner}>
                <h1>Reservas</h1>
            </div>
        </section>
        <section className={style.section}>
            <div className={style.divConteiner}>
                <h1>Reviews</h1>
            </div>
        </section>
        <Footer />
        </>
    );
};

export default PerfilColaborador;