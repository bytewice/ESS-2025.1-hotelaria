import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { detailAttraction, sendReview } from "../services/attractionApi";
import "../styles/atracaoDetalhe.css"; // Novo CSS

import { AppContext } from "../Provider";
import { deleteAdmin, deleteUser } from "../services/adminApi";

export function DeleteUser(){

    // Extrai o ID da URL
    const { id } = useParams();
    const { nomeHotel } = useContext(AppContext);
    
    // Hooks para gerenciar o estado e a navegação
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    // Função assíncrona para lidar com a deleção do usuário
    const handleDelete = async () => {
        setDeleting(true);
        try {
            // Chama a API para deletar o usuário, passando o ID
            await deleteUser(id); 
            // Após a deleção, redireciona o usuário para a lista de usuários
            alert("Usuário deletado com sucesso!");
            navigate('/userslist');
        } catch (err) {
            console.error("Erro ao deletar usuário:", err);
            setError("Não foi possível deletar o usuário. Tente novamente.");
            setDeleting(false);
        }
    };

    return(
        <div className="home-container">
            <h1>Confirmação de Exclusão</h1>
            <p>Você tem certeza que deseja excluir o usuário com o ID:</p>
            
            <p style={{ marginTop: "20px", fontSize: "1.2rem", fontWeight: "bold" }}>
                {id}
            </p>

            {deleting && <p>Deletando usuário...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div className="home-buttons" style={{ marginTop: "40px" }}>
                <button
                    className="user-button delete-button"
                    onClick={handleDelete}
                    disabled={deleting} // Desabilita o botão enquanto a deleção está em andamento
                >
                    Confirmar Deleção
                </button>
                
                <button
                    className="user-button.delete-button"
                    onClick={() => navigate('/userslist')} // Volta para a lista de usuários
                    disabled={deleting}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export function DeleteAdmin(){

    // Extrai o ID da URL
    const { id } = useParams();
    const { nomeHotel } = useContext(AppContext);
    
    // Hooks para gerenciar o estado e a navegação
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    // Função assíncrona para lidar com a deleção do usuário
    const handleDelete = async () => {
        setDeleting(true);
        try {
            // Chama a API para deletar o usuário, passando o ID
            await deleteAdmin(id); 
            // Após a deleção, redireciona o usuário para a lista de usuários
            alert("Usuário deletado com sucesso!");
            navigate('/adminlist');
        } catch (err) {
            console.error("Erro ao deletar admin:", err);
            setError("Não foi possível deletar o admin. Tente novamente.");
            setDeleting(false);
        }
    };

    return(
        <div className="home-container">
            <h1>Confirmação de Exclusão</h1>
            <p>Você tem certeza que deseja excluir o Admin com o ID:</p>
            
            <p style={{ marginTop: "20px", fontSize: "1.2rem", fontWeight: "bold" }}>
                {id}
            </p>

            {deleting && <p>Deletando Admin...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div className="home-buttons" style={{ marginTop: "40px" }}>
                <button
                    className="user-button delete-button"
                    onClick={handleDelete}
                    disabled={deleting} // Desabilita o botão enquanto a deleção está em andamento
                >
                    Confirmar Deleção
                </button>
                
                <button
                    className="user-button.delete-button"
                    onClick={() => navigate('/adminlist')} // Volta para a lista de usuários
                    disabled={deleting}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}