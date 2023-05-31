import { Link } from "react-router-dom";
import { Footer, NavBar } from "../Index";
import "./Error.css";
import { useSelector } from "react-redux";

const Error404 = () => {
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      PáginaNoEncontrada: "Page not found",
      LoSentimos: "Sorry, we couldn't find the page you were looking for.",
      EnCaso: "In case of not being logged in",
      VuelveInicio: "Go back to the home page",
      IrInicio: "Go home",
    },
    es: {
      PáginaNoEncontrada: "Página no encontrada",
      LoSentimos:
        "Lo sentimos, no hemos podido encontrar la página que buscabas.",
      EnCaso: "En caso de no haber iniciado sesión",
      VuelveInicio: "Vuelve a la página de inicio",
      IrInicio: "Ir a inicio",
    },
  };

  return (
    <>
      <NavBar />

      <section className="section">
        <div className="containerPadreError">
          <div className="containerError">
            <div className="divDeLaImagen">
              <img
                className="imagenHornero"
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/utbvsuv2bhb7gbubbaqk"
              />
            </div>
            <h1>404</h1>
            <h2>{translations[idioma].PáginaNoEncontrada}</h2>
            <div className="divDelContenido">
              <p className="p">{translations[idioma].LoSentimos}</p>
              <p className="p">{translations[idioma].EnCaso}</p>
              <p className="p">{translations[idioma].VuelveInicio}</p>
              <div className="divDelBotonInicio">
                <Link to={"/Home"}>
                  <button className="botonInicio">
                    {translations[idioma].IrInicio}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error404;
