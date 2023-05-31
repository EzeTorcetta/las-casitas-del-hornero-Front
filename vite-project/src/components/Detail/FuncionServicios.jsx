//?---------------------------- IMPORTS --------------------------------
//css
import style from "./Detail.module.css";
//images
import imagenDesayuno from "../../image/desayuno.png";
import imagenPileta from "../../image/piscina.png";
import imagenGimnasio from "../../image/gimnasio.png";
import imagenPlaya from "../../image/playa.png";
import imagenWifi from "../../image/wifi.png";
import imagenEstacionamiento from "../../image/aparcamiento-de-coches.png";
import imagenAireAcondicionado from "../../image/clima.png";
import imagenRestaurante from "../../image/plato.png";
import imagenMascotasPermitidas from "../../image/pata.png";
import imageFamilia from "../../image/familia.png";
import imagenBañeraDeHidromasaje from "../../image/banera-de-hidromasaje.png";
import imagenSpa from "../../image/spa.png";
import imagenAccesoSillaDeRuedas from "../../image/senal-de-acceso-para-sillas-de-ruedas.png";
import imagenAscensor from "../../image/ascensor.png";
import { useSelector } from "react-redux";
import traductor from "../Traductor/Traductor";

//?----------------- COMPONENTE FUNCION SERVICES ------------------------------------

const FuncionServices = ({ Services }) => {
  const idioma = useSelector((state) => state.idioma);
  const image = {
    "Desayuno gratis": imagenDesayuno,
    Pileta: imagenPileta,
    Gimnasio: imagenGimnasio,
    "Hotel frente a la playa": imagenPlaya,
    "Wi-Fi": imagenWifi,
    Estacionamiento: imagenEstacionamiento,
    "Aire acondicionado": imagenAireAcondicionado,
    Restaurante: imagenRestaurante,
    "Mascotas permitidas": imagenMascotasPermitidas,
    Familias: imageFamilia,
    "Bañera de hidromasaje": imagenBañeraDeHidromasaje,
    Spa: imagenSpa,
    "Acceso silla de ruedas": imagenAccesoSillaDeRuedas,
    Ascensor: imagenAscensor,
  };

  return (
    <>
      <h3>
        {idioma === "en"
          ? traductor("Servicios del alojamiento")
          : "Servicios del alojamiento"}
      </h3>
      <div className={style.services}>
        {Services?.map((Ser) => (
          <div className={style.divServicios} key={Ser.name}>
            <img className={style.img} src={image[Ser.name]} />
            <p className={style.h2}>
              {idioma === "en" ? traductor(Ser.name) : Ser.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FuncionServices;
