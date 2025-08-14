import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import Reservas from "./pages/Reservas";
import Quartos from "./pages/Quartos";
import Atrações from "./pages/Atrações";
import AdminAttractions from "./pages/AdminAttractions";
import AtracaoDetalhe from "./pages/AtraçãoDetalhe";
import { UserProvider } from "./context/userContext";
import Layout from "./Layout"; // Caminho para o Layout


export default function App() {
  return (  
    <Router>
      <Routes>
        {/* Home sem Layout */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* Páginas secundárias com Layout */}
        <Route path="/adminatrações" element={<AdminAttractions/>}/>
        <Route path="/reservas" element={<Layout><Reservas /></Layout>} />
        <Route path="/quartos" element={<Layout><Quartos /></Layout>} />
        <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
        <Route path="/atracoes" element={<Layout><Atrações /></Layout>} />
        <Route path="/atracoes/:name" element={<Layout><AtracaoDetalhe /></Layout>} />
      </Routes>
    </Router>
  );
}
