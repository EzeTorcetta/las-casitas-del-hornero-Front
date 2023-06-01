import {
  NavBar,
  Footer,
  Favoritos,
  PedirLocalStorage,
  Booking,
} from "../Index";
import style from "./PerfilUsuario.module.css";
import { GetTrolley } from "../../redux/Actions/Actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import axios from "axios";

const PerfilUsuario = ({ countCarrito, setCountCarrito }) => {
  const Trolleys = useSelector((state) => state.Trolley);
  const dispatch = useDispatch();
  let User = PedirLocalStorage();
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Favoritos: "Favorites",
      Booking: "Booking",
      QuieroSerProveedor: "I want to be a supplier",
    },
    es: {
      Favoritos: "Favoritos",
      Booking: "Reservas",
      QuieroSerProveedor: "Quiero ser proveedor",
    },
  };

  setCountCarrito((countCarrito = Trolleys.length));

  useEffect(() => {
    dispatch(GetTrolley(User.id));
  }, []);

  const FuncionQuieroSerProveedor = async (id_user) => {
    try {
      const response = await axios.post(
        `https://las-casitas-del-hornero-back-deploy.up.railway.app/request`,
        { message: "Quiero ser Proveedor", id_user }
      );
      console.log(response.data);
      swal({
        text: response.data,
        icon: "success",
        buttons: "Aceptar",
      });
    } catch (error) {
      console.log(error.response.data.error);
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  return (
    <>
      <NavBar countCarrito={countCarrito} />
      <div className={style.perfil_container}>
        <div className={style.card_profile}>
          <div className={style.card_profile_left}>
            <div className={style.card_photo}></div>
            <div className={style.card_info}>
              <h2>USUARIO</h2>
              <h2>{`${User.username}`}</h2>
              <h2>{`${User.email}`}</h2>
            </div>
          </div>
          <div className={style.card_profile_right}>
            <button
              className={style.QuieroProveedor}
              onClick={() => FuncionQuieroSerProveedor(User.id)}
            >
              {translations[idioma].QuieroSerProveedor}!
            </button>
          </div>
        </div>

        <div className={style.divFavorites}>
          <h2>{translations[idioma].Favoritos}</h2>
          <div>
            <Favoritos />
          </div>
        </div>

        <div className={style.divRewies}>
          <h2>{translations[idioma].Booking}</h2>
          <Booking />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerfilUsuario;
