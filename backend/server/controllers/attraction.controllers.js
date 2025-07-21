import generateTokenAndSetCookie from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'
import attraction from '../models/attracion.model.js'; // seu schema de Atrações
import Review from '../models/review.model.js';   // modelo de review, se tiver
// import User se quiser salvar autor do review

// 1. Listar todas as atrações
export const getAllAttraction = async (req, res) => {
  try {
    const attracion = await Attracion.find();
    res.status(200).json(atracoes);
  } catch (error) {
    console.log("Error in get attracions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2. Detalhar uma atração pelo nome
export const detailAttraction = async (req, res) => {
  try {
    const { name } = req.params;
    const attracion = await Attracion.findOne({ nome: name });

    if (!attracion) {
      return res.status(404).json({ error: "attraction não encontrada" });
    }

    res.status(200).json(attracion);
  } catch (error) {
    console.log("Error in detail attraction", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 3. Listar avaliações de uma attraction
export const getReview = async (req, res) => {
  try {
    const { name } = req.params;
    const attracion = await Attracion.findOne({ nome: name }).populate('reviews');

    if (!attracion) {
      return res.status(404).json({ error: "attraction não encontrada" });
    }

    res.status(200).json(attraction.reviews || []);
  } catch (error) {
    console.log("Error in getReview:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 4. Enviar uma nova avaliação
export const sendReview = async (req, res) => {
  try {
    const { name } = req.params;
    const { comentario, nota } = req.body;

    const attraction = await attraction.findOne({ nome: name });
    if (!attraction) {
      return res.status(404).json({ error: "attraction não encontrada" });
    }

    const review = { comentario, nota, data: new Date() };
    attraction.reviews.push(review); 

    await attraction.save();
    res.status(201).json({ mensagem: "Review adicionada com sucesso!" });
  } catch (error) {
    console.log("Error in sendReview:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 5. Criar uma nova attraction
export const createAtration = async (req, res) => {
  try {
    const novaattraction = new attraction(req.body);
    await novaattraction.save();
    res.status(201).json(novaattraction);
  } catch (error) {
    console.log("Error in createAtration:", error.message);
    res.status(400).json({ error: error.message });
  }
};
