import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./styles/layout.css"; // Crie este CSS para estilizar o header e menu

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Header */}
      <header className="layout-header">
        <h2 className="header-title">Hotel Dashboard</h2>

        {/* Ícone hamburger no canto direito */}
        <div className="hamburger" onClick={toggleMenu}>
          <FaBars size={24} />
        </div>

        {/* Menu suspenso */}
        {menuOpen && (
          <nav className="dropdown-menu">
            <Link to="/home" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
            <Link to="/atrações" onClick={() => setMenuOpen(false)}>🎡 Atrações</Link>
            <Link to="/quartos" onClick={() => setMenuOpen(false)}>🛏️ Quartos</Link>
            <Link to="/reservas" onClick={() => setMenuOpen(false)}>📅 Reservas</Link>
            <Link to="/perfil" onClick={() => setMenuOpen(false)}>👤 Perfil</Link>
          </nav>
        )}
      </header>

      {/* Conteúdo da página */}
      <main>{children}</main>
    </div>
  );
}
