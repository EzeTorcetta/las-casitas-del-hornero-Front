//?---------------------------- IMPORTS --------------------------------

import {
  Home,
  Detail,
  Landing,
  Trolley,
  Perfil,
  FormLocal,
  FormGoogle,
  BotonAuthGoogle,
  LogOut,
} from "./components/Index";
import { Route, Routes } from "react-router-dom";

//?----------------- APP ------------------------------------
function App() {
  return (
    <div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/RegistroLocal" element={<FormLocal />} />
        <Route path="/RegistroGoogle" element={<FormGoogle />} />
        <Route path="/Logout" element={<LogOut />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Carrito" element={<Trolley />} />
        <Route path="/Perfil" element={<Perfil />} />
      </Routes>
    </div>
  );
}

export default App;
