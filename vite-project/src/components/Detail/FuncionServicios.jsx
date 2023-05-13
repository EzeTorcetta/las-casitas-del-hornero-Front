import imagenDesayuno from "src/components/image/desayuno.png";
import imagenPileta from "src/components/image/piscina.png";
import imagenGimnasio from "src/components/image/gimnasio.png";
import imagenPlaya from "src/components/image/playa.png";
import imagenWifi from "src/components/image/wifi.png";
import imagenEstacionamiento from "src/components/image/aparcamineto-de-coches.png";
import imagenAireAcondicionado from "src/components/image/clima.png";
import imagenRestaurante from "src/components/image/plato.png";
import imagenMascotasPermitidas from "src/components/image/pata.png";
import imageFamilia from "src/components/image/familia.png";
import imagenBañeraDeHidromasaje from "src/components/image/banera-de-hidromasaje.png";
import imagenSpa from "src/components/image/spa.png";
import imagenAccesoSillaDeRuedas from "src/components/image/senal-de-acceso-para-sillas-de-ruedas.png";
import imagenAscensor from "src/components/image/ascensor.png";
// import style from "./Detail.module.css";

const FuncionServices = ({ Services }) => {
  console.log(Services);

  return (
    <>
      {Services?.map((Ser) => (
        <div key={Ser.name}>
          <h2>{Ser.name}</h2>
        </div>
      ))}
    </>
  );
};

export default FuncionServices;
