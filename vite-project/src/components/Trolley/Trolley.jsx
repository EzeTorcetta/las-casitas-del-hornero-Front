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
import { PedirCheckInCheckOut, PedirLocalStorage } from "../Index";
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
    const check = PedirCheckInCheckOut();
    const [isLoading, setIsLoading] = useState(true);
    const [TotalPrecio, setTotalPrecio] = useState([]);
    const navigate = useNavigate();

    function calcularDiferenciaEnDias(fecha1, fecha2) {
        const date1 = new Date(fecha1);
        const date2 = new Date(fecha2);
        const diferenciaEnMilisegundos = Math.abs(date2 - date1);
        const milisegundosEnUnDia = 24 * 60 * 60 * 1000;
        const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / milisegundosEnUnDia);
        return diferenciaEnDias;
    }

    const Tiempo = calcularDiferenciaEnDias(check.CheckIn, check.CheckOut);

    useEffect(() => {
        if (!User) {
            navigate("/Home");
        }
    }, [User, navigate]);

    if (!User) {
        return null;
    }



    const ArrayMP = Trolley.map((tro) => {
        const unit_price = tro.price * Tiempo;
        return { id: tro.id, amount: tro.amount, unit_price, name: tro.name, hotelname: tro.hotelName };
    });
    const ArrayBooking = Trolley.map((tro) => {
        return { id: tro.id, amount: tro.amount };
    });
    const totalPrecio = Trolley.reduce((total, { price, amount }) => {
        return total + Math.ceil(price * amount);
    }, 0);
    //*---------------------------------contador de cafa tipo de habitacion:

    setCountCarrito(Trolley.length);

    useEffect(() => {
        if (isLoading) {
            const checkIn = check.CheckIn;
            const checkOut = check.CheckOut;
            dispatch(GetTrolley(User.id, checkIn, checkOut));
            setIsLoading(false);
        }
    }, [ObjetoTrolley, Trolley]);

    const FuncionReservar = async (idUser) => {
        if (Trolley.length) {
            try {
                const checkIn = check.CheckIn;
                const checkOut = check.CheckOut;
                await axios.put(
                    `${URL_BASE}/booking/${idUser}?checkIn=${checkIn}&checkOut=${checkOut}`,
                    ArrayBooking
                );
              
                const res = await axios.post(
                    `${URL_BASE}/payment`,
                    ArrayMP
                );

                window.location.href = res.data.response.body.init_point;

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
        const checkIn = check.CheckIn;
        const checkOut = check.CheckOut;
        dispatch(GetTrolley(User.id, checkIn, checkOut));

        if (ObjetoTrolley.amount) {
            const objeto = Trolley.find((tro) => tro.id === id_Rommtype);

            const PrecioBase = objeto.price;

            const newAmount =
                value === "up" ? ObjetoTrolley.amount + 1 : ObjetoTrolley.amount - 1;
            const newPrice = PrecioBase * newAmount;
           
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
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </section>

            <div className={style.divTotalPrecio}>
                <h1 className={style.h1}>Precio Total : ${totalPrecio * Tiempo}</h1>
            </div>

            <Footer />
        </>
    );
};

export default Trolleys;