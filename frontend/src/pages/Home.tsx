import { useContext } from "react";
import { AppContext } from "../Provider";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import "../styles/home.css";
import { logoutUser } from "../services/User_comumApi"

export default function Home() {
  const { nomeHotel } = useContext(AppContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser() //invalida/deletea o cookie antes criado por criado por login.
      setUser(null);
      navigate("/");
    } catch(error){
      console.error("Falha no logout:", error);
    }

  };

  return (
    <div className="home-container">
      <h1>{user?.Name}, seja muito bem-vindo ao {nomeHotel}</h1>
      <p>Sistema de gestão de hotelaria</p>
      <div className="home-buttons">
        <Link to="/atracoes" className="atracoes">Atrações</Link>
        <Link to="/quartos" className="quartos">Quartos</Link>
        <Link to="/reservas" className="reservas">Reservas</Link>
        <Link to="/perfil" className="perfil">perfil</Link>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </div>

      <p style={{ marginTop: "40px", color: "#555" }}>
        Confira as atrações do hotel e planeje sua estadia!
      </p>
    </div>
  );
}
