import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reservas from "./pages/Reservas";
import Quartos from "./pages/Quartos";
import Atrações from "./pages/Atrações";
import AtracaoDetalhe from "./pages/AtraçãoDetalhe";
import Cartões from "./pages/Cartões";
import ModalAdicionarCartao from "./pages/ModalAdicionarCartão"
import Layout from "./Layout"; // Caminho para o Layout

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home sem Layout */}
        <Route path="/" element={<Home />} />

        {/* Páginas secundárias com Layout */}
        <Route path="/reservas" element={<Layout><Reservas /></Layout>} />
        <Route path="/quartos" element={<Layout><Quartos /></Layout>} />
        <Route path="/atrações" element={<Layout><Atrações /></Layout>} />
        <Route path="/atrações/:name" element={<Layout><AtracaoDetalhe /></Layout>} />
        <Route path="/cartões" element={<Layout><Cartões /></Layout>} />
        <Route path="/cartões/adicionarcartao" element={<Layout><AdicionarCartao /></Layout>} />
      </Routes>
    </Router>
  );
}
