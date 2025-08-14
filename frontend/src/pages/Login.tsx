import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/adminverific"; // ajuste para seu service
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await loginUser({ email, senha });

      if (resposta.role === "admin") {
        navigate("/admin"); // ou /admin/home
      } else if (resposta.role === "comum") {
        navigate("/home"); // página home do usuário
      } else {
        setErro("Login ou senha incorretos");
      }
    } catch (error: any) {
      setErro(error.message || "Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {erro && <p className="error">{erro}</p>}
      </form>
    </div>
  );
}
