import { useEffect } from "react";
import { PedirLocalStorage } from "../Index";
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../../redux/Actions/Actions";
import style from "./Booking.module.css";

const Booking = () => {
  let User = PedirLocalStorage();
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.Booking);

  useEffect(() => {
    dispatch(getBooking(User.id, User.rol));
  }, [dispatch]);

  return (
    <div className={style.container}>
      {booking?.map((book, index) => {
        return (
          <div key={index} className={style.booking}>
            <h3 className={style.hotelName}>{`${book.hotelName}`}</h3>
            <div className={style.individualPrice}>
              {" "}
              {`Precio individual: ${book.individualPrice}`}
            </div>
            <div className={style.totalPrice}>
              {`Precio total: ${book.totalPrice}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Booking;
