//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import AuthProvider from "../GoogleAuth/AuthProvider";
import { auth } from "../../Firebase/Firebase";
//css
import "./Home.css";
//actions
import {
  FuncionSelectFilter,
  FuncionAllFavoritesHotel,
  GetTrolley,
  getCurrencyBaseAPI,
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
import SwitchButton from "../SwitchButton/SwitchButton";



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
  const estado = useSelector((state) => state);
  const theme = useSelector((state) => state.theme);

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
    if (!currencyExchange.base) dispatch(getCurrencyBaseAPI("ARS"));
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
console.log(theme)
  return (
    
    <div className={theme === 'light' ? 'fullcontainer-light' : 'fullcontainer-dark'}>

      <div>
        <NavBar countCarrito={countCarrito} />
      </div>
      
      <div>
        <Carrusel HotelsCarrusel={HotelsCopi?.allHotels} />
      </div>
      
      <div className="mainsection">
        
        <div>
          <Filter />
        </div>

        <div>

        {Hotels.allHotels?.length ? (
            
              <div>
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
           </div>
  
      ) : (
          <Loading />
      )
      }

        </div>

      </div>

      <div>
        <Clima />
      </div>

      <div>
        <Paginado paginas={Hotels.numPages} />
      </div>
        
      <div>
        <Footer />
      </div>
        
    </div>
  );
};

export default Home;
