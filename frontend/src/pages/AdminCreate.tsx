import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/list-users.css"
import {
  create_Admin,
  create_User
} from "../services/adminApi";

interface Attraction {
  nome: string;
  descricao: string;
}

export function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Limpa mensagens de feedback anteriores.

    if (!name || !email || !cpf || !password) {
      setMessage("Por favor, preencha os campos obrigatórios: Nome, Email, CPF e Senha.");
      return;
    }

    try {
      await create_User({ Name:name, Email:email, CPF:cpf, Password:password, Telefone:telefone });
      
      // Limpa os campos do formulário após o sucesso.
      setName("");
      setEmail("");
      setCpf("");
      setPassword("");
      setTelefone("");
      setMessage("Usuário criado com sucesso!");
    } catch (err: any) { // 'any' pode ser ajustado para um tipo de erro mais específico
      console.error("Erro ao criar usuário:", err);
      // Supondo que a API retorne uma mensagem de erro no corpo da resposta.
      const errorMessage = err.response?.data?.error || "Erro ao criar usuário. Tente novamente.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="admin-container">
      <Link to="/home-admin" className="back-to-admin">
        <span>🏠</span>
      </Link>
      <h1>Criar Novo Usuário</h1>

      <form onSubmit={handleCreateUser} className="admin-form">
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF (apenas números)"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone (opcional)"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <button type="submit">Criar Usuário</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}


export function CreateAdmin(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Limpa mensagens de feedback anteriores.

    if (!name || !email || !cpf || !password || !confirmpassword) {
      setMessage("Por favor, preencha os campos obrigatórios: Nome, Email, CPF e Senha.");
      return;
    }      <Link to="/home-admin" className="back-to-admin">
    <span>🏠</span>
  </Link>

    try {
      await create_Admin({ Name:name, Email:email, CPF:cpf, Password:password, ConfirmPassword:confirmpassword });
      
      // Limpa os campos do formulário após o sucesso.
      setName("");
      setEmail("");
      setCpf("");
      setPassword("");
      setConfirmPassword("");
      setMessage("Admin criado com sucesso!");
    } catch (err: any) { // 'any' pode ser ajustado para um tipo de erro mais específico
      console.error("Erro ao criar Admin:", err);
      // Supondo que a API retorne uma mensagem de erro no corpo da resposta.
      const errorMessage = err.response?.data?.error || "Erro ao criar Admin. Tente novamente.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="admin-container">
      <Link to="/home-admin" className="back-to-admin">
        <span>🏠</span>
      </Link>
      <h1>Criar Novo Administrador</h1>

      <form onSubmit={handleCreateUser} className="admin-form">
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF (apenas números)"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="confirme a senha"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Criar Admin</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}