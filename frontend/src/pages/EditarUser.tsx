import { useState, useContext, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { updateUser } from "../services/User_comumApi";
import "../styles/cadastro.css";

export default function EditarPerfil() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Inicia os estados com os dados do usuário atual do contexto
  const [Name, setName] = useState(user?.Name || "");
  const [Email, setEmail] = useState(user?.Email || "");
  const [CPF, setCpf] = useState(user?.CPF || "");
  const [Telefone, setTelefone] = useState(user?.Telefone || "");
  const [erro, setErro] = useState("");

  if (!user) {
    return <Link to="/" />;
  }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const updatedData = { Name, Email, CPF, Telefone };
      const resposta = await updateUser(user._id, updatedData);
      setUser(resposta.user);
      navigate("/perfil");

    } catch (error: any) {
      setErro(error.response?.data?.error || "Erro ao atualizar perfil.");
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Editar Perfil</h1>
      <p>Altere as informações que desejar</p>
      <form className="cadastro-form" onSubmit={handleUpdate}>
        <label>Nome:<input type="text" value={Name} onChange={(e) => setName(e.target.value)} required /></label>
        <label>Email:<input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>CPF:<input type="text" value={CPF} onChange={(e) => setCpf(e.target.value)} required /></label>
        <label>Telefone:<input type="tel" value={Telefone} onChange={(e) => setTelefone(e.target.value)} /></label>
        
        <button type="submit">Salvar Alterações</button>
        {erro && <p className="error">{erro}</p>}
      </form>

      <Link to="/perfil" className="voltar-login">Cancelar</Link>
    </div>
  );
}