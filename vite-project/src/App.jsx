import { Home, Favoritos, Detail, NavBar, Footer, Loading, Formulario } from './components/Index';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/" element={<Formulario />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
