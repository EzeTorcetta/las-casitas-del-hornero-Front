import {
  Home,
  Favoritos,
  Detail,
  NavBar,
  Search,
  Footer,
  Loading,
} from "./components/Index";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
