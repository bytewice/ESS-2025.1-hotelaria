import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [login, setLogin] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log("Tentando login com:", login, senha);
    // Aqui você pode adicionar a lógica de autenticação
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Usuário:
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Digite seu usuário"
            required
          />
        </label>

        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </label>

        <button type="submit">Entrar</button>
      </form>

      <p className="login-link">
        <Link to="/Cadastro">Não tem Login? Faça seu cadastro</Link>
      </p>
    </div>
  );
}
