import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsAdmin } from "../../redux/Actions/Actions";
import { PedirLocalStorage } from "../Index";
import MUIDataTable from "mui-datatables";
import axios from "axios";

const GetHotels = () => {
    const {HotelsAdmin} = useSelector(data=>data)
    const dispatch = useDispatch()
    const user = PedirLocalStorage();
    const  [loading,setLoading] = useState(false)

useEffect(()=>{
    if(!loading){
        setLoading(true)
        if(!HotelsAdmin.length){
            dispatch(getHotelsAdmin(user.id))
        }
      }
},[dispatch])

const FuncioBloquear = async (id_Hotel) => {
console.log(id_Hotel)
     await axios.put(
        `https://las-casitas-del-hornero-back-deploy.up.railway.app/hotels/status/${id_Hotel}`
       );
    await dispatch(getHotelsAdmin(user.id))
}

const columnas = [
    "id",
    "name",
    "email",
    "phoneNumber",
    "rating",
    "valoration",
    {
        name: "status",
        label: "Status",  
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const id_Hotel = tableMeta.rowData[0];
            return (
              <div>
                <h1>{value}</h1>
                <button
                  onClick={() => FuncioBloquear(id_Hotel)}
                >
                  {value ? "Bloquear" : "Desbloquear"}
                </button>
              </div>
            );
          },
        },
      },
    "UserId",
    "province"
]


const options = {
    selectableRows: false, // Desactivar checkboxes en cada fila
  };

return (
    <MUIDataTable
    
        title="Hoteles"
        data={HotelsAdmin}
        columns={columnas}
        options={options}
    />
  );

}



export default GetHotels;