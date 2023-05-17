//?---------------------------- IMPORTS --------------------------------

import {
  Home,
  Favoritos,
  Detail,
  Landing,
  FormularioRegistrar,
  Carrito,
  Perfil,
} from "./components/Index";
import { Route, Routes } from "react-router-dom";

//?----------------- APP ------------------------------------
function App() {
  return (
    <div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        {/* <Route path="/Favoritos" element={<Favoritos />} /> */}
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Registrar" element={<FormularioRegistrar />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Carrito" element={<Carrito />} />
        <Route path="/Perfil" element={<Perfil />} />
      </Routes>
    </div>
  );
}

export default App;
