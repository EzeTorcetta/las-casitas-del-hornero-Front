//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import AuthProvider from "../GoogleAuth/AuthProvider";
import { auth } from "../../Firebase/Firebase";
//css
import style from "./Home.module.css";
//actions
import {
  FuncionSelectFilter,
  FuncionAllFavoritesHotel,
  GetTrolley,
  getCurrencyRateAPI,
} from "../../redux/Actions/Actions";
//components
// import Cards from "../Cards/Cards";
// import Search from "../Search/Search";
import {
  Filter,
  NavBar,
  Footer,
  Clima,
  Carrusel,
  Cards,
  Loading,
  Paginado,
  PedirLocalStorage,
} from "../Index";
import { useNavigate } from "react-router-dom";

//?----------------- COMPONENTE HOME ------------------------------------
const Home = ({ countCarrito, setCountCarrito }) => {
  const dispatch = useDispatch();
  const Hotels = useSelector((state) => state.Hotels);
  const { Filters } = useSelector((state) => state);
  const HotelsCopi = useSelector((state) => state.HotelsCopi);
  let User = PedirLocalStorage();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const navigate = useNavigate();
  const Trolleys = useSelector((state) => state.Trolley);
  const currencyExchange = useSelector(
    (state) => state.currencyExchange
  );

  setCountCarrito((countCarrito = Trolleys.length));

  const handleUserLoggedIn = (user) => {
    setCurrentUser(user);
    setState(2);
  };

  const handleUserNotRegistered = (user) => {
    navigate("/Registrar");
  };

  const handleUserNotLoggedIn = () => {
    navigate("/Registrar");
  };

  useEffect(() => {
    if (User) dispatch(GetTrolley(User.id));
    if (!currencyExchange.rate) dispatch(getCurrencyRateAPI());
    if (!Hotels.allHotels?.length) {
      dispatch(FuncionSelectFilter(Filters));
    }
  }, []);

  if (state === 0 && User?.id === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}></AuthProvider>
    );
  }

  return (
    <>
      <NavBar countCarrito={countCarrito} />
      <div className={style.container}>
        <Carrusel HotelsCarrusel={HotelsCopi?.allHotels} />

        {Hotels.allHotels?.length ? (
          <>
            <section className={`${style.section} ${style.one}`}>
              <div className={style.filtroContainer}>
                <Filter />
              </div>
              <div className={style.divCard}>
                <Row xs={1} sm={2} lg={3} className="g-2">
                  {Hotels.allHotels?.map(
                    ({
                      id,
                      name,
                      image,
                      province,
                      rating,
                      description,
                      valoration,
                    }) => (
                      <Cards
                        key={id}
                        id={id}
                        name={name}
                        image={image}
                        province={province}
                        rating={rating}
                        description={description}
                        valoration={valoration}
                      />
                    )
                  )}
                </Row>
              </div>
            </section>
          </>
        ) : (
          <section className={`${style.section} ${style.one}`}>
            <Loading />
          </section>
        )}

        <Clima />
        <Paginado paginas={Hotels.numPages} />
        <section
          className={`${style.section} ${style.two}`}></section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
