import NavBar from "../Nav/Nav";
import Footer from "../Footer/Footer";
import style from "./Trolley.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTrolley,
  DeleteAllTrolley,
  DeleteTrolley,
} from "../../redux/Actions/Actions";
import { PedirLocalStorage } from "../Index";
import Card from "react-bootstrap/Card";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Trolley = ({ setCountCarrito, countCarrito }) => {
  const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";
  const dispatch = useDispatch();
  const [ArrayDeCarrito, setArrayDeCarrito] = useState([]);
  const [ObjetoDeCarrito, setObjetoDeCarrito] = useState({});
  const User = PedirLocalStorage();
  const Trolleys = useSelector((state) => state.Trolley);
  const ArrayDeTrolley = Trolleys.map((tro) => {
    return { id: tro.id, amount: tro.amount };
  });
  const [ObjetoDeRoomType, setObjetoDeRoomType] = useState(ArrayDeTrolley);
  //contador de cada uno
  //*---------------------------------contador de cafa tipo de habitacion:

  setCountCarrito((countCarrito = Trolleys.length));

  useEffect(() => {
    dispatch(GetTrolley(User.id));
  }, [Trolley]);

  const FuncionReservar = async (idUser) => {
    try {
      const response = await axios.put(
        `${URL_BASE}/booking/${idUser}` /*array de objetos*/
      );

      swal({
        text: "Habitacion/es reservadas con exito!!!",
        icon: "saccess",
        buttons: "Aceptar",
      });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  //*---------------------Funcion de Botones para contador Individual:

  //*---------------------Funcion de Botones para contador Familiar:

  //*---------------------Funcion de Botones para contador Suite:

  //*---------------------------------------------------------

  const FuncionCount = async (value, idUser, id_Rommtype) => {
    // response =  put  `${URL_BASE}/cart/${idUser}/${id_Rommtype}?putAmount=${up - down}

    try {
      const response = await axios.put(
        `${URL_BASE}/cart/${idUser}/${id_Rommtype}?putAmount=${value}`
      );

      const objeto = (ObjetoDeRoomType.find(
        (tro) => tro.id === id_Rommtype
      ).amount = response.data);

      // console.log(objetoFiltrado);

      // const Objeto = { ...objetoFiltrado, amount: response.data };

      // setObjetoDeCarrito(Objeto);

      setObjetoDeRoomType([...ObjetoDeRoomType, objeto]);

      console.log(response.data);
      // setCount(response.data);
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

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
        <button
          className={style.botonEliminar}
          onClick={() => FuncionDeleteAllCarritos(User.id)}
        >
          Delete All Trolleys
        </button>
        <button
          onClick={() => FuncionReservar(User.id)}
          className={style.button}
        >
          <span>Reservar</span>
        </button>
      </div>
      <section className={style.section}>
        {Trolleys?.map(({ id, name, image, price, stock, people, amount }) => (
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
                <Card.Subtitle className="mb-2 text-muted">{`$  ${price}`}</Card.Subtitle>
                <Card.Text>People: {people}</Card.Text>
                <img className={style.img} src={image} />
                <Card.Text>stock :{stock}</Card.Text>
                <div className={style.divCount}>
                  <button
                    value="up"
                    className={style.botonCount}
                    onClick={() => FuncionCount("up", User.id, id)}
                  >
                    +
                  </button>
                  <div className={style.spanCount}>
                    {ObjetoDeRoomType.find((tro) => tro.id === id)?.amount}
                  </div>
                  <button
                    value="down"
                    className={style.botonCount}
                    onClick={() => FuncionCount("down", User.id, id)}
                  >
                    -
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
};

export default Trolley;

{
  /* {name === "Individual" ? (
  <div className={style.divCount}>
    <button
      value="up"
      className={style.botonCount}
      //onClick={() => FuncionIncrementCountIndividual(id)}
    >
      +
    </button>
    <div className={style.spanCount}></div>
    <button
      value="down"
      className={style.botonCount}
      // onClick={FuncionDecrementCountIndividual}
    >
      -
    </button>
  </div>
) : name === "Suite" ? (
  <div className={style.divCount}>
    <button
      value="up"
      className={style.botonCount}
      // onClick={() => FuncionIncrementCountSuite(id)}
    >
      +
    </button>

    <div className={style.spanCount}>
      {/* {countHabitacionSuite} 
    </div>
    <button
      value="down"
      className={style.botonCount}
      // onClick={FuncionDecrementCountSuite}
    >
      -
    </button>
  </div>
) : (
  <div className={style.divCount}>
    <button
      value="up"
      className={style.botonCount}
      // onClick={() => FuncionIncrementCountFamiliar(id)}
    >
      +
    </button>
    <div className={style.spanCount}>
       {countHabitacionFamiliar} 
    </div>
    <button
      value="down"
      className={style.botonCount}
      //  onClick={FuncionDecrementCountFamiliar}
    >
      -
    </button>
  </div>
)} */
}
