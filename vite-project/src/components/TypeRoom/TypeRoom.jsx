//?---------------------------- IMPORTS --------------------------------
//react
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import { PedirCheckInCheckOut, PedirLocalStorage } from "../Index";
import GetCurrencyExchange from "../CurrencyExchange/GetCurrencyExchange";
import swal from "sweetalert";
import style from "./TypeRoom.module.css";
//action
import { FuncionTypeRoomTypes, GetTrolley } from "../../redux/Actions/Actions";
import { v4 as uuidv4 } from "uuid";

//?----------------- COMPONENTE ROOM TYPE  ------------------------------------
const TypeRoom = ({ id, Trolleys }) => {
  const URL_BASE = "https://las-casitas-del-hornero-back-deploy.up.railway.app";
  const User = PedirLocalStorage();
  const check = PedirCheckInCheckOut();
  const dispatch = useDispatch();
  const [State, setState] = useState([]);
  const { TypeRoom } = useSelector((state) => state);

  

  const FuncionPostCarrito = async (idUser, idTypeRoom, stock) => {
    if (stock !== 0) {
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
    } else {
      swal({
        text: "No hay Disponibilidad",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  useEffect( ()  => {
    const checkIn = check.CheckIn;
    const checkOut = check.CheckOut;
    dispatch(FuncionTypeRoomTypes(id,checkIn,checkOut));
  }, []);

  //{ id, name, image, price, stock, people }

  return TypeRoom?.map((room, index) => (
    <div key={index}>
      <Card style={{ width: "18rem", margin: "10px" }}>
        <Card.Body>
          <Card.Title>{room.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <GetCurrencyExchange value={room.price} />
          </Card.Subtitle>
          <Card.Text>People: {room.people}</Card.Text>
          <img className={style.img} src={room.image} />
          {room.stock === 0 ? (
            <Card.Text>No disponible</Card.Text>
          ) : (
            <Card.Text>stock : {room.stock}</Card.Text>
          )}

          {User?.rol !== 2 && User?.rol !== 3 ? (
            <button
              disabled={room.stock === 0}
              className={style.BotonCarrito}
              onClick={() =>
                FuncionPostCarrito(
                  User.id,
                  room.id,
                  room.name,
                  Trolleys,
                  room.stock
                )
              }
            >
              + Agregar al Carrito
            </button>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </div>
  ));
};

export default TypeRoom;
