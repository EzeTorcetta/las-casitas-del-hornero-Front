//?---------------------------- IMPORTS --------------------------------

import {
  Home,
  Favoritos,
  Detail,
  Landing,
  Trolley,
  Perfil,
  BotonAuthGoogle,
  FormularioRegistra
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
        <Route path="/Registrar" element={<FormularioRegistra />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Carrito" element={<Trolley />} />
        <Route path="/Perfil" element={<Perfil />} />
        {/* <Route path="/UserForm" element={<FomrAdmin />} /> */}
        {/* <Route path="/Proveedor" element={<Proveedor />} />
        <Route path="/SuperAdmin" element={<SuperAdmin />} /> */}
      </Routes>
    </div>
  );
}

export default App;
