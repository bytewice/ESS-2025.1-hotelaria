import axios from "axios"
//import type { User } from "../types/user.ts"
import type { UserComum } from "../types/userComum.ts"
//import type { MetododePagamento } from "../types/metodo.ts"

const API_URL = "http://localhost:2000/user";

export const getUser = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`)
  return res.data
}

/*
export const addMetodo = async (
    id: Number,
    metodo: MetododePagamento
) => {
  const res = await axios.post(`${API_URL}/${id}`, metodo)
  return res.data
}
  */

/*
export const loginUser = async (name: string) => {
  const res = await axios.get(`${API_URL}/${name}`)
  return res.data
}
*/

export const signupUser = async (
    user: UserComum
) => {
  const res = await axios.post(`${API_URL}/signup`, user)
  return res.data
}

export const updateUser = async ( //
    id: Number,
    userData: Partial<UserComum>
) => {
  const res = await axios.patch(`${API_URL}/${id}`, userData)
  return res.data
}

/*
export const logoutUser = async (name: string) => {
  const res = await axios.get(`${API_URL}/${name}`)
  return res.data
}
*/

export const deleteUser = async ( //
    id: Number

) => {
  const res = await axios.delete(`${API_URL}/${id}`)
  return res.data
}

