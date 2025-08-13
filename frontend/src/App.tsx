import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Reservas from "./pages/Reservas";
import Quartos from "./pages/Quartos";
import Atrações from "./pages/Atrações";
import AtracaoDetalhe from "./pages/AtraçãoDetalhe"; // ⬅️ Import da página de detalhe

export default function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <Link to="/">🏠 Home</Link>
        <Link to="/reservas">📅 Reservas</Link>
        <Link to="/quartos">🛏️ Quartos</Link>
        <Link to="/atrações">🎡 Atrações</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/quartos" element={<Quartos />} />
        <Route path="/atrações" element={<Atrações />} />

        {/* 🔹 Nova rota para detalhes */}
        <Route path="/atrações/:name" element={<AtracaoDetalhe />} />
      </Routes>
    </Router>
  );
}
