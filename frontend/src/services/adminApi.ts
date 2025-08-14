import axios from "axios";

const API_URL = "http://localhost:2000/admin"; // ajuste para sua rota real

//router.get('/', protectRoute, getAllUser)

export const getAllUser = async () => {
    const res = await axios.get(API_URL);
    return res.data;
}

export const updateUser = async (userID:string, userData: {Name: string; Email: string; CPF: string; Password: string; Telefone: string}) => {
    const res = await axios.put(`${API_URL}/${userID}`, userData);
    return res.data;
}

export const create_User = async (userData: {Name: string; Email: string; CPF: string; Password: string; Telefone: string}) => {
    const res = await axios.post(`${API_URL}/register`, userData)
};

export const create_Admin = async (userData: {Name: string; Email: string; CPF: string; Password: string; ConfirmPassword: string}) => {
    const res = await axios.post(`${API_URL}/register-admin`, userData);
    return res.data;
}

export const deleteUser = async (userID: string) => {
    const res = await axios.delete(`${API_URL}/user/${userID}`);
    return res.data;
}

export const deleteAdmin = async (userID: string) => {
    const res = await axios.delete(`${API_URL}/delete/${userID}`);
    return res.data;
}