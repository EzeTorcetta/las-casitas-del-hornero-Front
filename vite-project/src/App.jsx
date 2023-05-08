import {
  Home,
  Favoritos,
  Detail,
  Nav,
  Loading,
  Formulario,
} from "./components/Index";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Spline from '@splinetool/react-spline'

function App() {
  return (
    <div>
      <div className="container">
      <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"/>
      </div>
      
      <Nav />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/" element={<Formulario />} />
      </Routes>
    </div>
  );
}

export default App;
