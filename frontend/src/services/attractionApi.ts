import axios from "axios";

const API_URL = "http://localhost:5000/api/attractions"; // ajuste para o seu backend

export const getAllAttractions = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getAttractionDetails = async (name: string) => {
  const res = await axios.get(`${API_URL}/${name}`);
  return res.data;
};

export const getReviews = async (name: string) => {
  const res = await axios.get(`${API_URL}/${name}/review`);
  return res.data;
};

export const sendReview = async (name: string, review: { user: string; text: string }) => {
  const res = await axios.post(`${API_URL}/${name}/review`, review);
  return res.data;
};

export const createAttraction = async (attraction: { name: string; description: string }) => {
  const res = await axios.post(`${API_URL}/create`, attraction);
  return res.data;
};

export const deleteAttraction = async (name: string) => {
  const res = await axios.delete(`${API_URL}/${name}/delete`);
  return res.data;
};

export const deleteAllAttractions = async () => {
  const res = await axios.delete(`${API_URL}/delete`);
  return res.data;
};
