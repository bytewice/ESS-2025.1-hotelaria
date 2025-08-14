import "../styles/cadastro.css";
import { signupUser } from "../services/User_comumApi";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function Cadastro() {
  const navigate = useNavigate();
  const [Name, setName] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [CPF, setCpf] = useState<string>("");
  const [Password, setSenha] = useState<string>("");
  const [Telefone, setTelefone] = useState<string>("");
  const [erro, setErro] = useState("");
  
  const handleCadastro = async (e: FormEvent) => {
  e.preventDefault();
  setErro("");

  try {
    const resposta = await signupUser({ Email, Password, CPF, Name, Telefone });

    if (resposta.message === "Usuário cadastrado com sucesso") {
      navigate("/");
    } else {
      // Caso a API responda com 200 mas não seja sucesso
      alert(resposta.message || "Erro ao realizar cadastro");
    }

  } catch (error: any) {
    let mensagemErro = "Erro ao conectar com o servidor";

    // Tratamento específico se usar Axios
    if (error.response?.data?.message) {
      mensagemErro = error.response.data.message;
    } 
    // Tratamento se for fetch ou erro comum
    else if (error.message) {
      mensagemErro = error.message;
    }

    setErro(mensagemErro);
    alert(mensagemErro);
  }
};


  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      <p>Preencha os campos para criar sua conta</p>

      <form className="cadastro-form" onSubmit={handleCadastro}>
        <label>
          Nome:
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </label>

        <label>
          CPF:
          <input
            type="text"
            value={CPF}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF"
            required
          />
        </label>

        <label>
          Senha:
          <input
            type="password"
            value={Password}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </label>

        <label>
          Telefone (opcional):
          <input
            type="tel"
            value={Telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Digite seu telefone"
          />
        </label>

        <button type="submit">Cadastrar</button>
        {erro && <p className="error">{erro}</p>}
      </form>

      <p className="voltar-login">
        Já tem conta? <Link to="/">Voltar para o Login</Link>
      </p>
    </div>
  );
}