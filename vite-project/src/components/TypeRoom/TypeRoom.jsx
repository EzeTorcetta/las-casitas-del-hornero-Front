//?---------------------------- IMPORTS --------------------------------
//react
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import { PedirLocalStorage } from "../Index";
import GetCurrencyExchange from "../CurrencyExchange/GetCurrencyExchange";
import swal from "sweetalert";
import style from "./TypeRoom.module.css";
//action
import {
  FuncionTypeRoomTypes,
  GetTrolley,
} from "../../redux/Actions/Actions";
import { v4 as uuidv4 } from "uuid";

//?----------------- COMPONENTE ROOM TYPE  ------------------------------------
const TypeRoom = ({
  id,
  setCountCarrito,
  countCarrito,
  name,
  Trolleys,
}) => {
  const URL_BASE =
    "https://las-casitas-del-hornero-back-deploy.up.railway.app";
  const User = PedirLocalStorage();
  const dispatch = useDispatch();
  const [State, setState] = useState([]);
  const { TypeRoom } = useSelector((state) => state);

  const FuncionPostCarrito = async (
    idUser,
    idTypeRoom,
    nameRoomType,
    Trolleys
  ) => {
    if (User) {
      try {
        await axios.post(`${URL_BASE}/cart/${idUser}/${idTypeRoom}`);
        swal({
          text: "Agregado con exito!!",
          icon: "success",
          buttons: "Aceptar",
        });
      } catch (error) {
        swal({
          text: error.response.data.error,
          icon: "warning",
          buttons: "Aceptar",
        });
      }
      dispatch(GetTrolley(User.id));
    }
  };

  useEffect(() => {
    dispatch(FuncionTypeRoomTypes(id));
  }, []);

  //{ id, name, image, price, stock, people }

  return TypeRoom?.map((room, index) => (
    <div key={index}>
      <Card style={{ width: "18rem", margin: "10px" }}>
        <Card.Body>
          <Card.Title>{room.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {/* {`$  ${room.price}`} */}
            <GetCurrencyExchange value={room.price} />
          </Card.Subtitle>
          <Card.Text>People: {room.people}</Card.Text>
          <img className={style.img} src={room.image} />
          <Card.Text>stock : {room.stock}</Card.Text>
          {User?.rol !== 2 && User?.rol !== 3 ? (
            <button
              className={style.BotonCarrito}
              onClick={() =>
                FuncionPostCarrito(
                  User.id,
                  room.id,
                  room.name,
                  Trolleys
                )
              }>
              + Agregar al Carrito
            </button>
          ) : (
            <></>
          )}

          {/* {room.name === "Individual" ? (
            <button
              className={style.BotonCarrito}
              onClick={() => FuncionPostCarrito(User.id, room.id, room.name)}
              disabled={Trolleys?.filter((tro) => tro.name === room.name)}
            >
              + Agregar al Carrito
            </button>
          ) : room.name === "Familiar" ? (
            <button
              className={style.BotonCarrito}
              onClick={() => FuncionPostCarrito(User.id, room.id, room.name)}
              disabled={Trolleys?.filter((tro) => tro.name === room.name)}
            >
              + Agregar al Carrito
            </button>
          ) : (
            <button
              className={style.BotonCarrito}
              onClick={() => FuncionPostCarrito(User.id, room.id, room.name)}
              disabled={Trolleys?.filter((tro) => tro.name === room.name)}
            >
              + Agregar al Carrito
            </button>
          )} */}
        </Card.Body>
      </Card>
    </div>
  ));
};

export default TypeRoom;
