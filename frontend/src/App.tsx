import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Reservas from "./pages/Reservas";
import Quartos from "./pages/Quartos";
import Atrações from "./pages/Atrações";
import AtracaoDetalhe from "./pages/AtraçãoDetalhe";
import Layout from "./Layout"; // Caminho para o Layout

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas sem Layout */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Páginas secundárias com Layout */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/reservas" element={<Layout><Reservas /></Layout>} />
        <Route path="/quartos" element={<Layout><Quartos /></Layout>} />
        <Route path="/atrações" element={<Layout><Atrações /></Layout>} />
        <Route path="/atrações/:name" element={<Layout><AtracaoDetalhe /></Layout>} />
      </Routes>
    </Router>
  );
}