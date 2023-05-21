//?---------------------------- IMPORTS --------------------------------

import { useState } from "react";
import {
  Home,
  Detail,
  Landing,
  Trolley,
  Perfil,
  FormLocal,
  FormGoogle,
  LogOut,
} from "./components/Index";
import { Route, Routes } from "react-router-dom";

//?----------------- APP ------------------------------------
function App() {
  const [countCarrito, setCountCarrito] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/RegistroLocal" element={<FormLocal />} />
        <Route path="/RegistroGoogle" element={<FormGoogle />} />
        <Route path="/Logout" element={<LogOut />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/Home"
          element={
            <Home
              countCarrito={countCarrito}
              setCountCarrito={setCountCarrito}
            />
          }
        />
        <Route
          path="/Detail/:id"
          element={
            <Detail
              setCountCarrito={setCountCarrito}
              countCarrito={countCarrito}
            />
          }
        />
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
      </Routes>
    </div>
  );
}

export default App;
