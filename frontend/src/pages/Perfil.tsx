import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import "../styles/perfil.css"; // Importando nosso novo CSS

export default function Perfil() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/" />;
  }

  // Lembre-se que as propriedades (Name, Email, etc.) devem ter o mesmo
  // nome que você usa no objeto de usuário no seu estado.
  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h1>Perfil do Usuário</h1>
        
        <div className="perfil-info">
          <p>
            <label>Nome:</label>
            <span>{user.Name}</span>
          </p>
          <p>
            <label>Email:</label>
            <span>{user.Email}</span>
          </p>
          <p>
            <label>CPF:</label>
            <span>{user.CPF}</span>
          </p>
          <p>
            <label>Telefone:</label>
            {/* Mostra 'Não informado' se o telefone não existir */}
            <span>{user.Telefone || "Não informado"}</span>
          </p>
        </div>
        <Link to="/home" className="perfil-back-button">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}