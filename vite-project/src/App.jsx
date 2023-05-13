import {
  Home,
  Favoritos,
  Detail,
  Search,
  Footer,
  Loading,
  Landing,
  FormularioRegistrar
} from "./components/Index";
import "./App.css";
import { Route, Routes } from "react-router-dom";

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
