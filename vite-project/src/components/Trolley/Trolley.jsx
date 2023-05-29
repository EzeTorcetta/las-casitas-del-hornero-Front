import NavBar from "../Nav/Nav";
import Footer from "../Footer/Footer";
import style from "./Trolley.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTrolley,
  DeleteAllTrolley,
  DeleteTrolley,
  putAmountTrolley,
} from "../../redux/Actions/Actions";
import { PedirLocalStorage } from "../Index";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Calendario from "../Calendar/FullCalendar";

const Trolleys = ({ setCountCarrito, countCarrito }) => {
  const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";
  const dispatch = useDispatch();
  const User = PedirLocalStorage();
  const Trolley = useSelector((state) => state.Trolley);
  const ObjetoTrolley = useSelector((state) => state.ObjetoTrolley);
  const [isLoading, setIsLoading] = useState(true);
  const [TotalPrecio, setTotalPrecio] = useState([]);

  const navigate = useNavigate();
  console.log(Trolley);

  useEffect(() => {
    if (!User) {
      navigate("/Home");
    }
  }, [User, navigate]);

  if (!User) {
    return null;
  }

  // const [ObjetoCount, setObjetoCount] = useState({});

  const ArrayCarritoModificado = Trolley.map((tro) => {
    // setObjetoCount({ id: tro.id, count: tro.amount });
    return { id: tro.id, amount: tro.amount };
  });
  const totalPrecio = Trolley.reduce((total, { price, amount }) => {
    return total + Math.ceil(price * amount);
  }, 0); // destructuro  { price, amount } de cada objeto del array.
  // const [ArrayCount, setArrayCount] = useState(ArrayCarritoModificado);
  //contador de cada uno
  //*---------------------------------contador de cafa tipo de habitacion:

  setCountCarrito(Trolley.length);

  useEffect(() => {
    if (isLoading) {
      dispatch(GetTrolley(User.id));
      setIsLoading(false);
    }
  }, [ObjetoTrolley, Trolley]);

  const FuncionReservar = async (idUser, email) => {
    if (Trolley.length) {
      try {
        await axios.get(
          `https://las-casitas-del-hornero-back-deploy.up.railway.app/email/Reserva/${email}`
        );
        await axios.put(
          `${URL_BASE}/booking/${idUser}`,
          ArrayCarritoModificado
        );
        swal({
          text: "Habitacion/es reservadas con exito!!!",
          icon: "success",
          buttons: "Aceptar",
        });
        dispatch(DeleteAllTrolley(idUser));
      } catch (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: "Aceptar",
        });
      }
    } else {
      swal({
        text: "No hay ningun Hotel Para reservar",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  //*---------------------modificacion del contador:

  const FuncionCount = async (value, idUser, id_Rommtype) => {
    await dispatch(putAmountTrolley(value, idUser, id_Rommtype));
    await dispatch(GetTrolley(User.id));
    //dispatch(UpdateTrolley(updatedTrolley)); // Actualiza el estado del carrito con el nuevo arreglo

    if (ObjetoTrolley.amount) {
      const objeto = Trolley.find((tro) => tro.id === id_Rommtype);

      const PrecioBase = objeto.price;

      const newAmount =
        value === "up" ? ObjetoTrolley.amount + 1 : ObjetoTrolley.amount - 1;
      const newPrice = PrecioBase * newAmount;
      console.log(newPrice);

      console.log(TotalPrecio);
    }
  };

  //*---------------------------------------------------------

  const FuncionDeleteCarrito = (idUser, idTypeRoom) => {
    setCountCarrito(countCarrito - 1);
    dispatch(DeleteTrolley(idUser, idTypeRoom));
  };

  const FuncionDeleteAllCarritos = (idUser) => {
    setCountCarrito((countCarrito = 0));
    dispatch(DeleteAllTrolley(idUser));
  };

  return (
    <>
      <NavBar countCarrito={countCarrito} />
      <div className={style.divBotonEliminarTodo}>
        <div className={style.divCalendario}>
          <Calendario id={User.id} />
        </div>
        <button
          className={style.botonEliminar}
          onClick={() => FuncionDeleteAllCarritos(User.id)}
        >
          Vaciar Carrito
        </button>
        <button
          onClick={() => FuncionReservar(User.id, User.email)}
          className={style.button}
        >
          <span>Reservar</span>
        </button>
      </div>
      <section className={style.section}>
        {Trolley?.map(({ id, name, image, price, stock, people, amount }) => (
          <div className={style.CardCarrito} key={id}>
            <Card style={{ width: "18rem", margin: "10px" }}>
              <Card.Body>
                <button
                  className={style.BotonElinimarCarrito}
                  onClick={() => FuncionDeleteCarrito(User.id, id)}
                >
                  X
                </button>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Precio:
                  {`$  ${price}`}
                </Card.Subtitle>
                <Card.Text>People: {people}</Card.Text>
                <img className={style.img} src={image} />
                <Card.Text>stock :{stock}</Card.Text>
                <div className={style.divCount}>
                  <button
                    value="up"
                    className={style.botonCount}
                    onClick={() => FuncionCount("up", User.id, id, stock)}
                    disabled={amount === stock || amount > stock}
                  >
                    +
                  </button>
                  <div className={style.spanCount}>
                    {ObjetoTrolley.id === id ? ObjetoTrolley.amount : amount}
                    {/*ESTA MAL ESTO*/}
                  </div>
                  <button
                    value="down"
                    className={style.botonCount}
                    onClick={() => FuncionCount("down", User.id, id, stock)}
                    disabled={amount <= 1}
                  >
                    -
                  </button>
                </div>
                {/* <button onClick={FuncionConfirmar}>Confirmar</button> */}
              </Card.Body>
            </Card>
          </div>
        ))}
      </section>

      <div className={style.divTotalPrecio}>
        <h1 className={style.h1}>Precio Total : ${totalPrecio}</h1>
      </div>

      <Footer />
    </>
  );
};

export default Trolleys;
