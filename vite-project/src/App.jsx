//?---------------------------- IMPORTS --------------------------------
import {
  Home,
  Favoritos,
  Detail,
  Landing,
  FormularioRegistrar,
  BotonAuthGoogle
} from "./components/Index";
import { Route, Routes } from "react-router-dom";

//?----------------- APP ------------------------------------
function App() {
  return (
    <div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Registrar" element={<FormularioRegistrar />} />
        <Route path="/" element={<Landing />} />

      </Routes>
    </div>
  );
}

export default App;
