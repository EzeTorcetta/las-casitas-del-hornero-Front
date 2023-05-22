import { useEffect, useState } from "react";
import { NavBar, Footer, Favoritos, PedirLocalStorage, ReviewPartner } from "../Index";
import PartnerHotels from "../PartnerHotels/PartnerHotels";
import style from "./PerfilColaborador.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FuncionAllPartnerHotel } from "../../redux/Actions/Actions";
import { NavLink } from "react-router-dom";

const PerfilColaborador = () => {
    let User = PedirLocalStorage();
    const dispatch = useDispatch();
    const hotels = useSelector((state) => state.PartnerHotels);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
          dispatch(FuncionAllPartnerHotel(User.id));
          setIsLoading(false);
        }
      }, []);

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
                    <PartnerHotels hotels={hotels}/>

                    <NavLink to={"/FormHotel"}>
                        <p>Agregar Hotel</p>    
                    </NavLink>

                </div>
            </div>
        </section>
        <section className={style.section}>
            <div className={style.divConteiner}>
                <h1>Reviews</h1>
                <ReviewPartner hotels={hotels}/>
            </div>
        </section>
        <Footer />
        </>
    );
};

export default PerfilColaborador;