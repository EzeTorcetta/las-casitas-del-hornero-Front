import { useEffect } from "react";
import { PedirLocalStorage } from "../Index";
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../../redux/Actions/Actions";

const Booking = () => {
    let User = PedirLocalStorage();
    const dispatch = useDispatch()
    const booking = useSelector((state) => state.Booking);

    useEffect(()=>{
        dispatch(getBooking(User.id,User.rol));
    },[dispatch])

    return (
        <div>
            {booking?.map((book)=>{
                return (
                    <div>
                        <h1>{`${book.hotelName}`}</h1>
                        <p>{`precio Individual: ${book.individualPrice}`}</p>
                        <p>{`precio Total: ${book.totalPrice}`}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default Booking;