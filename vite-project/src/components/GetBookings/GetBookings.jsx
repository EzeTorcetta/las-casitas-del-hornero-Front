import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { PedirLocalStorage } from "../Index";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/Actions/Actions";

const GetBookings = () =>{
    const user = PedirLocalStorage();
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const {BookingsAdmin} = useSelector(state=>state)

   
    useEffect(()=>{
        if(!loading){
            setLoading(true)
            if(!BookingsAdmin.length){

                dispatch(getAllBookings(user.id,user.rol))
            }
        }
    },[BookingsAdmin])


    const columnas = [
        "id", "amount", "price"  ,"date"  ,"checkIn" , "checkOut"  ,"UserId"  ,"RoomTypeId","HotelId"
    ]

    const options = {
        selectableRows: false, // Desactivar checkboxes en cada fila
      };
    

    return (
        <MUIDataTable
        
            title="Reservas"
            data={BookingsAdmin}
            columns={columnas}
            options={options}
        />
      );

}

export default GetBookings;