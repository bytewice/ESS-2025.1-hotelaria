import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ADMIN.css";
import "../styles/list-users.css"

export function Admin(){
    return (
            <div className="admin-home-container">
            <h1>Bem-vindo, meu rei  </h1>
            <p>Sistema de gestão de hotelaria</p>
    
            <div className="home-buttons">
            <Link to="/admin-users" className="button--admin-user">Gerenciar Usuários</Link>
            <Link to="/ALVARO-COLOCAR" className="button--admin-res">Gerenciar Reservas</Link>
            </div>
    
            </div>
    );
}

export function AdminUsers(){
    return (
        <div className="home-container">
        <h1>Bem-vindo, meu rei  </h1>
        <p>Sistema de gestão de hotelaria</p>
  
        <div className="home-buttons">
          <Link to="/userslist" className="button button--admin-user">Listar Usuários</Link>
          <Link to="/adminlist" className="button button--admin-res">Listar Admins</Link>
        </div>
        

        <div className="home-buttons" style={{ marginTop: '20px' }}>
          <Link to="/createuser" className="button button--admin-user">Criar usuário</Link>
          <Link to="/createadmin" className="button button--admin-res">Criar Admin</Link>
        </div>

      </div>
    );
}

interface user {
    _id: string;
    Name: string;
    Email: string;
    CPF: string;
    role: string;
    Telefone: string;
}

export function UsersList() {
const [users, setUsers] = useState<user[]>([]);

useEffect(() => {
    const config = {
        withCredentials: true
    };
    // Não é necessário um objeto de configuração com caUserbeçalhos se o token estiver em um cookie HTTP-only
    // O navegador se encarregará de enviar o cookie automaticamente com a requisição
    axios.get("http://localhost:2000/admin/")
    .then(res => setUsers(res.data))
    .catch(err => console.error("Erro ao carregar usuários:", err))
}, []);

return (
    <div className="admin-container">
      <h1>Lista de Usuários</h1>
      <div className="users-grid">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <h2>{user.Name}</h2>
              <p>Email: {user.Email}</p>
              <p>CPF: {user.CPF}</p>
              <p>Telefone: {user.Telefone}</p>
              <p>Role: <span className={`user-role user-role--${user.role}`}>{user.role}</span></p>
              <div className="home-buttons">
                  <Link to={`/admin/edit-user/${user._id}`} className="user-button edit-button">
                    Editar
                  </Link>
                  <Link to={`/home`} className="user-button delete-button">
                    Deletar
                  </Link>
                </div>            
            </div>
          ))
        ) : (
          <div className="no-users-message">Nenhum usuário encontrado.</div>
        )}
      </div>
    </div>
);
}

export function AdminList() {
    const [users, setUsers] = useState<user[]>([]);
    
    useEffect(() => {
        const config = {
            withCredentials: true
        };
        // Não é necessário um objeto de configuração com cabeçalhos se o token estiver em um cookie HTTP-only
        // O navegador se encarregará de enviar o cookie automaticamente com a requisição
        axios.get("http://localhost:2000/admin/all")
        .then(res => setUsers(res.data))
        .catch(err => console.error("Erro ao carregar usuários:", err))
    }, []);
    
    return (
        <div className="admin-container">
          <h1>Lista de Usuários</h1>
          <div className="users-grid">
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user._id} className="user-card">
                  <h2>{user.Name}</h2>
                  <p>Email: {user.Email}</p>
                  <p>CPF: {user.CPF}</p>
                  <p>Telefone: {user.Telefone}</p>
                  <p>Role: <span className={`user-role user-role--${user.role}`}>{user.role}</span></p>
                  <div className="home-buttons">
                      <Link to={`/admin/edit-admin/${user._id}`} className="user-button edit-button">
                        Editar
                      </Link>
                      <Link to={`/admin/delete-admin/${user._id}`} className="user-button delete-button">
                        Deletar
                      </Link>
                    </div>            
                </div>
              ))
            ) : (
              <div className="no-users-message">Nenhum usuário encontrado.</div>
            )}
          </div>
        </div>
    );
    }

    export function CreateUser(){
        return(
            <div className="home-container">
            <h1>AAAAAAAAAAAAAAAAAAA </h1>
            <p>AAAAAAAAAAAAAAAAAAA</p>
      
            <div className="home-buttons">
              <Link to="/atracoes" className="atracoes">AAAAAAAAAAAAAAA</Link>
              <Link to="/quartos" className="quartos">AAAAAAAAAAAAAAAA</Link>
              <Link to="/reservas" className="reservas">AAAAAAAAAAAAAAAA</Link>
            </div>
      
            <p style={{ marginTop: "40px", color: "#555" }}>
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </p>
          </div>
        );
    }