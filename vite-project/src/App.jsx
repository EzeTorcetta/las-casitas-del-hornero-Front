//?---------------------------- IMPORTS --------------------------------

import { useState } from "react";
import {
  Home,
  Favoritos,
  Detail,
  Landing,
  Trolley,
  Perfil,
  // BotonAuthGoogle,
  FormularioRegistra,
} from "./components/Index";
import { Route, Routes } from "react-router-dom";

//?----------------- APP ------------------------------------
function App() {
  const [countCarrito, setCountCarrito] = useState(0);

  return (
    <div>
      <Routes>
        <Route
          path="/Home"
          element={
            <Home
              countCarrito={countCarrito}
              setCountCarrito={setCountCarrito}
            />
          }
        />
        {/* <Route path="/Favoritos" element={<Favoritos />} /> */}
        <Route
          path="/Detail/:id"
          element={
            <Detail
              setCountCarrito={setCountCarrito}
              countCarrito={countCarrito}
            />
          }
        />
        <Route path="/Registrar" element={<FormularioRegistra />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/Carrito"
          element={
            <Trolley
              setCountCarrito={setCountCarrito}
              countCarrito={countCarrito}
            />
          }
        />
        <Route
          path="/Perfil"
          element={
            <Perfil
              countCarrito={countCarrito}
              setCountCarrito={setCountCarrito}
            />
          }
        />
        {/* <Route path="/UserForm" element={<FomrAdmin />} /> */}
        {/* <Route path="/Proveedor" element={<Proveedor />} />
        <Route path="/SuperAdmin" element={<SuperAdmin />} /> */}
      </Routes>
    </div>
  );
}

export default App;
