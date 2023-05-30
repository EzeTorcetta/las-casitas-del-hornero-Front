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
        <section>
          <div className={style.saludo}>
            <h2>{`${User.username}`}</h2>
            <p>{`${User.email}`}</p>
          </div>
          <button
            className={style.QuieroProveedor}
            onClick={() => FuncionQuieroSerProveedor(User.id)}
          >
            Quiero ser Proveedor!
          </button>
        </section>
        <section className={style.section}>
          <div className={style.divFavorites}>
            <h2>favoritos</h2>
            <Favoritos />
          </div>
        </section>
        <section className={style.section}>
          <div className={style.divRewies}>
            <h2>Booking</h2>
            <Booking />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default PerfilUsuario;
