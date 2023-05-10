import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FuncionDetailHotel,
  FuncionClearDetail,
} from "../../redux/Actions/Actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const DetailHotel = useSelector((state) => state.DetailHotel);

  useEffect(() => {
    dispatch(FuncionDetailHotel(id));
    return () => {
      dispatch(FuncionClearDetail());
    };
  }, []);
  const {
    name,
    telefono,
    email,
    imagen,
    Provincia,
    Direccion,
    Precio,
    Capacidad,
  } = DetailHotel;

  // {name , telefono , email , imagen , Provincia , Direccion , precio , capacidad }
  return (
    <div>
      <h3>{name}</h3>
      <h3>{telefono}</h3>
      <p>{email}</p>
      <img src={imagen} alt={name} />
      <p>{Provincia}</p>
      <p>{Direccion}</p>
      <p>{Precio}</p>
      <p>{Capacidad}</p>
    </div>
  );
};

export default Detail;
