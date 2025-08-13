import { useContext } from "react";
import { AppContext } from "../Provider";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const { nomeHotel } = useContext(AppContext);

  return (
    <div className="home-container">
      <h1>Bem-vindo ao {nomeHotel}</h1>
      <p>Sistema de gestão de hotelaria</p>

      <div className="home-buttons">
        <Link to="/atrações" className="atracoes">Atrações</Link>
        <Link to="/quartos" className="quartos">Quartos</Link>
        <Link to="/reservas" className="reservas">Reservas</Link>
      </div>

      <p style={{ marginTop: "40px", color: "#555" }}>
        Confira as atrações do hotel e planeje sua estadia!
      </p>
    </div>
  );
}