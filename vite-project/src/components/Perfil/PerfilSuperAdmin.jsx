import { useEffect } from "react";
import {
  FuncionHotelesMasReservadosEstadistica,
  FuncionProvinciasMasReservaronEstadistica,
  FuncionTodosLosBookingsEstadistica,
  FuncionMesMasReservadoEstadistica,
  FuncionValoracionHotelEstadistica,
  FuncionUsuariosQueMasReservaronEstadistica,
} from "../../redux/Actions/Actions";
import {
  EstadisticasLinealValoracionHoteles,
  EstadisticasLinealTodosLosBookings,
  EstadisticasBarraMesMasReservado,
  EstadisticasBarraHotelMasReservado,
  EstadisticasLinealUsuarioQueMasReservo,
  EstadisticasLinealProvinciasMasReservada,
} from "../../Estadisticas/EstadisticasSuperAdmin";
import { NavBar, Footer, PedirLocalStorage, GetUsers } from "../Index";
import "./PerfilSuperAdmin.css";
import { useDispatch, useSelector } from "react-redux";
import style from "./PerfilSuperAdmin.module.css";

const PerfilSuperAdmin = () => {
  const dispatch = useDispatch();
  const {
    ValoracionHoteles,
    TodosLosBookings,
    MesMasReservado,
    HotelMasReservado,
    UsuarioQueMasReservo,
    ProvinciasMasReservada,
  } = useSelector((state) => state.Estadisticas);
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

  useEffect(() => {
    dispatch(FuncionHotelesMasReservadosEstadistica(User.id));
    dispatch(FuncionProvinciasMasReservaronEstadistica(User.id));
    dispatch(FuncionMesMasReservadoEstadistica(User.id));
    dispatch(FuncionValoracionHotelEstadistica(User.id));
    dispatch(FuncionUsuariosQueMasReservaronEstadistica(User.id));
    dispatch(FuncionTodosLosBookingsEstadistica(User.id, User.rol));
  }, []);


  return (
    <>
      <NavBar />
      <section>
        <div className="divDeBienvenido">
          <h1>{`Bienvenido ${User.username}`}</h1>
          <h3>{`Tu email es : ${User.email}`}</h3>
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
          <EstadisticasLinealValoracionHoteles
            ValoracionHoteles={ValoracionHoteles}
          />
          <EstadisticasLinealTodosLosBookings
            TodosLosBookings={TodosLosBookings}
          />
          <EstadisticasBarraMesMasReservado MesMasReservado={MesMasReservado} />
          <EstadisticasBarraHotelMasReservado
            HotelMasReservado={HotelMasReservado}
          />

          <EstadisticasLinealUsuarioQueMasReservo
            UsuarioQueMasReservo={UsuarioQueMasReservo}
          />

          <EstadisticasLinealProvinciasMasReservada
            ProvinciasMasReservada={ProvinciasMasReservada}
          />
        </div>
      </section>
      <section className="Footer">
        <Footer />
      </section>
    </>
  );
};

export default PerfilSuperAdmin;
