import { useEffect, useState } from "react";
import { NavBar, Footer, PedirLocalStorage, ReviewPartner } from "../Index";
import PartnerHotels from "../PartnerHotels/PartnerHotels";
import style from "./PerfilColaborador.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  FuncionAllPartnerHotel,
  FuncionMesDondeMasSeReservaPartnerEstadistica,
  FuncionHotelesMasReservadosPartnerEstadistica,
} from "../../redux/Actions/Actions";
import {
  EstadisticasLinealPartner,
  EstadisticasBarraPartner,
} from "../../Estadisticas/EstadisticaProveedor";
import { NavLink } from "react-router-dom";

const PerfilColaborador = () => {
  let User = PedirLocalStorage();
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.PartnerHotels);
  const { HotelesMasReservadosPartner, MesDondeMasSeReservoPartner } =
    useSelector((state) => state.EstadisticasPartner);
  const [isLoading, setIsLoading] = useState(true);
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      TusHoteles: "Your Hotels",
      AgregarHotel: "Add Hotel",
      Reviews: "Reviews",
    },
    es: {
      TusHoteles: "Tus Hoteles",
      AgregarHotel: "Agregar Hotel",
      Reviews: "Reseñas",
    },
  };
  
  useEffect(() => {
    if (isLoading) {
      dispatch(FuncionAllPartnerHotel(User.id));
      dispatch(FuncionMesDondeMasSeReservaPartnerEstadistica(User.id));
      dispatch(FuncionHotelesMasReservadosPartnerEstadistica(User.id));
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
          <h1>{translations[idioma].TusHoteles}</h1>
          <div className={style.divHotels}>
            <br />
            <PartnerHotels hotels={hotels} />
            <NavLink to={"/FormHotel"}>
              <p>Agregar Hotel</p>
            </NavLink>
          </div>
        </div>
      </section>
      <section className={style.section}>
        <div className={style.divConteiner}>
          <h1>{translations[idioma].Reviews}</h1>
          <ReviewPartner hotels={hotels} />
        </div>
        <div>
          <h1>Stats</h1>
          <EstadisticasLinealPartner
            MesDondeMasSeReservoPartner={MesDondeMasSeReservoPartner}
          />
          <EstadisticasBarraPartner
            HotelesMasReservadosPartner={HotelesMasReservadosPartner}
          />
        </div>

      </section>
      <Footer />
    </>
  );
};

export default PerfilColaborador;
