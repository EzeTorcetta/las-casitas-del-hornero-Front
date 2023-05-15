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
import style from "./Detail.module.css";

const FuncionServices = ({ Services }) => {
  console.log(Services);

  const imagen = {
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
      {Services?.map((Ser) => (
        <section className={style.divServicios} key={Ser.name}>
          <h2 className={style.h2}>{Ser.name}</h2>
          <div className={style.divPadre}>
            <img className={style.img} src={imagen[Ser.name]} />
          </div>
        </section>
      ))}
    </>
  );
};

export default FuncionServices;
