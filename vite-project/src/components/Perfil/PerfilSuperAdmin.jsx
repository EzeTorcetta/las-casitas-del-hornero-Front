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
import { NavBar, Footer, PedirLocalStorage, GetUsers,GetRequests,GetHotels,GetBookings } from "../Index";
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


  let date = new Date()
  const horas = date.getHours()



  return (
    <>
      <NavBar />
      <div className={style.divContainerGigaChad}>
      <div className={style.divEmail}>

          <p>{`Email: ${User.email}`}</p>
      </div>
      <section>
        <div className="divDeBienvenido">
        {horas <= 12 && horas > 5 && (
      <h1>Buenos días {User.username}</h1>
    )}
    {horas > 12 && horas < 19 && (
      <h1>Buenas tardes {User.username}</h1>
    )}
    {(horas >= 19 || horas <= 5) && (
      <h1>Buenas noches {User.username}</h1>
    )}
        </div>
      </section>
      <section>
        <div className="DivTables">
          {/* <h1>Usuarios</h1> */}
          <GetUsers />
          <GetRequests/>
          <GetHotels/>
          <GetBookings/>
        </div>
      </section>
      <section className="ContainerEst">
        <div className="DivEstadisticas">
          <section>
          <h3>Estadistica 1</h3>
          <EstadisticasLinealValoracionHoteles
            ValoracionHoteles={ValoracionHoteles}
          />
          </section>
          <section>
            <h3>Estadistica 2</h3>
          <EstadisticasLinealTodosLosBookings
            TodosLosBookings={TodosLosBookings}
          />
          </section>
          <section>
            <h3>Estadistica 3</h3>
          <EstadisticasBarraMesMasReservado MesMasReservado={MesMasReservado} />
          </section>
          <section>
            <h3>Estadistica 4</h3>
          <EstadisticasBarraHotelMasReservado
            HotelMasReservado={HotelMasReservado}
          />
          </section>
          <section>
            <h3>Estadistica 5</h3>
          <EstadisticasLinealUsuarioQueMasReservo
            UsuarioQueMasReservo={UsuarioQueMasReservo}
          />
          </section>
          <section>
            <h3>Estadistica 6</h3>
          <EstadisticasLinealProvinciasMasReservada
            ProvinciasMasReservada={ProvinciasMasReservada}
          />
          </section>
         
        </div>
      </section>
      </div>
      <section className="Footer">
        <Footer />
      </section>
    </>
  );
};

export default PerfilSuperAdmin;
