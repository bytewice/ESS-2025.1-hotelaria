import { useContext } from "react";
import { Link, Navigate,useNavigate } from "react-router-dom";
import { deleteUser, logoutUser, updateUser } from "../services/User_comumApi"; 
import { UserContext } from "../context/userContext";
import "../styles/perfil.css"; // Importando nosso novo CSS

export default function Perfil() {
  const { user, setUser  } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Você tem certeza que deseja deletar sua conta? Esta ação é irreversível."
    );
    if (isConfirmed && user) {
      try {
        await deleteUser(user._id); 
        await logoutUser();
        setUser(null);
        navigate("/");
        
      } catch (error) {
        console.error("Erro ao deletar a conta:", error);
      }
    }
  };

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
        <div className="perfil-actions">
            <Link to="/home" className="perfil-back-button">
            Voltar para Home
            </Link>
            <button onClick={handleDelete} className="perfil-delete-button">
              Deletar Conta
            </button>
            <Link to="/perfil/editar" className="perfil-edit-button">
                Editar Perfil
            </Link>
        </div>
      </div>
    </div>
  );
}