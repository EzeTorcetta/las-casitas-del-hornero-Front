import { Home, Favoritos, Detail, Search } from "./components/Index";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Favoritos" />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/" />
      </Routes>
    </div>
  );
}

export default App;
