import { Home, Favoritos, Detail, Formulario, Eleccion, FormularioAdministrador } from "./components/Index";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import hotels from "./data";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Home" element={<Home hotels={hotels} />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/" element={<Eleccion />} />
        <Route path="/FormularioUser" element={<Formulario />} />
        <Route path="/FormularioAdmin" element={<FormularioAdministrador />} />
      </Routes>
    </div>
  );
}

export default App;
