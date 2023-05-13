import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  FuncionSelectProvince,
  FuncionSelectranting,
  FuncionSelectService,
  FuncionAllHotel,
} from "../../redux/Actions/Actions";

const Filtro = () => {
  const dispatch = useDispatch();
  const Hotels = useSelector((state) => state.Hotels);

  const Provincias = [
    "CATAMARCA",
    "CHACO",
    "CHUBUT",
    "CORDOBA",
    "CORRIENTES",
    "ENTRE RIOS",
    "FORMOSA",
    "JUJUY",
    "LA PAMPA",
    "LA RIOJA",
    "MENDOZA",
    "MISIONES",
    "NEUQUEN",
    "RIO NEGRO",
    "SALTA",
    "SAN JUAN",
    "SAN LUIS",
    "SANTA CRUZ",
    "SANTA FE",
    "SANTIAGO DEL ESTERO",
    "TIERRA DEL FUEGO",
    "TUCUMAN",
  ];

  const raiting = [1, 2, 3, 4, 5];

  const Servicos = [
    "Desayuno gratis",
    "Pileta",
    "Gimnasio",
    "Hotel frente a la playa",
    "Wi-Fi",
    "Estacionamiento",
    "Aire acondicionado",
    "Restaurante",
    "Mascotas permitidas",
    "Familias",
    "Bañera de hidromasaje",
    "Spa",
    "Acceso silla de ruedas",
    "Ascensor",
  ];

  const onChange = async (event) => {
    dispatch(FuncionSelectProvince(event.target.value));
  };

  const onChange1 = async (event) => {
    dispatch(FuncionSelectranting(event.target.value));
  };

  const onChange3 = (ser) => {
    dispatch(FuncionSelectService(ser));
  };

  const FuncionOnclick = () => {
    dispatch(FuncionAllHotel());
  };

  return (
    <div>
      <select onChange={onChange}>
        {Provincias.map((pro, index) => (
          <option value={pro} key={index}>
            {pro}
          </option>
        ))}
      </select>
      <select onChange={onChange1}>
        {raiting.map((rant, index) => (
          <option value={rant} key={index}>
            {rant}
          </option>
        ))}
      </select>
      {Servicos.map((Ser, index) => (
        <div key={index}>
          {Ser}
          <input onChange={() => onChange3(Ser)} type="checkbox" value={Ser}></input>
        </div>
      ))}
      <button onClick={FuncionOnclick}>AllHotels</button>
    </div>
  );
};

export default Filtro;
